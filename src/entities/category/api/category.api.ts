import { apiClient, isMockApiMode } from '@/shared/api';

import { adaptCategory, adaptCategoryList } from '../lib/category.adapters';
import type { Category } from '../model/category.types';

export const categoryApi = {
  async getCategories(params?: { active?: boolean }): Promise<Category[]> {
    if (isMockApiMode) {
      return [];
    }

    const response = await apiClient.get<unknown>('/api/v1/catalog/categories/', {
      auth: false,
      cartToken: false,
      query: params,
    });

    return adaptCategoryList(response);
  },

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    if (isMockApiMode) {
      return null;
    }

    const response = await apiClient.get<unknown>(
      `/api/v1/catalog/categories/${encodeURIComponent(slug)}/`,
      {
        auth: false,
        cartToken: false,
      },
    );

    return adaptCategory(response);
  },

  async getCategoryTree(params?: { active?: boolean }): Promise<Category[]> {
    if (isMockApiMode) {
      return [];
    }

    const response = await apiClient.get<unknown>('/api/v1/catalog/categories/tree/', {
      auth: false,
      cartToken: false,
      query: params,
    });

    return adaptCategoryList(response);
  },
};
