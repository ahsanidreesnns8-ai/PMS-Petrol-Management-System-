import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { HUMAN_VERIFY_KEY } from '../config/site';
import Button from '../components/ui/Button';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function HumanVerifyPage() {
  const navigate = useNavigate();
  const tiles = useMemo(() => shuffle([1, 2, 3, 4]), []);
  const [next, setNext] = useState(1);
  const [done, setDone] = useState(false);
  const [wrong, setWrong] = useState(false);

  const handleTile = (num) => {
    if (done) return;
    if (num === next) {
      if (next === 4) {
        setDone(true);
        sessionStorage.setItem(HUMAN_VERIFY_KEY, '1');
        setTimeout(() => navigate('/login'), 800);
      } else {
        setNext(next + 1);
      }
      setWrong(false);
    } else {
      setWrong(true);
      setNext(1);
    }
  };

  return (
    <div className="min-h-screen jutt-bg flex items-center justify-center p-4 relative overflow-hidden">
      <div className="jutt-watermark">JUTT GM</div>
      <div className="card max-w-md w-full z-10 text-center border-2 border-amber-500/30 shadow-2xl">
        <span className="text-5xl">🛡️</span>
        <h1 className="text-2xl font-extrabold mt-3 bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
          Human Verification
        </h1>
        <p className="text-slate-500 text-sm mt-2 mb-6">
          Puzzle: tap tiles in order <strong>1 → 2 → 3 → 4</strong>
        </p>
        <p className="text-sm font-semibold text-amber-600 mb-4">
          {done ? '✓ Verified! Redirecting...' : `Next: tap number ${next}`}
        </p>
        {wrong && <p className="text-red-500 text-sm mb-3">Wrong order — try again from 1</p>}
        <div className="grid grid-cols-2 gap-3 max-w-[200px] mx-auto mb-6">
          {tiles.map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleTile(num)}
              className={`h-20 rounded-2xl text-2xl font-bold transition-all ${
                num < next
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-100 hover:bg-amber-100 hover:scale-105 text-slate-800'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
        <Button type="button" variant="secondary" onClick={() => navigate('/login')} className="w-full">
          Skip to Login (demo)
        </Button>
      </div>
    </div>
  );
}
