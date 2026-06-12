import { apiClient, isMockApiMode } from '@/shared/api';
import type { AppLocale } from '@/shared/config';

import {
  adaptHomeBanner,
  adaptHomeCategory,
  adaptHomeProduct,
  getResponseItems,
} from './home.adapters';
import type { HomeBanner, HomeCategory, HomeProductPreview } from './home.types';

const warnHomeApiFailure = (endpoint: string, error: unknown) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn(`[home] ${endpoint} unavailable`, error);
  }
};

const getHomeItems = async <T>(
  endpoint: string,
  adapter: (item: unknown) => T | null,
): Promise<T[]> => {
  if (isMockApiMode) {
    return [];
  }

  try {
    const response = await apiClient.get<unknown>(endpoint, { auth: false });

    return getResponseItems(response)
      .map(adapter)
      .filter((item): item is T => Boolean(item));
  } catch (error) {
    warnHomeApiFailure(endpoint, error);

    return [];
  }
};

export const getHomeHeroBanners = (locale: AppLocale): Promise<HomeBanner[]> =>
  getHomeItems('/api/v1/catalog/banners/?position=hero', (item) => adaptHomeBanner(item, locale));

export const getHomeCategories = (locale: AppLocale): Promise<HomeCategory[]> =>
  getHomeItems('/api/v1/catalog/categories/', (item) => adaptHomeCategory(item, locale));

export const getHomeNewProducts = (locale: AppLocale): Promise<HomeProductPreview[]> =>
  getHomeItems('/api/v1/catalog/products/?is_new=true', (item) => adaptHomeProduct(item, locale));
