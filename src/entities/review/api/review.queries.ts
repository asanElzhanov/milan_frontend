'use client';

import { useQuery } from '@tanstack/react-query';

import { reviewApi } from './review.api';
import { reviewKeys } from './review.keys';

export const useProductReviewsQuery = (slug: string) =>
  useQuery({
    queryKey: reviewKeys.product(slug),
    queryFn: () => reviewApi.getProductReviews(slug),
    enabled: Boolean(slug),
  });
