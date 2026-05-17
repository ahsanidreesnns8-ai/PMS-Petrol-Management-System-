import apiClient from './apiClient';

export const billingService = {
  getAll: (params) => apiClient.get('/billing', { params }),
  getById: (id) => apiClient.get(`/billing/${id}`),
  create: (data) => apiClient.post('/billing', data),
  getDailyRevenue: () => apiClient.get('/billing/daily-revenue'),
  searchVehicle: (params) => apiClient.get('/billing/vehicles/search', { params }),
};
