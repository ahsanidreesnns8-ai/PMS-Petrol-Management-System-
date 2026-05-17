import { useEffect, useState } from 'react';
import { billingService } from '../services/billingService';
import { fuelService } from '../services/fuelService';
import { branchService } from '../services/branchService';
import Loader from '../components/ui/Loader';
import Alert from '../components/ui/Alert';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import PageHeader from '../components/ui/PageHeader';
import FeatureGuide from '../components/ui/FeatureGuide';
import { FEATURE_GUIDES } from '../config/featureGuides';
import { formatCurrency, formatDateTime } from '../utils/formatters';
import { downloadBillPdf } from '../utils/pdfBill';

export default function BillingPage() {
  const [fuels, setFuels] = useState([]);
  const [branches, setBranches] = useState([]);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [lastBill, setLastBill] = useState(null);
  const [form, setForm] = useState({
    fuel_id: '',
    branch_id: '',
    quantity: '',
    gst_percent: '18',
    customer_name: '',
    vehicle_number: '',
    payment_method: 'cash',
  });

  const load = async () => {
    setLoading(true);
    try {
      const [f, b, billRes] = await Promise.all([
        fuelService.getAll(),
        branchService.getAll(),
        billingService.getAll({ limit: 20 }),
      ]);
      setFuels(f.data.data);
      setBranches(b.data.data);
      setBills(billRes.data.data.bills || []);
      if (b.data.data?.[0]) setForm((prev) => ({ ...prev, branch_id: String(b.data.data[0].id) }));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const selectedFuel = fuels.find((f) => String(f.id) === String(form.fuel_id));
  const selectedBranch = branches.find((br) => String(br.id) === String(form.branch_id));
  const subtotal = selectedFuel && form.quantity ? parseFloat(form.quantity) * parseFloat(selectedFuel.price_per_liter) : 0;
  const gst = (subtotal * parseFloat(form.gst_percent || 0)) / 100;
  const total = subtotal + gst;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await billingService.create({
        ...form,
        fuel_id: parseInt(form.fuel_id, 10),
        branch_id: form.branch_id ? parseInt(form.branch_id, 10) : null,
        quantity: parseFloat(form.quantity),
        gst_percent: parseFloat(form.gst_percent),
      });
      const full = await billingService.getById(res.data.data.id);
      setLastBill(full.data.data);
      setSuccess('Bill created — download PDF below');
      setForm({ ...form, quantity: '', customer_name: '', vehicle_number: '' });
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create bill');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Billing & PDF Receipt" subtitle="JUTT GM — Easypaisa, JazzCash & vehicle tracking" />
      <Alert type="error" message={error} onClose={() => setError('')} />
      <Alert type="success" message={success} onClose={() => setSuccess('')} />

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="card space-y-2">
          <label className="label">JUTT GM Branch
            <select className="input-field" value={form.branch_id} onChange={(e) => setForm({ ...form, branch_id: e.target.value })}>
              {branches.map((br) => (
                <option key={br.id} value={br.id}>{br.name} — {br.city}</option>
              ))}
            </select>
          </label>
          {selectedBranch && (
            <p className="text-xs text-slate-500 -mt-2 mb-2">
              Easypaisa: {selectedBranch.easypaisa_account} | JazzCash: {selectedBranch.jazzcash_account}
            </p>
          )}
          <label className="label">Fuel Type
            <select className="input-field" value={form.fuel_id} onChange={(e) => setForm({ ...form, fuel_id: e.target.value })} required>
              <option value="">Select fuel</option>
              {fuels.map((f) => (
                <option key={f.id} value={f.id}>{f.name} — {formatCurrency(f.price_per_liter)}/L</option>
              ))}
            </select>
          </label>
          <Input label="Quantity (Liters) *" type="number" step="0.1" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} required />
          <Input label="Vehicle Number *" value={form.vehicle_number} onChange={(e) => setForm({ ...form, vehicle_number: e.target.value })} placeholder="LEA-1234" required />
          <Input label="Customer Name" value={form.customer_name} onChange={(e) => setForm({ ...form, customer_name: e.target.value })} />
          <Input label="GST %" type="number" value={form.gst_percent} onChange={(e) => setForm({ ...form, gst_percent: e.target.value })} />
          <label className="label">Payment Method
            <select className="input-field" value={form.payment_method} onChange={(e) => setForm({ ...form, payment_method: e.target.value })}>
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="easypaisa">Easypaisa</option>
              <option value="jazzcash">JazzCash</option>
              <option value="upi">UPI</option>
              <option value="credit">Credit</option>
            </select>
          </label>
          <aside className="bg-amber-50 dark:bg-slate-700 rounded-xl p-4 text-sm space-y-1">
            <p>Subtotal: {formatCurrency(subtotal)}</p>
            <p>GST: {formatCurrency(gst)}</p>
            <p className="font-bold text-lg text-amber-700 dark:text-amber-400">Total: {formatCurrency(total)}</p>
          </aside>
          <Button type="submit" className="w-full">Generate Bill</Button>
        </form>

        {lastBill && (
          <article className="card border-2 border-amber-500/50">
            <h2 className="text-center font-extrabold text-2xl text-amber-600 mb-1">JUTT GM</h2>
            <p className="text-center text-xs text-slate-500 mb-4">Official Receipt</p>
            <div className="space-y-1 text-sm">
              <p><strong>Bill #:</strong> {lastBill.bill_number}</p>
              <p><strong>Date:</strong> {formatDateTime(lastBill.created_at)}</p>
              <p><strong>Branch:</strong> {lastBill.branch?.name}</p>
              <p><strong>Vehicle:</strong> {lastBill.vehicle_number}</p>
              <p><strong>Fuel:</strong> {lastBill.fuel?.name} — {lastBill.quantity} L</p>
              <p><strong>Payment:</strong> <span className="uppercase">{lastBill.payment_method}</span></p>
              <p className="text-xl font-bold text-amber-600 pt-2">Total: {formatCurrency(lastBill.total)}</p>
            </div>
            <div className="flex gap-2 mt-6">
              <Button className="flex-1" onClick={() => downloadBillPdf(lastBill)}>
                📥 Download PDF
              </Button>
              <Button variant="secondary" className="flex-1" onClick={() => window.print()}>
                Print
              </Button>
            </div>
          </article>
        )}
      </section>

      <section className="card overflow-x-auto">
        <h2 className="font-semibold mb-4">Recent Transactions</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Bill #</th>
              <th className="text-left py-2">Vehicle</th>
              <th className="text-left py-2">Fuel</th>
              <th className="text-right py-2">Total</th>
              <th className="text-left py-2">Payment</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((b) => (
              <tr key={b.id} className="border-b dark:border-slate-700">
                <td className="py-2">{b.bill_number}</td>
                <td className="py-2 font-mono">{b.vehicle_number || '—'}</td>
                <td className="py-2">{b.fuel?.name}</td>
                <td className="py-2 text-right">{formatCurrency(b.total)}</td>
                <td className="py-2 capitalize">{b.payment_method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <FeatureGuide guide={FEATURE_GUIDES.billing} />
    </div>
  );
}
