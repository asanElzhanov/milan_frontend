import { isRecord, normalizeMediaUrl, toNumberOrNull, toStringOrNull } from '@/shared/lib';

import type {
  CreateProductReviewPayload,
  ProductReview,
  ReviewListResponse,
  ReviewMedia,
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

const adaptReviewMedia = (raw: unknown): ReviewMedia | null => {
  if (!isRecord(raw)) return null;

  const id = readId(raw.id, raw.pk);
  const url = normalizeMediaUrl(readString(raw.url, raw.file, raw.src));
  const mediaType = readString(raw.media_type, raw.mediaType, raw.type)?.toLowerCase();

  if (id === null || !url || (mediaType !== 'image' && mediaType !== 'video')) return null;

  return { id, url, mediaType };
};

export function adaptReview(raw: unknown): ProductReview | null {
  const source = unwrapReview(raw);
  if (!isRecord(source)) return null;

  const product = isRecord(source.product) ? source.product : {};
  const order = isRecord(source.order) ? source.order : {};
  const id = readId(source.id, source.pk);
  if (id === null) return null;

  const parsedRating = toNumberOrNull(source.rating);
  const rating = parsedRating === null ? 0 : Math.min(5, Math.max(1, parsedRating));

  return {
    id,
    productId: readId(source.product_id, source.productId, product.id, product.pk),
    productSlug: readString(source.product_slug, source.productSlug, product.slug),
    productName: readString(
      source.product_name,
      source.productName,
      product.name_ru,
      product.name_kz,
      product.name_en,
      product.name,
      product.title,
    ),
    productNames: isRecord(source.product)
      ? {
          ru: readString(product.name_ru),
          kk: readString(product.name_kz, product.name_kk),
          en: readString(product.name_en),
        }
      : undefined,
    productImageUrl: readString(
      source.product_image,
      source.product_image_url,
      source.productImageUrl,
      product.main_image,
      product.image,
    ),
    orderId: readId(source.order_id, source.orderId, order.id, order.pk),
    orderNumber: readString(source.order_number, source.orderNumber, order.order_number),
    authorName: readString(source.author_name, source.authorName, source.author),
    userName: readString(source.user_name, source.userName, source.username),
    rating,
    title: readString(source.title),
    text: readString(source.text, source.comment, source.body),
    advantages: readString(source.advantages, source.pros),
    disadvantages: readString(source.disadvantages, source.cons),
    status: readString(source.status),
    media: (Array.isArray(source.media)
      ? source.media
      : Array.isArray(source.images)
        ? source.images
        : []
    )
      .map(adaptReviewMedia)
      .filter((item): item is ReviewMedia => Boolean(item)),
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
    moderationComment: readString(source.moderation_comment, source.moderationComment),
    moderatedAt: readString(source.moderated_at, source.moderatedAt),
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

const pageFromLink = (value: unknown): number | null => {
  if (typeof value !== 'string' || !value) return null;
  try {
    const page = Number(new URL(value, 'https://sara-milan.local').searchParams.get('page') ?? 1);
    return Number.isInteger(page) && page > 0 ? page : null;
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
  const previousPage = pageFromLink(record.previous);
  const nextPage = pageFromLink(record.next);
  const currentPage = Math.max(
    toNumberOrNull(record.current_page ?? record.currentPage ?? record.page) ??
      (previousPage ? previousPage + 1 : null) ??
      (nextPage ? nextPage - 1 : null) ??
      1,
    1,
  );
  const totalPages = Math.max(
    toNumberOrNull(record.total_pages ?? record.totalPages) ?? nextPage ?? currentPage,
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
  media?: File[];
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
  if (input.media?.length) payload.media = input.media;
  return payload;
}

export const adaptProductReview = adaptReview;
export const adaptProductReviewList = (raw: unknown): ProductReview[] =>
  adaptReviewList(raw).reviews;
