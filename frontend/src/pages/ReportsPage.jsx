import { useState } from 'react';
import { reportService } from '../services/reportService';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import Loader from '../components/ui/Loader';
import { formatCurrency } from '../utils/formatters';

export default function ReportsPage() {
  const [tab, setTab] = useState('daily');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const fetchReport = async () => {
    setLoading(true);
    setError('');
    try {
      let res;
      if (tab === 'daily') res = await reportService.getDaily(date);
      else if (tab === 'monthly') res = await reportService.getMonthly(year, month);
      else {
        const start = `${year}-${String(month).padStart(2, '0')}-01`;
        const end = new Date(year, month, 0).toISOString().split('T')[0];
        res = await reportService.getRevenue(start, end);
      }
      setData(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Reports</h1>
      <nav className="flex gap-2 flex-wrap">
        {['daily', 'monthly', 'revenue'].map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg capitalize ${tab === t ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
            {t}
          </button>
        ))}
      </nav>
      <section className="card flex flex-wrap gap-4 items-end">
        {tab === 'daily' && <label className="label">Date<input type="date" className="input-field" value={date} onChange={(e) => setDate(e.target.value)} /></label>}
        {tab !== 'daily' && (
          <>
            <label className="label">Month<input type="number" min="1" max="12" className="input-field w-20" value={month} onChange={(e) => setMonth(e.target.value)} /></label>
            <label className="label">Year<input type="number" className="input-field w-24" value={year} onChange={(e) => setYear(e.target.value)} /></label>
          </>
        )}
        <Button onClick={fetchReport}>Generate Report</Button>
      </section>
      <Alert type="error" message={error} />
      {loading && <Loader />}
      {data && !loading && (
        <article className="card">
          {tab === 'daily' && (
            <>
              <p>Date: {data.date}</p>
              <p>Transactions: {data.total_transactions}</p>
              <p>Revenue: {formatCurrency(data.total_revenue)}</p>
              <p>Liters Sold: {data.total_liters}</p>
            </>
          )}
          {tab === 'monthly' && data.summary && (
            <>
              <p>Month: {data.month}/{data.year}</p>
              <p>Total Revenue: {formatCurrency(data.summary.total_revenue)}</p>
              <p>Transactions: {data.summary.total_transactions}</p>
              <p>Liters: {data.summary.total_liters}</p>
            </>
          )}
          {tab === 'revenue' && (
            <>
              <p>Subtotal: {formatCurrency(data.subtotal)}</p>
              <p>GST: {formatCurrency(data.gst)}</p>
              <p className="font-bold">Total: {formatCurrency(data.total)}</p>
              <p>Transactions: {data.transactions}</p>
            </>
          )}
        </article>
      )}
    </div>
  );
}
