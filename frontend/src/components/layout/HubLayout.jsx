import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getSiteConfig } from '../../config/site';
import Button from '../ui/Button';

export default function HubLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const site = getSiteConfig();

  return (
    <div className="min-h-screen jutt-bg relative">
      <div className="jutt-watermark pointer-events-none">JUTT GM</div>
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-amber-500/20 no-print">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('/hub')}
            className="flex items-center gap-2 text-amber-400 font-extrabold text-xl hover:text-amber-300"
          >
            <span className="text-2xl">⛽</span> {site.pumpName}
          </button>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-sm text-slate-300">{user?.name}</span>
            <Button variant="secondary" className="!py-1.5 !px-3 text-sm" onClick={() => navigate('/hub')}>
              Main Menu
            </Button>
            <Button variant="secondary" className="!py-1.5 !px-3 text-sm" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8 relative z-10">
        <Outlet />
      </main>
    </div>
  );
}
