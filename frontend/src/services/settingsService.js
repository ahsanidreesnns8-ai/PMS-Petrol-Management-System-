import apiClient from './apiClient';

export const settingsService = {
  updateProfile: (data) => apiClient.put('/settings/profile', data),
  changePassword: (data) => apiClient.put('/settings/password', data),
  updateTheme: (theme) => apiClient.put('/settings/theme', { theme }),
};
