export function isRelativePaymentUrl(url: string): boolean {
  const trimmed = url.trim();

  return Boolean(trimmed) && trimmed.startsWith('/') && !trimmed.startsWith('//');
}

export function isSafeExternalPaymentUrl(url: string): boolean {
  const trimmed = url.trim();

  if (!trimmed || isRelativePaymentUrl(trimmed) || trimmed.startsWith('//')) {
    return false;
  }

  try {
    const parsedUrl = new URL(trimmed);

    return parsedUrl.protocol === 'https:';
  } catch {
    return false;
  }
}
