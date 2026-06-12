import type { AppLocale } from '@/shared/config';
import { getMediaUrl } from '@/shared/lib';
import { withLocale } from '@/shared/lib';

import type { HomeBanner, HomeCategory, HomeProductPreview } from './home.types';

type UnknownRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === 'object' && value !== null;

const readString = (record: UnknownRecord, keys: string[]): string | undefined => {
  for (const key of keys) {
    const value = record[key];

    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }

  return undefined;
};

const readBoolean = (record: UnknownRecord, keys: string[]): boolean | undefined => {
  for (const key of keys) {
    const value = record[key];

    if (typeof value === 'boolean') {
      return value;
    }
  }

  return undefined;
};

const readNumberOrString = (record: UnknownRecord, keys: string[]): number | string | undefined => {
  for (const key of keys) {
    const value = record[key];

    if (typeof value === 'number' || (typeof value === 'string' && value.trim())) {
      return value;
    }
  }

  return undefined;
};

const readId = (record: UnknownRecord, fallback?: string): string | number | undefined => {
  const value = record.id ?? record.pk ?? record.uuid ?? fallback;

  return typeof value === 'string' || typeof value === 'number' ? value : undefined;
};

export const getResponseItems = (response: unknown): unknown[] => {
  if (Array.isArray(response)) {
    return response;
  }

  if (isRecord(response) && Array.isArray(response.results)) {
    return response.results;
  }

  if (isRecord(response) && Array.isArray(response.items)) {
    return response.items;
  }

  return [];
};

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');

const getImage = (record: UnknownRecord): string | null => {
  const direct = readString(record, [
    'image',
    'image_url',
    'imageUrl',
    'photo',
    'photo_url',
    'cover',
    'cover_url',
    'preview_image',
  ]);

  if (direct) {
    return getMediaUrl(direct);
  }

  const images = record.images;

  if (Array.isArray(images) && images.length > 0 && isRecord(images[0])) {
    const nested = readString(images[0], ['image', 'url', 'src']);

    return nested ? getMediaUrl(nested) : null;
  }

  return null;
};

const normalizeInternalHref = (locale: AppLocale, href?: string, fallbackPath = '/catalog') => {
  if (!href) {
    return withLocale(locale, fallbackPath);
  }

  if (/^https?:\/\//i.test(href)) {
    return href;
  }

  if (href.startsWith(`/${locale}`)) {
    return href;
  }

  return withLocale(locale, href.startsWith('/') ? href : `/${href}`);
};

export const adaptHomeBanner = (item: unknown, locale: AppLocale): HomeBanner | null => {
  if (!isRecord(item)) {
    return null;
  }

  const title = readString(item, ['title', 'name', 'headline']);
  const id = readId(item, title);

  if (!id || !title) {
    return null;
  }

  const ctaHref = readString(item, ['ctaHref', 'cta_href', 'button_url', 'url', 'link']);

  return {
    id,
    title,
    subtitle: readString(item, ['subtitle', 'kicker', 'eyebrow']),
    description: readString(item, ['description', 'text', 'body']),
    imageUrl: getImage(item),
    ctaLabel: readString(item, ['ctaLabel', 'cta_label', 'button_text']),
    ctaHref: normalizeInternalHref(locale, ctaHref),
  };
};

export const adaptHomeCategory = (item: unknown, locale: AppLocale): HomeCategory | null => {
  if (!isRecord(item)) {
    return null;
  }

  const name = readString(item, ['name', 'title']);
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
    imageUrl: getImage(item),
  };
};

export const adaptHomeProduct = (item: unknown, locale: AppLocale): HomeProductPreview | null => {
  if (!isRecord(item)) {
    return null;
  }

  const name = readString(item, ['name', 'title']);
  const id = readId(item, name);
  const price = readNumberOrString(item, ['price', 'current_price', 'final_price']);

  if (!id || !name || price === undefined) {
    return null;
  }

  const generatedSlug = slugify(name);
  const slug = readString(item, ['slug', 'code']) ?? (generatedSlug || String(id));
  const oldPrice = readNumberOrString(item, ['oldPrice', 'old_price', 'compare_at_price']);

  return {
    id,
    slug,
    name,
    href: withLocale(locale, `/product/${encodeURIComponent(slug)}`),
    price,
    oldPrice,
    imageUrl: getImage(item),
    isNew: readBoolean(item, ['is_new', 'isNew', 'new']) ?? true,
    hasDiscount: readBoolean(item, ['has_discount', 'hasDiscount']) ?? Boolean(oldPrice),
  };
};
