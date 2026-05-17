import { useEffect, useState } from 'react';
import { branchService } from '../services/branchService';
import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import Loader from '../components/ui/Loader';
import FeatureGuide from '../components/ui/FeatureGuide';
import { FEATURE_GUIDES } from '../config/featureGuides';
import { getCurrentPosition } from '../utils/geo';

export default function BranchesPage() {
  const [branches, setBranches] = useState([]);
  const [nearest, setNearest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cityFilter, setCityFilter] = useState('');

  useEffect(() => {
    branchService
      .getAll()
      .then((res) => setBranches(res.data.data))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  const findNearest = async () => {
    setError('');
    try {
      const pos = await getCurrentPosition();
      const res = await branchService.getNearest(pos.lat, pos.lng);
      setNearest(res.data.data);
    } catch (err) {
      setError(err.message || 'Enable GPS to find nearest JUTT GM branch');
    }
  };

  const filtered = cityFilter
    ? branches.filter((b) => b.city.toLowerCase().includes(cityFilter.toLowerCase()))
    : branches;

  if (loading) return <Loader />;

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="JUTT GM Branches"
        subtitle="All stations — find nearest pump in your city"
        action={<Button onClick={findNearest}>📡 Find Nearest Branch</Button>}
      />
      <Alert type="error" message={error} onClose={() => setError('')} />

      {nearest && (
        <section className="card mb-6 border-2 border-amber-500 bg-amber-50/50 dark:bg-amber-900/20">
          <h2 className="font-bold text-lg text-amber-800 dark:text-amber-300 mb-3">Nearest to you</h2>
          <div className="space-y-3">
            {nearest.slice(0, 3).map((b, i) => (
              <article key={b.id} className="flex justify-between items-start p-3 rounded-xl bg-white dark:bg-slate-800">
                <div>
                  <p className="font-bold">{i === 0 && '🏆 '}{b.name}</p>
                  <p className="text-sm text-slate-500">{b.city} — {b.address}</p>
                  <p className="text-xs mt-1">Easypaisa: {b.easypaisa_account} | JazzCash: {b.jazzcash_account}</p>
                </div>
                <span className="font-bold text-amber-600">{b.distance_km} km</span>
              </article>
            ))}
          </div>
        </section>
      )}

      <div className="mb-4">
        <input
          className="input-field max-w-xs"
          placeholder="Filter by city..."
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((b) => (
          <article key={b.id} className="card hover:border-amber-500/50 transition-colors">
            <h3 className="font-bold text-lg">{b.name}</h3>
            <p className="text-amber-600 text-sm font-medium">{b.city} • {b.code}</p>
            <p className="text-sm text-slate-500 mt-2">{b.address}</p>
            <p className="text-sm mt-2">📞 {b.phone}</p>
            <div className="mt-3 p-3 rounded-lg bg-slate-100 dark:bg-slate-700 text-sm space-y-1">
              <p><strong>Easypaisa:</strong> {b.easypaisa_account}</p>
              <p><strong>JazzCash:</strong> {b.jazzcash_account}</p>
            </div>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${b.lat},${b.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-sm text-amber-600 font-semibold hover:underline"
            >
              Get Directions →
            </a>
          </article>
        ))}
      </div>
      <FeatureGuide guide={FEATURE_GUIDES.branches} />
    </div>
  );
}
