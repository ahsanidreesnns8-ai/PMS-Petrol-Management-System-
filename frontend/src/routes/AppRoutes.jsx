import { Routes, Route, Navigate } from 'react-router-dom';
import HubLayout from '../components/layout/HubLayout';
import ProtectedRoute from './ProtectedRoute';
import HumanVerifyPage from '../pages/HumanVerifyPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HubPage from '../pages/HubPage';
import DashboardPage from '../pages/DashboardPage';
import FuelsPage from '../pages/FuelsPage';
import BillingPage from '../pages/BillingPage';
import EmployeesPage from '../pages/EmployeesPage';
import ReportsPage from '../pages/ReportsPage';
import SettingsPage from '../pages/SettingsPage';
import LocationPage from '../pages/LocationPage';
import BranchesPage from '../pages/BranchesPage';
import VehicleSearchPage from '../pages/VehicleSearchPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/verify" element={<HumanVerifyPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        element={
          <ProtectedRoute>
            <HubLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Navigate to="/hub" replace />} />
        <Route path="hub" element={<HubPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="fuels" element={<FuelsPage />} />
        <Route path="billing" element={<BillingPage />} />
        <Route path="vehicles" element={<VehicleSearchPage />} />
        <Route path="employees" element={<EmployeesPage />} />
        <Route path="branches" element={<BranchesPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="location" element={<LocationPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/verify" replace />} />
    </Routes>
  );
}
