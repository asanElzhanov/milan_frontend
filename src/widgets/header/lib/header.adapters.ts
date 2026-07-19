import type { AppLocale } from '@/shared/config';
import { withLocale } from '@/shared/config';
import { getLocalizedField } from '@/shared/lib';

import type { HeaderCartSummary, HeaderCategory } from '../model/types';

type UnknownRecord = Record<string, unknown>;

export const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === 'object' && value !== null;

export const getResponseItems = (response: unknown): unknown[] => {
  if (Array.isArray(response)) {
    return response;
  }

  if (isRecord(response) && Array.isArray(response.results)) {
    return response.results;
  }

  return [];
};

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');

const readString = (record: UnknownRecord, keys: string[]): string | undefined => {
  for (const key of keys) {
    const value = record[key];

    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }

  return undefined;
};

const readId = (record: UnknownRecord, fallback?: string): string | number | undefined => {
  const value = record.id ?? record.pk ?? fallback;

  return typeof value === 'string' || typeof value === 'number' ? value : undefined;
};

const isInactiveCategory = (record: UnknownRecord): boolean =>
  record.is_active === false || record.active === false;

export const adaptHeaderCategory = (item: unknown, locale: AppLocale): HeaderCategory | null => {
  if (!isRecord(item) || isInactiveCategory(item)) {
    return null;
  }

  const name = getLocalizedField(item, 'name', locale) || readString(item, ['title']);
  const id = readId(item, name);

  if (!id || !name) {
    return null;
  }

  const generatedSlug = slugify(name);
  const slug = readString(item, ['slug', 'code']) ?? (generatedSlug || String(id));

  return {
    id,
    name,
    slug,
    href: withLocale(locale, `/catalog/${encodeURIComponent(slug)}`),
  };
};

const readNumber = (record: UnknownRecord, keys: string[]): number | null => {
  for (const key of keys) {
    const value = record[key];

    if (typeof value === 'number' && Number.isFinite(value)) {
      return Math.max(0, value);
    }

    if (typeof value === 'string' && value.trim()) {
      const parsed = Number(value);

      if (Number.isFinite(parsed)) {
        return Math.max(0, parsed);
      }
    }
  }

  return null;
};

const getItemQuantity = (item: unknown): number => {
  if (!isRecord(item)) {
    return 1;
  }

  return readNumber(item, ['quantity', 'qty', 'count']) ?? 1;
};

const countItems = (items: unknown[]): number =>
  items.reduce<number>((total, item) => total + getItemQuantity(item), 0);

const readTotal = (record: UnknownRecord): number | string | null | undefined => {
  const total = record.total ?? record.total_after_discount ?? record.subtotal;

  return typeof total === 'number' || typeof total === 'string' || total === null
    ? total
    : undefined;
};

export const adaptHeaderCartSummary = (response: unknown): HeaderCartSummary => {
  if (!isRecord(response)) {
    return { count: 0 };
  }

  const count = readNumber(response, ['items_count', 'count', 'total_items']);
  const total = readTotal(response);

  if (count !== null) {
    return { count, total };
  }

  if (Array.isArray(response.items)) {
    return { count: countItems(response.items), total };
  }

  if (Array.isArray(response.cart_items)) {
    return { count: countItems(response.cart_items), total };
  }

  return { count: 0, total };
};
