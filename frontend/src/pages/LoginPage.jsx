import { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getSiteConfig, HUMAN_VERIFY_KEY } from '../config/site';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import PetrolTruck from '../components/layout/PetrolTruck';

export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const site = getSiteConfig();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(HUMAN_VERIFY_KEY) !== '1') {
      navigate('/verify', { replace: true });
    }
  }, [navigate]);

  if (user) return <Navigate to="/hub" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form);
      navigate('/hub');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex jutt-bg relative overflow-hidden">
      <div className="jutt-watermark">JUTT GM</div>
      <div className="hidden lg:flex lg:w-3/5 relative items-end justify-center pb-8">
        <PetrolTruck className="w-full max-w-lg opacity-90 drop-shadow-2xl animate-pulse-slow" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-center">
          <h1 className="text-6xl font-black text-amber-500/20 tracking-widest">JUTT GM</h1>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-6 z-10">
        <div className="card w-full max-w-md shadow-2xl border border-amber-500/20 bg-white/95 dark:bg-slate-900/95 backdrop-blur">
          <div className="text-center mb-6">
            <span className="text-4xl">⛽</span>
            <h2 className="text-3xl font-extrabold mt-2 bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
              JUTT GM
            </h2>
            <p className="text-slate-500 text-sm">Management System — Sign in</p>
          </div>
          <Alert type="error" message={error} onClose={() => setError('')} />
          <form onSubmit={handleSubmit}>
            <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? 'Signing in...' : 'Enter JUTT GM'}
            </Button>
          </form>
          <p className="text-center text-xs mt-4 text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-lg p-2">
            Demo: admin@petrolpump.com / admin123
          </p>
          <p className="text-center text-sm mt-3">
            <Link to="/register" className="text-amber-600 font-semibold hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
