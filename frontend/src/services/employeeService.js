import apiClient from './apiClient';

export const employeeService = {
  getAll: () => apiClient.get('/employees'),
  getById: (id) => apiClient.get(`/employees/${id}`),
  create: (data) => apiClient.post('/employees', data),
  update: (id, data) => apiClient.put(`/employees/${id}`, data),
  remove: (id) => apiClient.delete(`/employees/${id}`),
  markAttendance: (data) => apiClient.post('/employees/attendance', data),
  getAttendance: (id, params) => apiClient.get(`/employees/${id}/attendance`, { params }),
  addSalary: (data) => apiClient.post('/employees/salary', data),
  getStats: () => apiClient.get('/employees/stats'),
};
