import apiClient from './apiClient';

export const reportService = {
  getDashboard: () => apiClient.get('/reports/dashboard'),
  getDaily: (date) => apiClient.get('/reports/daily', { params: { date } }),
  getMonthly: (year, month) => apiClient.get('/reports/monthly', { params: { year, month } }),
  getRevenue: (startDate, endDate) =>
    apiClient.get('/reports/revenue', { params: { startDate, endDate } }),
  getFuelUsage: (startDate, endDate) =>
    apiClient.get('/reports/fuel-usage', { params: { startDate, endDate } }),
};
