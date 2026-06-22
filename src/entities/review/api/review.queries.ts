'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getAccessToken } from '@/shared/api';

import type { CreateProductReviewPayload, ReviewListResponse } from '../model/review.types';
import { reviewApi } from './review.api';
import { reviewKeys } from './review.keys';

export function useProductReviewsQuery(
  slug: string | null | undefined,
  options?: { enabled?: boolean; initialData?: ReviewListResponse },
) {
  return useQuery({
    queryKey: reviewKeys.product(slug ?? ''),
    queryFn: () => reviewApi.getProductReviews(slug as string),
    enabled: Boolean(slug) && (options?.enabled ?? true),
    initialData: options?.initialData,
    retry: 1,
  });
}

export function useCreateProductReviewMutation(slug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateProductReviewPayload) =>
      reviewApi.createProductReview(slug, payload),
    retry: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: reviewKeys.product(slug) });
      await queryClient.invalidateQueries({ queryKey: [...reviewKeys.all, 'account'] });
    },
  });
}

export function useMyReviewsQuery(params?: { page?: number }, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: reviewKeys.account(params),
    queryFn: () => reviewApi.getMyReviews(params),
    enabled: options?.enabled ?? Boolean(getAccessToken()),
    retry: 1,
  });
}
