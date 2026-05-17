import { useState } from 'react';
import { billingService } from '../services/billingService';
import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Alert from '../components/ui/Alert';
import Loader from '../components/ui/Loader';
import FeatureGuide from '../components/ui/FeatureGuide';
import { FEATURE_GUIDES } from '../config/featureGuides';
import { formatCurrency, formatDateTime } from '../utils/formatters';

export default function VehicleSearchPage() {
  const [vehicle, setVehicle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const search = async (e) => {
    e.preventDefault();
    if (!vehicle.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await billingService.searchVehicle({
        vehicle_number: vehicle.trim(),
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      });
      setResults(res.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <PageHeader title="Vehicle Fill-up History" subtitle="See which vehicle filled petrol/diesel and when" />
      <Alert type="error" message={error} onClose={() => setError('')} />
      <form onSubmit={search} className="card grid md:grid-cols-4 gap-4 items-end mb-6">
        <Input label="Vehicle Number *" value={vehicle} onChange={(e) => setVehicle(e.target.value)} placeholder="LEA-1234" required />
        <Input label="From Date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <Input label="To Date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <Button type="submit">Search</Button>
      </form>
      {loading && <Loader />}
      {!loading && results.length > 0 && (
        <section className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Date & Time</th>
                <th className="text-left py-2">Vehicle</th>
                <th className="text-left py-2">Fuel</th>
                <th className="text-right py-2">Liters</th>
                <th className="text-right py-2">Total</th>
                <th className="text-left py-2">Payment</th>
                <th className="text-left py-2">Branch</th>
              </tr>
            </thead>
            <tbody>
              {results.map((b) => (
                <tr key={b.id} className="border-b dark:border-slate-700">
                  <td className="py-2">{formatDateTime(b.created_at)}</td>
                  <td className="py-2 font-mono font-bold">{b.vehicle_number}</td>
                  <td className="py-2">{b.fuel?.name}</td>
                  <td className="py-2 text-right">{b.quantity} L</td>
                  <td className="py-2 text-right">{formatCurrency(b.total)}</td>
                  <td className="py-2 capitalize">{b.payment_method}</td>
                  <td className="py-2">{b.branch?.city || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
      {!loading && vehicle && results.length === 0 && (
        <p className="text-center text-slate-500 py-8">No fill-ups found for this vehicle.</p>
      )}
      <FeatureGuide guide={FEATURE_GUIDES.vehicles} />
    </div>
  );
}
