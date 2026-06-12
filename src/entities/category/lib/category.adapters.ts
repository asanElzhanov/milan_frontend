import { getMediaUrl } from '@/shared/lib';
import {
  getArrayFromResponse,
  isRecord,
  slugifyFallback,
  toBooleanOrUndefined,
  toStringOrNull,
} from '@/shared/lib';

import type { Category } from '../model/category.types';

const readId = (item: Record<string, unknown>, fallback: string): string | number =>
  typeof item.id === 'string' || typeof item.id === 'number' ? item.id : fallback;

export const adaptCategory = (value: unknown): Category | null => {
  if (!isRecord(value)) {
    return null;
  }

  const name = toStringOrNull(value.name) ?? toStringOrNull(value.title);

  if (!name) {
    return null;
  }

  const id = readId(value, name);
  const slug = toStringOrNull(value.slug) ?? slugifyFallback(name || id);
  const children = getArrayFromResponse(value.children)
    .map(adaptCategory)
    .filter((item): item is Category => Boolean(item));

  return {
    id,
    name,
    slug,
    description: toStringOrNull(value.description),
    imageUrl: getMediaUrl(toStringOrNull(value.image) ?? toStringOrNull(value.image_url)),
    parentId:
      typeof value.parent === 'string' || typeof value.parent === 'number' ? value.parent : null,
    isActive: toBooleanOrUndefined(value.is_active ?? value.active),
    children: children.length > 0 ? children : undefined,
  };
};

export const adaptCategoryList = (response: unknown): Category[] =>
  getArrayFromResponse(response)
    .map(adaptCategory)
    .filter((item): item is Category => Boolean(item));
