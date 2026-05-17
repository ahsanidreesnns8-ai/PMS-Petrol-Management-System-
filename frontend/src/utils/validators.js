export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validateRequired = (value) => value !== undefined && value !== null && String(value).trim() !== '';

export const validateMinLength = (value, min) => String(value).length >= min;
