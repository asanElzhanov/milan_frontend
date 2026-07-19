import type { PaginatedResponse } from '@/shared/api';
import { getMediaUrl } from '@/shared/lib';
import {
  getArrayFromResponse,
  isRecord,
  slugifyFallback,
  toBooleanOrUndefined,
  toNumberOrNull,
  toStringOrNull,
} from '@/shared/lib';

import type {
  ProductDetail,
  ProductListItem,
  ProductMedia,
  ProductVariant,
} from '../model/product.types';

const readId = (record: Record<string, unknown>, fallback: string): string | number =>
  typeof record.id === 'string' || typeof record.id === 'number' ? record.id : fallback;

const readPrice = (value: unknown): number | string | null =>
  typeof value === 'number' || typeof value === 'string' ? value : null;

const readStringArray = (value: unknown): string[] | undefined => {
  if (!Array.isArray(value)) {
    return undefined;
  }

  const items = value
    .map((item) => {
      if (typeof item === 'string' || typeof item === 'number') {
        return String(item);
      }

      if (isRecord(item)) {
        return (
          toStringOrNull(item.name_ru) ??
          toStringOrNull(item.name_en) ??
          toStringOrNull(item.name_kz) ??
          toStringOrNull(item.name) ??
          toStringOrNull(item.value) ??
          toStringOrNull(item.slug) ??
          toStringOrNull(item.hex_code)
        );
      }

      return null;
    })
    .filter((item): item is string => Boolean(item));

  return items.length > 0 ? items : undefined;
};

const readImageUrl = (value: unknown): string | null => {
  const image = toStringOrNull(value);

  return image ? getMediaUrl(image) : null;
};

export const adaptProductListItem = (value: unknown): ProductListItem | null => {
  if (!isRecord(value)) {
    return null;
  }

  const name =
    toStringOrNull(value.name_ru) ??
    toStringOrNull(value.name_en) ??
    toStringOrNull(value.name_kz) ??
    toStringOrNull(value.name) ??
    toStringOrNull(value.title);

  if (!name) {
    return null;
  }

  const id = readId(value, name);
  const slug = toStringOrNull(value.slug) ?? slugifyFallback(id);

  return {
    id,
    name,
    name_ru: toStringOrNull(value.name_ru),
    name_kz: toStringOrNull(value.name_kz),
    name_en: toStringOrNull(value.name_en),
    slug,
    sku: toStringOrNull(value.sku),
    brandName: toStringOrNull(value.brand_name),
    categoryName: toStringOrNull(value.category_name),
    price: readPrice(value.price),
    oldPrice: readPrice(value.old_price ?? value.oldPrice),
    discount: readPrice(value.discount),
    discountPercent: toNumberOrNull(value.discount_percent),
    isNew: toBooleanOrUndefined(value.is_new ?? value.isNew),
    isSale: toBooleanOrUndefined(value.is_sale ?? value.isSale),
    mainImage: readImageUrl(value.main_image ?? value.mainImage ?? value.image),
    minPrice: readPrice(value.min_price),
    inStock: toBooleanOrUndefined(value.in_stock ?? value.inStock),
    availableColors: readStringArray(value.available_colors),
    availableSizes: readStringArray(value.available_sizes),
    averageRating: toNumberOrNull(value.average_rating),
    reviewsCount: toNumberOrNull(value.reviews_count) ?? undefined,
  };
};

export const adaptProductList = (response: unknown): ProductListItem[] =>
  getArrayFromResponse(response)
    .map(adaptProductListItem)
    .filter((item): item is ProductListItem => Boolean(item));

export const adaptProductListResponse = (
  response: unknown,
): PaginatedResponse<ProductListItem> | ProductListItem[] => {
  if (isRecord(response) && Array.isArray(response.results)) {
    return {
      count: toNumberOrNull(response.count) ?? 0,
      next: toStringOrNull(response.next),
      previous: toStringOrNull(response.previous),
      results: adaptProductList(response.results),
    };
  }

  return adaptProductList(response);
};

const adaptProductMediaItem = (
  value: unknown,
  fallbackType: 'image' | 'video',
): ProductMedia | null => {
  if (!isRecord(value)) {
    const directUrl = toStringOrNull(value);

    return directUrl ? { url: getMediaUrl(directUrl), type: fallbackType } : null;
  }

  const rawUrl =
    toStringOrNull(value.image) ?? toStringOrNull(value.file) ?? toStringOrNull(value.url);

  if (!rawUrl) {
    return null;
  }

  const mediaType = toStringOrNull(value.media_type);

  return {
    id: typeof value.id === 'string' || typeof value.id === 'number' ? value.id : undefined,
    url: getMediaUrl(rawUrl),
    type: mediaType === 'video' ? 'video' : fallbackType,
    alt: toStringOrNull(value.alt) ?? toStringOrNull(value.alt_text),
    isPrimary: toBooleanOrUndefined(value.is_main ?? value.isPrimary),
  };
};

const adaptProductMediaList = (value: unknown, fallbackType: 'image' | 'video'): ProductMedia[] =>
  Array.isArray(value)
    ? value
        .map((item) => adaptProductMediaItem(item, fallbackType))
        .filter((item): item is ProductMedia => Boolean(item))
    : [];

const adaptProductVariant = (value: unknown): ProductVariant | null => {
  if (!isRecord(value)) {
    return null;
  }

  const id = typeof value.id === 'string' || typeof value.id === 'number' ? value.id : null;

  if (!id) {
    return null;
  }

  return {
    id,
    sku: toStringOrNull(value.sku ?? value.sku_variant),
    color: isRecord(value.color)
      ? (toStringOrNull(value.color.name) ?? toStringOrNull(value.color.value))
      : toStringOrNull(value.color),
    size: isRecord(value.size)
      ? (toStringOrNull(value.size.name) ?? toStringOrNull(value.size.value))
      : toStringOrNull(value.size),
    price: readPrice(value.variant_price ?? value.final_price ?? value.price),
    oldPrice: readPrice(value.old_price),
    stockQuantity: toNumberOrNull(value.stock_quantity ?? value.stock),
    inStock: toBooleanOrUndefined(value.in_stock ?? value.is_available),
  };
};

export const adaptProductDetail = (response: unknown): ProductDetail | null => {
  if (!isRecord(response)) {
    return null;
  }

  const baseProduct = adaptProductListItem(response);

  if (!baseProduct) {
    return null;
  }

  const images = adaptProductMediaList(response.images, 'image');
  const media = adaptProductMediaList(response.media, 'image');
  const videos = adaptProductMediaList(response.videos, 'video');
  const variants = Array.isArray(response.variants)
    ? response.variants
        .map(adaptProductVariant)
        .filter((item): item is ProductVariant => Boolean(item))
    : [];

  return {
    ...baseProduct,
    description: toStringOrNull(response.description),
    description_ru: toStringOrNull(response.description_ru),
    description_kz: toStringOrNull(response.description_kz),
    description_en: toStringOrNull(response.description_en),
    composition: toStringOrNull(response.composition),
    material: toStringOrNull(response.material),
    season: toStringOrNull(response.season),
    images,
    media,
    videos,
    variants,
    availableSizes: readStringArray(response.available_sizes),
    availableColors: readStringArray(response.available_colors),
    rating: toNumberOrNull(response.rating ?? response.average_rating),
    seoTitle: toStringOrNull(response.seo_title),
    seoDescription: toStringOrNull(response.seo_description),
    metaTitle: toStringOrNull(response.meta_title),
    metaDescription: toStringOrNull(response.meta_description),
  };
};
