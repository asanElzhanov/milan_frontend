import { isRecord, toNumberOrNull, toStringOrNull } from '@/shared/lib';

import type {
  CreateProductReviewPayload,
  ProductReview,
  ReviewListResponse,
} from '../model/review.types';

const readId = (...values: unknown[]): string | number | null => {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value;
    if (typeof value === 'number' && Number.isFinite(value)) return value;
  }
  return null;
};

const readString = (...values: unknown[]): string | null => {
  for (const value of values) {
    const result = toStringOrNull(value);
    if (result) return result;
  }
  return null;
};

const unwrapReview = (raw: unknown): unknown => {
  if (!isRecord(raw)) return raw;
  if (raw.review !== undefined) return raw.review;
  if (isRecord(raw.data) && raw.data.review !== undefined) return raw.data.review;
  if (isRecord(raw.data) && (raw.data.id !== undefined || raw.data.rating !== undefined)) {
    return raw.data;
  }
  return raw;
};

export function adaptReview(raw: unknown): ProductReview | null {
  const source = unwrapReview(raw);
  if (!isRecord(source)) return null;

  const product = isRecord(source.product) ? source.product : {};
  const id = readId(source.id, source.pk);
  if (id === null) return null;

  const parsedRating = toNumberOrNull(source.rating);
  const rating = parsedRating === null ? 0 : Math.min(5, Math.max(1, parsedRating));

  return {
    id,
    productId: readId(source.product_id, source.productId, product.id, product.pk),
    productSlug: readString(source.product_slug, source.productSlug, product.slug),
    productName: readString(source.product_name, source.productName, product.name, product.title),
    productImageUrl: readString(
      source.product_image,
      source.product_image_url,
      source.productImageUrl,
      product.main_image,
      product.image,
    ),
    orderId: readId(source.order_id, source.orderId, source.order),
    orderNumber: readString(
      source.order_number,
      source.orderNumber,
      isRecord(source.order) ? source.order.order_number : undefined,
    ),
    authorName: readString(source.author_name, source.authorName, source.author),
    userName: readString(source.user_name, source.userName, source.username),
    rating,
    title: readString(source.title),
    text: readString(source.text, source.comment, source.body),
    advantages: readString(source.advantages, source.pros),
    disadvantages: readString(source.disadvantages, source.cons),
    status: readString(source.status),
    images: Array.isArray(source.images) ? source.images : undefined,
    isVerifiedPurchase:
      typeof source.is_verified_purchase === 'boolean'
        ? source.is_verified_purchase
        : typeof source.isVerifiedPurchase === 'boolean'
          ? source.isVerifiedPurchase
          : undefined,
    isApproved:
      typeof source.is_approved === 'boolean'
        ? source.is_approved
        : typeof source.isApproved === 'boolean'
          ? source.isApproved
          : undefined,
    createdAt: readString(source.created_at, source.createdAt),
    updatedAt: readString(source.updated_at, source.updatedAt),
  };
}

const unwrapList = (raw: unknown): unknown => {
  if (!isRecord(raw)) return raw;
  if (Array.isArray(raw.results) || Array.isArray(raw.reviews)) return raw;
  if (raw.data !== undefined) return raw.data;
  return raw;
};

const pageFromLink = (value: unknown, offset: number): number | null => {
  if (typeof value !== 'string' || !value) return null;
  try {
    const page = Number(new URL(value, 'https://sara-milan.local').searchParams.get('page') ?? 1);
    return Number.isInteger(page) && page > 0 ? page + offset : null;
  } catch {
    return null;
  }
};

export function adaptReviewList(raw: unknown): ReviewListResponse {
  const source = unwrapList(raw);
  const record = isRecord(source) ? source : {};
  const items = Array.isArray(source)
    ? source
    : Array.isArray(record.results)
      ? record.results
      : Array.isArray(record.reviews)
        ? record.reviews
        : record.review !== undefined
          ? [record.review]
          : [];
  const reviews = items
    .map(adaptReview)
    .filter((review): review is ProductReview => Boolean(review));
  const count = Math.max(toNumberOrNull(record.count) ?? reviews.length, 0);
  const currentPage = Math.max(
    toNumberOrNull(record.current_page ?? record.currentPage ?? record.page) ??
      pageFromLink(record.previous, 1) ??
      pageFromLink(record.next, -1) ??
      1,
    1,
  );
  const pageSize = Math.max(items.length, 1);
  const totalPages = Math.max(
    toNumberOrNull(record.total_pages ?? record.totalPages) ?? Math.ceil(count / pageSize),
    1,
  );

  return { reviews, count, currentPage, totalPages };
}

export function createReviewPayload(input: {
  rating: number;
  text?: string;
  orderId?: string | number | null;
  orderNumber?: string | null;
  productId?: string | number | null;
  productSlug?: string | null;
}): CreateProductReviewPayload {
  const payload: CreateProductReviewPayload = {
    rating: Math.min(5, Math.max(1, Math.round(input.rating))),
  };
  const text = input.text?.trim();
  const orderNumber = input.orderNumber?.trim();
  const productSlug = input.productSlug?.trim();
  if (text) payload.text = text;
  if (input.orderId !== null && input.orderId !== undefined) payload.order_id = input.orderId;
  if (orderNumber) payload.order_number = orderNumber;
  if (input.productId !== null && input.productId !== undefined)
    payload.product_id = input.productId;
  if (productSlug) payload.product_slug = productSlug;
  return payload;
}

export const adaptProductReview = adaptReview;
export const adaptProductReviewList = (raw: unknown): ProductReview[] =>
  adaptReviewList(raw).reviews;
