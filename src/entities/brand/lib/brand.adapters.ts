import { getMediaUrl } from '@/shared/lib';
import {
  getArrayFromResponse,
  isRecord,
  slugifyFallback,
  toBooleanOrUndefined,
  toStringOrNull,
} from '@/shared/lib';

import type { Brand } from '../model/brand.types';

export const adaptBrand = (value: unknown): Brand | null => {
  if (!isRecord(value)) {
    return null;
  }

  const name = toStringOrNull(value.name_ru) ?? toStringOrNull(value.name_en) ??
    toStringOrNull(value.name_kz) ?? toStringOrNull(value.name);

  if (!name) {
    return null;
  }

  const id = typeof value.id === 'string' || typeof value.id === 'number' ? value.id : name;

  return {
    id,
    name,
    name_ru: toStringOrNull(value.name_ru), name_kz: toStringOrNull(value.name_kz),
    name_en: toStringOrNull(value.name_en),
    slug: toStringOrNull(value.slug) ?? slugifyFallback(id),
    description: toStringOrNull(value.description),
    logoUrl: getMediaUrl(toStringOrNull(value.logo) ?? toStringOrNull(value.logo_url)),
    isActive: toBooleanOrUndefined(value.is_active ?? value.active),
  };
};

export const adaptBrandList = (response: unknown): Brand[] =>
  getArrayFromResponse(response)
    .map(adaptBrand)
    .filter((item): item is Brand => Boolean(item));
