import {
  getArrayFromResponse,
  isRecord,
  slugifyFallback,
  toBooleanOrUndefined,
  toStringOrNull,
} from '@/shared/lib';

import type { ProductColor } from '../model/color.types';

export const adaptColor = (value: unknown): ProductColor | null => {
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
    hex: toStringOrNull(value.hex_code) ?? toStringOrNull(value.hex),
    isActive: toBooleanOrUndefined(value.is_active ?? value.active),
  };
};

export const adaptColorList = (response: unknown): ProductColor[] =>
  getArrayFromResponse(response)
    .map(adaptColor)
    .filter((item): item is ProductColor => Boolean(item));
