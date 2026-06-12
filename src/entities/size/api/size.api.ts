import { apiClient, isMockApiMode } from '@/shared/api';

import { adaptSizeList } from '../lib/size.adapters';
import type { ProductSize } from '../model/size.types';

export const sizeApi = {
  async getSizes(params?: { active?: boolean }): Promise<ProductSize[]> {
    if (isMockApiMode) {
      return [];
    }

    const response = await apiClient.get<unknown>('/api/v1/catalog/sizes/', {
      auth: false,
      cartToken: false,
      query: params,
    });

    return adaptSizeList(response);
  },
};
