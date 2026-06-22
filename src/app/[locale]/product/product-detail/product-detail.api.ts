import { productApi } from '@/entities/product';
import { reviewApi } from '@/entities/review';

import type { ProductDetailData } from './product-detail.types';

export async function getProductDetailData(slug: string): Promise<ProductDetailData> {
  const [productResult, similarResult, reviewsResult] = await Promise.allSettled([
    productApi.getProductBySlug(slug),
    productApi.getSimilarProducts(slug),
    reviewApi.getProductReviews(slug),
  ]);

  return {
    product: productResult.status === 'fulfilled' ? productResult.value : null,
    similarProducts: similarResult.status === 'fulfilled' ? similarResult.value : [],
    reviews:
      reviewsResult.status === 'fulfilled'
        ? reviewsResult.value
        : { reviews: [], count: 0, currentPage: 1, totalPages: 1 },
    hasError: productResult.status === 'rejected',
  };
}
