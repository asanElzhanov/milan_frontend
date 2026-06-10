import { env } from '@/shared/config/env';

export const IMAGE_FALLBACK = '/images/product-placeholder.svg';

const isAbsoluteUrl = (path: string): boolean => /^https?:\/\//i.test(path);

export const getMediaUrl = (path?: string | null): string => {
  if (!path) {
    return IMAGE_FALLBACK;
  }

  const trimmedPath = path.trim();

  if (!trimmedPath) {
    return IMAGE_FALLBACK;
  }

  if (isAbsoluteUrl(trimmedPath)) {
    return trimmedPath;
  }

  try {
    return new URL(trimmedPath, env.apiUrl).toString();
  } catch {
    return IMAGE_FALLBACK;
  }
};
