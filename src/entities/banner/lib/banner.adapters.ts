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
      : (toStringOrNull(value.title_ru) ?? toStringOrNull(value.title) ?? 'banner');

  return {
    id,
    title: toStringOrNull(value.title),
    title_ru: toStringOrNull(value.title_ru),
    title_kz: toStringOrNull(value.title_kz),
    title_en: toStringOrNull(value.title_en),
    subtitle: toStringOrNull(value.subtitle),
    subtitle_ru: toStringOrNull(value.subtitle_ru),
    subtitle_kz: toStringOrNull(value.subtitle_kz),
    subtitle_en: toStringOrNull(value.subtitle_en),
    description: toStringOrNull(value.description),
    description_ru: toStringOrNull(value.description_ru),
    description_kz: toStringOrNull(value.description_kz),
    description_en: toStringOrNull(value.description_en),
    position: toStringOrNull(value.position),
    imageUrl: getMediaUrl(toStringOrNull(value.image) ?? toStringOrNull(value.image_url)),
    ctaLabel: toStringOrNull(value.cta_label) ?? toStringOrNull(value.button_text),
    ctaLabel_ru: toStringOrNull(value.cta_label_ru) ?? toStringOrNull(value.button_text_ru),
    ctaLabel_kz: toStringOrNull(value.cta_label_kz) ?? toStringOrNull(value.button_text_kz),
    ctaLabel_en: toStringOrNull(value.cta_label_en) ?? toStringOrNull(value.button_text_en),
    ctaUrl: toStringOrNull(value.cta_url) ?? toStringOrNull(value.link),
    isActive: toBooleanOrUndefined(value.is_active ?? value.active),
    sortOrder: toNumberOrNull(value.sort_order),
  };
};

export const adaptBannerList = (response: unknown): Banner[] =>
  getArrayFromResponse(response)
    .map(adaptBanner)
    .filter((item): item is Banner => Boolean(item));
