import { env } from '@/shared/config/env';

const API_PREFIX_PATTERN = /\/api\/v1\/?$/;
const ABSOLUTE_URL_PATTERN = /^https?:\/\//i;

export function getBackendOrigin(): string {
  try {
    return new URL(env.apiUrl).origin;
  } catch {
    return 'http://localhost:8000';
  }
}

export function normalizeMediaUrl(value?: string | null): string | null {
  const trimmed = value?.trim();

  if (!trimmed) {
    return null;
  }

  if (ABSOLUTE_URL_PATTERN.test(trimmed)) {
    return trimmed;
  }

  const mediaPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  const origin = getBackendOrigin().replace(API_PREFIX_PATTERN, '');

  try {
    return new URL(mediaPath, origin).toString();
  } catch {
    return null;
  }
}
