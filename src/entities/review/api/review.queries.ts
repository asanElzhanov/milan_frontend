'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getAccessToken } from '@/shared/api';
import { productKeys } from '@/entities/product';

import type { CreateProductReviewPayload, ReviewListResponse } from '../model/review.types';
import { reviewApi } from './review.api';
import { reviewKeys } from './review.keys';

export function useProductReviewsQuery(
  slug: string | null | undefined,
  options?: { enabled?: boolean; initialData?: ReviewListResponse; page?: number },
) {
  const page = options?.page ?? 1;
  return useQuery({
    queryKey: reviewKeys.product(slug ?? '', page),
    queryFn: () => reviewApi.getProductReviews(slug as string, page),
    enabled: Boolean(slug) && (options?.enabled ?? true),
    initialData: options?.initialData,
    retry: 1,
  });
}

export function useCreateProductReviewMutation(slug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateProductReviewPayload) =>
      reviewApi.createProductReview(payload),
    retry: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [...reviewKeys.all, 'product', slug] });
      await queryClient.invalidateQueries({ queryKey: productKeys.detail(slug) });
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
