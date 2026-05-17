import apiClient from './apiClient';

export const fuelService = {
  getAll: () => apiClient.get('/fuels'),
  getById: (id) => apiClient.get(`/fuels/${id}`),
  create: (data) => apiClient.post('/fuels', data),
  update: (id, data) => apiClient.put(`/fuels/${id}`, data),
  remove: (id) => apiClient.delete(`/fuels/${id}`),
  getLowStock: () => apiClient.get('/fuels/low-stock'),
  getAnalytics: () => apiClient.get('/fuels/analytics'),
};
