import { useEffect, useState } from 'react';
import { fuelService } from '../services/fuelService';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/ui/Loader';
import Alert from '../components/ui/Alert';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { formatCurrency } from '../utils/formatters';

const emptyForm = { name: '', category: 'petrol', quantity: '', price_per_liter: '', low_stock_threshold: '500' };

export default function FuelsPage() {
  const { isAdmin } = useAuth();
  const [fuels, setFuels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);

  const load = () => {
    setLoading(true);
    fuelService
      .getAll()
      .then((res) => setFuels(res.data.data))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load fuels'))
      .finally(() => setLoading(false));
  };

  useEffect(() => load(), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = {
        ...form,
        quantity: parseFloat(form.quantity),
        price_per_liter: parseFloat(form.price_per_liter),
        low_stock_threshold: parseFloat(form.low_stock_threshold),
      };
      if (editId) {
        await fuelService.update(editId, payload);
        setSuccess('Fuel updated');
      } else {
        await fuelService.create(payload);
        setSuccess('Fuel added');
      }
      setShowForm(false);
      setForm(emptyForm);
      setEditId(null);
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (fuel) => {
    setForm({
      name: fuel.name,
      category: fuel.category,
      quantity: fuel.quantity,
      price_per_liter: fuel.price_per_liter,
      low_stock_threshold: fuel.low_stock_threshold,
    });
    setEditId(fuel.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this fuel?')) return;
    try {
      await fuelService.remove(id);
      setSuccess('Fuel removed');
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-white">Fuel Management</h1>
        {isAdmin && (
          <Button onClick={() => { setShowForm(!showForm); setEditId(null); setForm(emptyForm); }}>
            {showForm ? 'Cancel' : '+ Add Fuel'}
          </Button>
        )}
      </header>
      <Alert type="error" message={error} onClose={() => setError('')} />
      <Alert type="success" message={success} onClose={() => setSuccess('')} />
      {showForm && isAdmin && (
        <form onSubmit={handleSubmit} className="card grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <label className="label">
            Category
            <select className="input-field" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
            </select>
          </label>
          <Input label="Quantity (L)" type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} required />
          <Input label="Price/Liter" type="number" step="0.01" value={form.price_per_liter} onChange={(e) => setForm({ ...form, price_per_liter: e.target.value })} required />
          <Input label="Low Stock Threshold" type="number" value={form.low_stock_threshold} onChange={(e) => setForm({ ...form, low_stock_threshold: e.target.value })} />
          <Button type="submit" className="md:col-span-2">{editId ? 'Update' : 'Save'} Fuel</Button>
        </form>
      )}
      <section className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b dark:border-gray-600">
              <th className="text-left py-3">Name</th>
              <th className="text-left py-3">Category</th>
              <th className="text-right py-3">Stock (L)</th>
              <th className="text-right py-3">Price/L</th>
              <th className="text-right py-3">Status</th>
              {isAdmin && <th className="text-right py-3">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {fuels.map((f) => (
              <tr key={f.id} className="border-b dark:border-gray-700">
                <td className="py-3">{f.name}</td>
                <td className="py-3 capitalize">{f.category}</td>
                <td className="py-3 text-right">{parseFloat(f.quantity).toLocaleString()}</td>
                <td className="py-3 text-right">{formatCurrency(f.price_per_liter)}</td>
                <td className="py-3 text-right">
                  {f.is_low_stock ? <span className="text-red-500 font-medium">Low Stock</span> : <span className="text-green-500">OK</span>}
                </td>
                {isAdmin && (
                  <td className="py-3 text-right space-x-2">
                    <button onClick={() => handleEdit(f)} className="text-primary-600 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(f.id)} className="text-red-600 hover:underline">Delete</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
