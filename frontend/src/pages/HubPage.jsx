import { useNavigate } from 'react-router-dom';
import { getSiteConfig } from '../config/site';
import { FEATURE_GUIDES } from '../config/featureGuides';
import FeatureGuide from '../components/ui/FeatureGuide';

const MENU = [
  { path: '/dashboard', title: 'Dashboard', desc: 'Sales, revenue & stock overview', color: 'from-blue-500 to-indigo-600' },
  { path: '/billing', title: 'Billing & PDF', desc: 'Generate bill & download receipt', color: 'from-amber-500 to-orange-600' },
  { path: '/vehicles', title: 'Vehicle History', desc: 'Which car filled fuel on a date', color: 'from-emerald-500 to-teal-600' },
  { path: '/fuels', title: 'Fuel Stock', desc: 'Petrol, diesel & low stock alerts', color: 'from-yellow-500 to-amber-600' },
  { path: '/employees', title: 'Employees', desc: 'Attendance & salary history', color: 'from-violet-500 to-purple-600' },
  { path: '/branches', title: 'JUTT GM Branches', desc: 'Find nearest pump by city & GPS', color: 'from-rose-500 to-pink-600' },
  { path: '/reports', title: 'Reports', desc: 'Daily, monthly & revenue reports', color: 'from-cyan-500 to-blue-600' },
  { path: '/location', title: 'GPS Location', desc: 'Map & directions to station', color: 'from-slate-600 to-slate-800' },
  { path: '/settings', title: 'Settings', desc: 'Profile, social links & theme', color: 'from-gray-500 to-gray-700' },
];

export default function HubPage() {
  const navigate = useNavigate();
  const site = getSiteConfig();

  return (
    <div className="animate-fade-in">
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent">
          {site.pumpName}
        </h1>
        <p className="text-slate-400 mt-2 text-lg">{site.tagline}</p>
        <p className="text-slate-500 text-sm mt-1">Select a module below</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {MENU.map((item) => (
          <button
            key={item.path}
            type="button"
            onClick={() => navigate(item.path)}
            className="group text-left rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-white/10"
          >
            <div className={`bg-gradient-to-br ${item.color} p-6 text-white`}>
              <h2 className="text-xl font-bold">{item.title}</h2>
              <p className="text-sm text-white/80 mt-1">{item.desc}</p>
              <span className="inline-block mt-4 text-xs font-semibold bg-white/20 px-3 py-1 rounded-full group-hover:bg-white/30">
                Open →
              </span>
            </div>
          </button>
        ))}
      </div>

      <FeatureGuide guide={FEATURE_GUIDES.hub} />
    </div>
  );
}
