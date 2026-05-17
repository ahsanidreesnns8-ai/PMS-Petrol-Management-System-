/**
 * API base URL configuration
 */
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    me: '/auth/me',
  },
  fuels: '/fuels',
  billing: '/billing',
  employees: '/employees',
  reports: '/reports',
  settings: '/settings',
};
