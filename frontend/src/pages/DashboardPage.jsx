import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { reportService } from '../services/reportService';
import StatCard from '../components/dashboard/StatCard';
import Loader from '../components/ui/Loader';
import Alert from '../components/ui/Alert';
import { formatCurrency } from '../utils/formatters';
import PageHeader from '../components/ui/PageHeader';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    reportService
      .getDashboard()
      .then((res) => setData(res.data.data))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load dashboard'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (error) return <Alert type="error" message={error} />;

  const chartData = {
    labels: data?.revenue_chart?.map((d) => d.date) || [],
    datasets: [
      {
        label: 'Revenue (₹)',
        data: data?.revenue_chart?.map((d) => d.revenue) || [],
        backgroundColor: 'rgba(37, 99, 235, 0.7)',
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" subtitle="Fuel sales, revenue & stock overview" />
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Today's Revenue" value={formatCurrency(data?.daily_revenue)} icon="💰" color="green" />
        <StatCard title="Transactions" value={data?.daily_transactions} icon="🧾" color="primary" />
        <StatCard title="Liters Sold" value={`${data?.daily_liters_sold?.toFixed?.(1) || 0} L`} icon="⛽" color="amber" />
        <StatCard title="Low Stock Alerts" value={data?.low_stock_alerts} icon="⚠️" color="red" />
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <article className="card">
          <h2 className="text-lg font-semibold mb-4">7-Day Revenue</h2>
          <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </article>
        <article className="card">
          <h2 className="text-lg font-semibold mb-4">Fuel Stock</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b dark:border-gray-600">
                <th className="text-left py-2">Fuel</th>
                <th className="text-left py-2">Category</th>
                <th className="text-right py-2">Stock (L)</th>
                <th className="text-right py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {data?.fuel_stock?.map((f) => (
                <tr key={f.name} className="border-b dark:border-gray-700">
                  <td className="py-2">{f.name}</td>
                  <td className="py-2 capitalize">{f.category}</td>
                  <td className="py-2 text-right">{parseFloat(f.quantity).toLocaleString()}</td>
                  <td className="py-2 text-right">
                    {f.is_low ? (
                      <span className="text-red-500 font-medium">Low</span>
                    ) : (
                      <span className="text-green-500">OK</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </section>
      <StatCard title="Active Employees" value={data?.employee_count} icon="👥" subtitle="Currently registered staff" />
    </div>
  );
}
