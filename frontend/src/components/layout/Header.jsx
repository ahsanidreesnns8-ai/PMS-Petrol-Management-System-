import { useAuth } from '../../context/AuthContext';
import { getSiteConfig } from '../../config/site';
import Button from '../ui/Button';

export default function Header({ onMenuClick }) {
  const { user, logout } = useAuth();
  const site = getSiteConfig();

  return (
    <header className="sticky top-0 z-30 no-print bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-700/80 px-4 md:px-8 py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onMenuClick}
            className="lg:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div>
            <p className="text-xs font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              {site.pumpName}
            </p>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">
              Welcome back, {user?.name?.split(' ')[0]}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 capitalize">
            {user?.role}
          </span>
          <Button variant="secondary" onClick={logout} className="!py-2 !px-4 text-sm">
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
