export const formatPhoneInput = (value: string): string => {
  const digits = value.replace(/\D/g, '');

  if (!digits) {
    return '';
  }

  const normalizedDigits =
    digits.startsWith('8') || digits.startsWith('7') ? `7${digits.slice(1)}` : `7${digits}`;
  const phoneDigits = normalizedDigits.slice(0, 11);
  const rest = phoneDigits.slice(1);
  const parts = ['+7'];

  if (rest.length > 0) {
    parts.push(` (${rest.slice(0, 3)}`);
  }

  if (rest.length >= 3) {
    parts[1] += ')';
  }

  if (rest.length > 3) {
    parts.push(` ${rest.slice(3, 6)}`);
  }

  if (rest.length > 6) {
    parts.push(`-${rest.slice(6, 8)}`);
  }

  if (rest.length > 8) {
    parts.push(`-${rest.slice(8, 10)}`);
  }

  return parts.join('');
};
