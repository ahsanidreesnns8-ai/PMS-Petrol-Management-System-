export default function StatCard({ title, value, subtitle, icon, color = 'primary' }) {
  const colors = {
    primary: 'from-amber-500/20 to-orange-500/10 text-amber-600 dark:text-amber-400',
    green: 'from-emerald-500/20 to-teal-500/10 text-emerald-600 dark:text-emerald-400',
    amber: 'from-yellow-500/20 to-amber-500/10 text-yellow-600 dark:text-yellow-400',
    red: 'from-red-500/20 to-rose-500/10 text-red-600 dark:text-red-400',
  };

  const colorClasses = colors[color] || colors.primary; // fallback safety

  return (
    <article className="card group transition-transform duration-200 hover:-translate-y-0.5">
      <div className="flex items-start gap-4">
        <span
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-2xl ${colorClasses}`}
        >
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <p className="mt-1 truncate text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-3xl">
            {value}
          </p>
          {subtitle && (
            <p className="mt-1 text-xs text-slate-400">{subtitle}</p>
          )}
        </div>
      </div>
    </article>
  );
}
