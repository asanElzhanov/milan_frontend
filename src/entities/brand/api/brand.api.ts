import { apiClient, isMockApiMode } from '@/shared/api';

import { adaptBrand, adaptBrandList } from '../lib/brand.adapters';
import type { Brand } from '../model/brand.types';

export const brandApi = {
  async getBrands(params?: { active?: boolean }): Promise<Brand[]> {
    if (isMockApiMode) {
      return [];
    }

    const response = await apiClient.get<unknown>('/api/v1/catalog/brands/', {
      auth: false,
      cartToken: false,
      query: params,
    });

    return adaptBrandList(response);
  },

  async getBrandBySlug(slug: string): Promise<Brand | null> {
    if (isMockApiMode) {
      return null;
    }

    const response = await apiClient.get<unknown>(
      `/api/v1/catalog/brands/${encodeURIComponent(slug)}/`,
      { auth: false, cartToken: false },
    );

    return adaptBrand(response);
  },
};
