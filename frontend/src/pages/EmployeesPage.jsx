import { useEffect, useState } from 'react';
import { employeeService } from '../services/employeeService';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/ui/Loader';
import Alert from '../components/ui/Alert';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import PageHeader from '../components/ui/PageHeader';
import FeatureGuide from '../components/ui/FeatureGuide';
import { FEATURE_GUIDES } from '../config/featureGuides';
import { formatCurrency } from '../utils/formatters';

const emptyEmp = { name: '', email: '', phone: '', role: 'attendant', salary: '', hire_date: '' };

export default function EmployeesPage() {
  const { isAdmin } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [stats, setStats] = useState(null);
  const [historyEmpId, setHistoryEmpId] = useState('');
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyEmp);
  const [attendance, setAttendance] = useState({ employee_id: '', date: new Date().toISOString().split('T')[0], status: 'present' });

  const load = async () => {
    setLoading(true);
    try {
      const [e, s] = await Promise.all([employeeService.getAll(), employeeService.getStats()]);
      setEmployees(e.data.data);
      setStats(s.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const loadHistory = async (id) => {
    if (!id) return;
    setHistoryEmpId(id);
    try {
      const res = await employeeService.getById(id);
      setHistory(res.data.data);
    } catch (err) {
      setError('Could not load employee history');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await employeeService.create({ ...form, salary: parseFloat(form.salary) });
      setSuccess('Employee added');
      setShowForm(false);
      setForm(emptyEmp);
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed');
    }
  };

  const markAttendance = async (e) => {
    e.preventDefault();
    try {
      await employeeService.markAttendance({
        ...attendance,
        employee_id: parseInt(attendance.employee_id, 10),
      });
      setSuccess('Attendance marked — view history below');
      if (attendance.employee_id) loadHistory(attendance.employee_id);
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Employees"
        subtitle="Mark attendance & view full history"
        action={isAdmin ? <Button onClick={() => setShowForm(!showForm)}>{showForm ? 'Cancel' : '+ Add'}</Button> : null}
      />
      <Alert type="error" message={error} onClose={() => setError('')} />
      <Alert type="success" message={success} onClose={() => setSuccess('')} />

      <section className="grid grid-cols-2 gap-4 max-w-md">
        <article className="card text-center">
          <p className="text-sm text-slate-500">Total Staff</p>
          <p className="text-2xl font-bold">{stats?.total_employees}</p>
        </article>
        <article className="card text-center">
          <p className="text-sm text-slate-500">Present Today</p>
          <p className="text-2xl font-bold text-emerald-600">{stats?.present_today}</p>
        </article>
      </section>

      {showForm && isAdmin && (
        <form onSubmit={handleSubmit} className="card grid md:grid-cols-2 gap-4">
          <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Input label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
          <Input label="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          <Input label="Salary" type="number" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} required />
          <Input label="Hire Date" type="date" value={form.hire_date} onChange={(e) => setForm({ ...form, hire_date: e.target.value })} required />
          <Button type="submit" className="md:col-span-2">Save Employee</Button>
        </form>
      )}

      <form onSubmit={markAttendance} className="card space-y-4">
        <h2 className="font-semibold">Mark Attendance</h2>
        <div className="grid md:grid-cols-4 gap-4 items-end">
          <label className="label">Employee
            <select className="input-field" value={attendance.employee_id} onChange={(e) => setAttendance({ ...attendance, employee_id: e.target.value })} required>
              <option value="">Select</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>
          </label>
          <Input label="Date" type="date" value={attendance.date} onChange={(e) => setAttendance({ ...attendance, date: e.target.value })} required />
          <label className="label">Status
            <select className="input-field" value={attendance.status} onChange={(e) => setAttendance({ ...attendance, status: e.target.value })}>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="half_day">Half Day</option>
              <option value="leave">Leave</option>
            </select>
          </label>
          <Button type="submit">Mark Present</Button>
        </div>
      </form>

      <section className="card">
        <h2 className="font-semibold mb-3">View Employee History</h2>
        <div className="flex flex-wrap gap-3 items-end">
          <label className="label flex-1 min-w-[200px]">Select employee
            <select className="input-field" value={historyEmpId} onChange={(e) => loadHistory(e.target.value)}>
              <option value="">Choose employee...</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>
          </label>
        </div>
        {history && (
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-amber-600 mb-2">Attendance History</h3>
              <ul className="text-sm space-y-1 max-h-48 overflow-y-auto">
                {(history.attendances || []).map((a) => (
                  <li key={a.id} className="flex justify-between border-b py-1">
                    <span>{a.date}</span>
                    <span className="capitalize font-medium">{a.status}</span>
                  </li>
                ))}
                {(!history.attendances || history.attendances.length === 0) && (
                  <li className="text-slate-500">No records yet</li>
                )}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-amber-600 mb-2">Salary History</h3>
              <ul className="text-sm space-y-1">
                {(history.salaryRecords || []).map((s) => (
                  <li key={s.id} className="flex justify-between border-b py-1">
                    <span>{s.month}/{s.year}</span>
                    <span>{formatCurrency(s.net_amount)} — {s.status}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>

      <section className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Role</th>
              <th className="text-left py-2">Phone</th>
              <th className="text-right py-2">Salary</th>
              <th className="text-right py-2">History</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="border-b dark:border-slate-700">
                <td className="py-2">{emp.name}</td>
                <td className="py-2">{emp.role}</td>
                <td className="py-2">{emp.phone}</td>
                <td className="py-2 text-right">{formatCurrency(emp.salary)}</td>
                <td className="py-2 text-right">
                  <button type="button" onClick={() => loadHistory(emp.id)} className="text-amber-600 font-semibold text-xs hover:underline">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <FeatureGuide guide={FEATURE_GUIDES.employees} />
    </div>
  );
}
