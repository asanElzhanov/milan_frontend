import { apiClient, isMockApiMode, type PaginatedResponse } from '@/shared/api';

import {
  adaptProductDetail,
  adaptProductList,
  adaptProductListResponse,
} from '../lib/product.adapters';
import { normalizeProductListQuery } from '../lib/product-query';
import type { ProductListQuery } from '../model/product-query.types';
import type { ProductDetail, ProductListItem } from '../model/product.types';

export const productApi = {
  async getProducts(
    query?: ProductListQuery,
  ): Promise<PaginatedResponse<ProductListItem> | ProductListItem[]> {
    if (isMockApiMode) {
      return [];
    }

    const response = await apiClient.get<unknown>('/api/v1/catalog/products/', {
      auth: false,
      cartToken: false,
      query: normalizeProductListQuery(query),
    });

    return adaptProductListResponse(response);
  },

  async getProductBySlug(slug: string): Promise<ProductDetail | null> {
    if (isMockApiMode) {
      return null;
    }

    const response = await apiClient.get<unknown>(
      `/api/v1/catalog/products/${encodeURIComponent(slug)}/`,
      { auth: false, cartToken: false },
    );

    return adaptProductDetail(response);
  },

  async getSimilarProducts(slug: string): Promise<ProductListItem[]> {
    if (isMockApiMode) {
      return [];
    }

    const response = await apiClient.get<unknown>(
      `/api/v1/catalog/products/${encodeURIComponent(slug)}/similar/`,
      { auth: false, cartToken: false },
    );

    return adaptProductList(response);
  },
};
