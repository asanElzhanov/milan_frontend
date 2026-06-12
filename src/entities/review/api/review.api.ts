import { apiClient, isMockApiMode } from '@/shared/api';

import { adaptProductReviewList } from '../lib/review.adapters';
import type { ProductReview } from '../model/review.types';

export const reviewApi = {
  async getProductReviews(slug: string): Promise<ProductReview[]> {
    if (isMockApiMode) {
      return [];
    }

    const response = await apiClient.get<unknown>(
      `/api/v1/catalog/products/${encodeURIComponent(slug)}/reviews/`,
      { auth: false, cartToken: false },
    );

    return adaptProductReviewList(response);
  },
};
