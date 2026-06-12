import { apiClient, isMockApiMode } from '@/shared/api';
import type { AppLocale } from '@/shared/config';

import { adaptHeaderCategory, getResponseItems } from '../lib/header.adapters';
import { getFallbackHeaderLinks } from '../lib/header-links';
import type { HeaderCategory, HeaderNavItem } from '../model/types';

export const getHeaderCategories = async (locale: AppLocale): Promise<HeaderNavItem[]> => {
  const fallbackLinks = getFallbackHeaderLinks(locale);

  if (isMockApiMode) {
    return fallbackLinks;
  }

  try {
    const response = await apiClient.get<unknown>('/api/v1/catalog/categories/tree/', {
      auth: false,
      cartToken: false,
      query: { active: true },
    });
    const categories = getResponseItems(response)
      .map((item) => adaptHeaderCategory(item, locale))
      .filter((item): item is HeaderCategory => Boolean(item))
      .slice(0, 6);

    return categories.length > 0
      ? categories.map((category) => ({
          id: String(category.id),
          label: category.name,
          href: category.href,
        }))
      : fallbackLinks;
  } catch {
    return fallbackLinks;
  }
};
