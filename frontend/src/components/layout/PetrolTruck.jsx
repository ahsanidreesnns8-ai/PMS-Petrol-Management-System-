/** Decorative petrol tanker truck for login background */
export default function PetrolTruck({ className = '' }) {
  return (
    <svg
      viewBox="0 0 400 200"
      className={className}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="200" cy="180" rx="160" ry="12" fill="rgba(0,0,0,0.2)" />
      <rect x="80" y="70" width="200" height="70" rx="8" fill="url(#tank)" stroke="#f59e0b" strokeWidth="3" />
      <rect x="40" y="90" width="50" height="50" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
      <rect x="270" y="100" width="40" height="40" rx="4" fill="#334155" />
      <circle cx="100" cy="150" r="22" fill="#0f172a" stroke="#64748b" strokeWidth="4" />
      <circle cx="100" cy="150" r="10" fill="#475569" />
      <circle cx="260" cy="150" r="22" fill="#0f172a" stroke="#64748b" strokeWidth="4" />
      <circle cx="260" cy="150" r="10" fill="#475569" />
      <text x="180" y="115" textAnchor="middle" fill="#fbbf24" fontSize="28" fontWeight="bold" fontFamily="sans-serif">
        JUTT GM
      </text>
      <path d="M290 110 L340 95 L340 130 L290 125 Z" fill="#f59e0b" opacity="0.8" />
      <defs>
        <linearGradient id="tank" x1="80" y1="70" x2="280" y2="140">
          <stop stopColor="#334155" />
          <stop offset="1" stopColor="#1e293b" />
        </linearGradient>
      </defs>
    </svg>
  );
}
