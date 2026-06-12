import { apiClient, isMockApiMode } from '@/shared/api';

import { adaptBannerList } from '../lib/banner.adapters';
import type { Banner } from '../model/banner.types';

export const bannerApi = {
  async getBanners(params?: { position?: string; active?: boolean }): Promise<Banner[]> {
    if (isMockApiMode) {
      return [];
    }

    const response = await apiClient.get<unknown>('/api/v1/catalog/banners/', {
      auth: false,
      cartToken: false,
      query: params,
    });

    return adaptBannerList(response);
  },
};
