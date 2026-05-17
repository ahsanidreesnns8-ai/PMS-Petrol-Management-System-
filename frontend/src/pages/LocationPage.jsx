import { useState } from 'react';
import { getSiteConfig } from '../config/site';
import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import {
  getCurrentPosition,
  getDistanceKm,
  getDirectionsUrl,
  getOpenStreetMapEmbedUrl,
} from '../utils/geo';

export default function LocationPage() {
  const site = getSiteConfig();
  const { lat, lng, name } = site.location;
  const [userPos, setUserPos] = useState(null);
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const locateMe = async () => {
    setLoading(true);
    setError('');
    try {
      const pos = await getCurrentPosition();
      setUserPos(pos);
      const km = getDistanceKm(pos.lat, pos.lng, lat, lng);
      setDistance(km);
    } catch (err) {
      setError(err.message || 'Could not get your location. Allow GPS permission in browser.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Station Location"
        subtitle="GPS map, directions, and distance from your current position"
      />
      <Alert type="error" message={error} onClose={() => setError('')} />

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <article className="card lg:col-span-2 p-0 overflow-hidden">
          <iframe
            title="Petrol pump map"
            src={getOpenStreetMapEmbedUrl(lat, lng)}
            className="w-full h-[400px] border-0"
            loading="lazy"
          />
        </article>

        <aside className="space-y-4">
          <article className="card">
            <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <span className="text-2xl">📍</span> {name}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{site.address}</p>
            <p className="text-xs font-mono bg-slate-100 dark:bg-slate-700 rounded-lg p-2 mb-4">
              {lat.toFixed(6)}, {lng.toFixed(6)}
            </p>
            <div className="flex flex-col gap-2">
              <Button onClick={locateMe} disabled={loading} className="w-full">
                {loading ? 'Locating...' : '📡 Use My GPS Location'}
              </Button>
              <a href={getDirectionsUrl(lat, lng)} target="_blank" rel="noopener noreferrer" className="w-full">
                <Button variant="secondary" className="w-full" type="button">
                  🗺️ Open in Google Maps
                </Button>
              </a>
            </div>
          </article>

          {userPos && (
            <article className="card border-l-4 border-l-emerald-500">
              <h3 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-2">Your location</h3>
              <p className="text-sm font-mono text-slate-600 dark:text-slate-400">
                {userPos.lat.toFixed(6)}, {userPos.lng.toFixed(6)}
              </p>
              {distance != null && (
                <p className="mt-2 text-lg font-bold text-slate-900 dark:text-white">
                  {distance < 1
                    ? `${(distance * 1000).toFixed(0)} meters away`
                    : `${distance.toFixed(2)} km away`}
                </p>
              )}
            </article>
          )}

          <article className="card">
            <h3 className="font-semibold mb-3">Contact</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">📞 {site.phone}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">✉️ {site.email}</p>
            <div className="flex gap-2 mt-4">
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2 rounded-lg bg-[#1877F2] text-white text-sm font-medium hover:opacity-90"
              >
                Facebook
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-medium hover:opacity-90"
              >
                Instagram
              </a>
            </div>
          </article>
        </aside>
      </section>
    </div>
  );
}
