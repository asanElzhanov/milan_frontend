import { apiClient, isMockApiMode } from '@/shared/api';
import type { AppLocale } from '@/shared/config';
import { withLocale } from '@/shared/lib';

import { getFallbackHeaderLinks } from '../lib/header-links';
import type { HeaderCategory, HeaderNavItem } from '../model/types';

type CategoryCandidate = {
  id?: string | number;
  name?: string;
  title?: string;
  slug?: string;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');

const getItems = (response: unknown): unknown[] => {
  if (Array.isArray(response)) {
    return response;
  }

  if (isRecord(response) && Array.isArray(response.results)) {
    return response.results;
  }

  return [];
};

const normalizeCategory = (item: unknown, locale: AppLocale): HeaderCategory | null => {
  if (!isRecord(item)) {
    return null;
  }

  const candidate = item as CategoryCandidate;
  const id = candidate.id ?? candidate.slug ?? candidate.name ?? candidate.title;
  const name = candidate.name ?? candidate.title;

  if (!id || !name) {
    return null;
  }

  const slug = candidate.slug || slugify(name) || String(id);

  return {
    id,
    name,
    slug,
    href: withLocale(locale, `/catalog?category=${encodeURIComponent(slug)}`),
  };
};

export const getHeaderCategories = async (locale: AppLocale): Promise<HeaderNavItem[]> => {
  const fallbackLinks = getFallbackHeaderLinks(locale);

  if (isMockApiMode) {
    return fallbackLinks;
  }

  try {
    const response = await apiClient.get<unknown>('/api/v1/catalog/categories/', {
      auth: false,
    });
    const categories = getItems(response)
      .map((item) => normalizeCategory(item, locale))
      .filter((item): item is HeaderCategory => Boolean(item))
      .slice(0, 6);

    return categories.length > 0
      ? categories.map((category) => ({ label: category.name, href: category.href }))
      : fallbackLinks;
  } catch {
    return fallbackLinks;
  }
};
