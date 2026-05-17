import { useState } from 'react';

export default function FeatureGuide({ guide }) {
  const [open, setOpen] = useState(false);
  if (!guide) return null;

  return (
    <section className="mt-8 card bg-gradient-to-br from-slate-50 to-amber-50/50 dark:from-slate-800 dark:to-slate-800 border-dashed border-2 border-amber-300/50">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left"
      >
        <span className="font-bold text-amber-800 dark:text-amber-300">
          📖 How to use: {guide.title}
        </span>
        <span className="text-2xl text-amber-600">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <ol className="mt-4 space-y-2 list-decimal list-inside text-sm text-slate-600 dark:text-slate-300">
          {guide.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      )}
    </section>
  );
}
