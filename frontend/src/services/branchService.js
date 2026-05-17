import apiClient from './apiClient';

export const branchService = {
  getAll: () => apiClient.get('/branches'),
  getNearest: (lat, lng) => apiClient.get('/branches/nearest', { params: { lat, lng } }),
  getByCity: (city) => apiClient.get(`/branches/city/${city}`),
};
