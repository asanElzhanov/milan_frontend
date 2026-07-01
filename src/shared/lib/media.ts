import { normalizeMediaUrl } from './media-url';

export const IMAGE_FALLBACK = '/images/product-placeholder.svg';

export const getMediaUrl = (path?: string | null): string => {
  return normalizeMediaUrl(path) ?? IMAGE_FALLBACK;
};
