import { getMediaUrl } from '@/shared/lib';
import {
  getArrayFromResponse,
  isRecord,
  toBooleanOrUndefined,
  toNumberOrNull,
  toStringOrNull,
} from '@/shared/lib';

import type { Banner } from '../model/banner.types';

export const adaptBanner = (value: unknown): Banner | null => {
  if (!isRecord(value)) {
    return null;
  }

  const id =
    typeof value.id === 'string' || typeof value.id === 'number'
      ? value.id
      : (toStringOrNull(value.title) ?? 'banner');

  return {
    id,
    title: toStringOrNull(value.title),
    subtitle: toStringOrNull(value.subtitle),
    description: toStringOrNull(value.description),
    position: toStringOrNull(value.position),
    imageUrl: getMediaUrl(toStringOrNull(value.image) ?? toStringOrNull(value.image_url)),
    ctaLabel: toStringOrNull(value.cta_label) ?? toStringOrNull(value.button_text),
    ctaUrl: toStringOrNull(value.cta_url) ?? toStringOrNull(value.link),
    isActive: toBooleanOrUndefined(value.is_active ?? value.active),
    sortOrder: toNumberOrNull(value.sort_order),
  };
};

export const adaptBannerList = (response: unknown): Banner[] =>
  getArrayFromResponse(response)
    .map(adaptBanner)
    .filter((item): item is Banner => Boolean(item));
