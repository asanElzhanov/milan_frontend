export const isValidOtpCode = (value: string): boolean => /^\d{4,6}$/.test(value.trim());
