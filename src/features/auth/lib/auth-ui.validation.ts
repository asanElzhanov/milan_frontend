const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateRequired = (value: string): boolean => value.trim().length > 0;

export const isValidEmail = (value: string): boolean => emailPattern.test(value.trim());

export const isValidPhone = (value: string): boolean => {
  const normalized = value.replace(/[^\d+]/g, '');
  const digits = normalized.replace(/\D/g, '');

  if (normalized.startsWith('+7')) {
    return digits.length === 11;
  }

  if (normalized.startsWith('8')) {
    return digits.length === 11;
  }

  return digits.length >= 10 && digits.length <= 12;
};

export const isValidEmailOrPhone = (value: string): boolean =>
  isValidEmail(value) || isValidPhone(value);

export const validatePassword = (value: string): boolean => value.length >= 8;
