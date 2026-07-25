import { env } from '@/shared/config/env';

const ABSOLUTE_URL_PATTERN = /^https?:\/\//i;
const MEDIA_PROXY_PREFIX = '/media-proxy';

const getConfiguredBackendOrigins = (): Set<string> => {
  const candidates = [
    process.env.NEXT_PUBLIC_API_BASE_URL,
    process.env.INTERNAL_API_BASE_URL,
    env.apiUrl,
  ];

  return new Set(
    candidates.flatMap((candidate) => {
      if (!candidate || !ABSOLUTE_URL_PATTERN.test(candidate)) {
        return [];
      }

      try {
        return [new URL(candidate).origin];
      } catch {
        return [];
      }
    }),
  );
};

const toMediaProxyUrl = (url: URL): string => `${MEDIA_PROXY_PREFIX}${url.pathname}${url.search}`;

export function normalizeMediaUrl(value?: string | null): string | null {
  const trimmed = value?.trim();

  if (!trimmed) {
    return null;
  }

  if (trimmed.startsWith(MEDIA_PROXY_PREFIX) || trimmed.startsWith('data:')) {
    return trimmed;
  }

  try {
    if (ABSOLUTE_URL_PATTERN.test(trimmed)) {
      const absoluteUrl = new URL(trimmed);

      return getConfiguredBackendOrigins().has(absoluteUrl.origin)
        ? toMediaProxyUrl(absoluteUrl)
        : absoluteUrl.toString();
    }

    const relativeUrl = new URL(trimmed.startsWith('/') ? trimmed : `/${trimmed}`, 'http://media');

    return toMediaProxyUrl(relativeUrl);
  } catch {
    return null;
  }
}
