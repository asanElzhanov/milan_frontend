import { apiClient, isMockApiMode } from '@/shared/api';

import { adaptColorList } from '../lib/color.adapters';
import type { ProductColor } from '../model/color.types';

export const colorApi = {
  async getColors(params?: { active?: boolean }): Promise<ProductColor[]> {
    if (isMockApiMode) {
      return [];
    }

    const response = await apiClient.get<unknown>('/api/v1/catalog/colors/', {
      auth: false,
      cartToken: false,
      query: params,
    });

    return adaptColorList(response);
  },
};
