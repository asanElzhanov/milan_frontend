import {
  getArrayFromResponse,
  isRecord,
  slugifyFallback,
  toBooleanOrUndefined,
  toNumberOrNull,
  toStringOrNull,
} from '@/shared/lib';

import type { ProductSize } from '../model/size.types';

export const adaptSize = (value: unknown): ProductSize | null => {
  if (!isRecord(value)) {
    return null;
  }

  const rawValue = toStringOrNull(value.value);
  const name = toStringOrNull(value.name_ru) ?? toStringOrNull(value.name_en) ??
    toStringOrNull(value.name_kz) ?? toStringOrNull(value.name) ?? rawValue;

  if (!name) {
    return null;
  }

  const id = typeof value.id === 'string' || typeof value.id === 'number' ? value.id : name;

  return {
    id,
    name,
    name_ru: toStringOrNull(value.name_ru), name_kz: toStringOrNull(value.name_kz),
    name_en: toStringOrNull(value.name_en),
    value: rawValue ?? name,
    slug: toStringOrNull(value.slug) ?? slugifyFallback(id),
    sortOrder: toNumberOrNull(value.sort_order),
    isActive: toBooleanOrUndefined(value.is_active ?? value.active),
  };
};

export const adaptSizeList = (response: unknown): ProductSize[] =>
  getArrayFromResponse(response)
    .map(adaptSize)
    .filter((item): item is ProductSize => Boolean(item));
