import { getArrayFromResponse, isRecord, toNumberOrNull, toStringOrNull } from '@/shared/lib';

import type { ProductReview } from '../model/review.types';

const readId = (record: Record<string, unknown>, fallback: string): string | number =>
  typeof record.id === 'string' || typeof record.id === 'number' ? record.id : fallback;

export const adaptProductReview = (value: unknown): ProductReview | null => {
  if (!isRecord(value)) {
    return null;
  }

  const rating = toNumberOrNull(value.rating);

  if (!rating) {
    return null;
  }

  return {
    id: readId(value, `${toStringOrNull(value.created_at) ?? 'review'}-${rating}`),
    productId:
      typeof value.product === 'string' || typeof value.product === 'number' ? value.product : null,
    productSlug: toStringOrNull(value.product_slug),
    authorName: toStringOrNull(value.user_name ?? value.author_name ?? value.author),
    rating,
    text: toStringOrNull(value.text ?? value.comment),
    status: toStringOrNull(value.status),
    createdAt: toStringOrNull(value.created_at ?? value.createdAt),
  };
};

export const adaptProductReviewList = (response: unknown): ProductReview[] =>
  getArrayFromResponse(response)
    .map(adaptProductReview)
    .filter((item): item is ProductReview => Boolean(item));
