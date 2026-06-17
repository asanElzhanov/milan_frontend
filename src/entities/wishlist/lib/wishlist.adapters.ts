import { adaptProductListItem } from '@/entities/product';
import { getArrayFromResponse, isRecord, toBooleanOrUndefined, toStringOrNull } from '@/shared/lib';

import type { ToggleWishlistResult, Wishlist, WishlistItem } from '../model/wishlist.types';

const createEmptyWishlist = (): Wishlist => ({
  items: [],
  productIds: [],
  count: 0,
});

const readId = (...values: unknown[]): string | number | null => {
  for (const value of values) {
    if (typeof value === 'string' || typeof value === 'number') {
      return value;
    }
  }

  return null;
};

const getProductCandidate = (raw: unknown): unknown => {
  if (!isRecord(raw)) {
    return raw;
  }

  return raw.product ?? raw.item ?? raw;
};

export function adaptWishlistItem(raw: unknown): WishlistItem | null {
  const product = adaptProductListItem(getProductCandidate(raw));

  if (!product) {
    return null;
  }

  const record = isRecord(raw) ? raw : {};
  const productId = readId(record.product_id, record.productId, product.id, record.id);

  if (productId === null) {
    return null;
  }

  return {
    id: readId(record.id),
    productId,
    product,
    createdAt: toStringOrNull(record.created_at),
  };
}

const getWishlistItemsCandidate = (raw: unknown): unknown[] => {
  if (Array.isArray(raw)) {
    return raw;
  }

  if (!isRecord(raw)) {
    return [];
  }

  if (Array.isArray(raw.results)) {
    return raw.results;
  }

  if (Array.isArray(raw.items)) {
    return raw.items;
  }

  if (Array.isArray(raw.products)) {
    return raw.products;
  }

  if (Array.isArray(raw.wishlist)) {
    return raw.wishlist;
  }

  if (isRecord(raw.data)) {
    return getWishlistItemsCandidate(raw.data);
  }

  return getArrayFromResponse(raw);
};

export function adaptWishlist(raw: unknown): Wishlist {
  const source =
    isRecord(raw) && raw.wishlist !== undefined && !Array.isArray(raw.wishlist)
      ? raw.wishlist
      : raw;
  const items = getWishlistItemsCandidate(source)
    .map(adaptWishlistItem)
    .filter((item): item is WishlistItem => Boolean(item));
  const productIds = Array.from(new Set(items.map((item) => item.productId)));
  const count = isRecord(source) && typeof source.count === 'number' ? source.count : items.length;

  return {
    items,
    productIds,
    count,
  };
}

const readToggleState = (raw: unknown): boolean | null => {
  if (!isRecord(raw)) {
    return null;
  }

  const explicit =
    toBooleanOrUndefined(raw.is_wishlisted) ??
    toBooleanOrUndefined(raw.is_wishlist) ??
    toBooleanOrUndefined(raw.is_favorite) ??
    toBooleanOrUndefined(raw.in_wishlist) ??
    toBooleanOrUndefined(raw.added);

  if (explicit !== undefined) {
    return explicit;
  }

  const removed = toBooleanOrUndefined(raw.removed);

  if (removed !== undefined) {
    return !removed;
  }

  const status = toStringOrNull(raw.status)?.toLowerCase();

  if (status) {
    return ['added', 'created', 'in_wishlist', 'wishlisted'].includes(status)
      ? true
      : ['removed', 'deleted'].includes(status)
        ? false
        : null;
  }

  return null;
};

export function adaptToggleWishlistResult(
  raw: unknown,
  productId: string | number,
): ToggleWishlistResult {
  const record = isRecord(raw) ? raw : {};
  const resolvedProductId = readId(record.product_id, record.productId, productId) ?? productId;
  const wishlist = record.wishlist !== undefined ? adaptWishlist(record.wishlist) : null;
  const explicitState = readToggleState(raw);

  return {
    productId: resolvedProductId,
    isWishlisted:
      explicitState ??
      (wishlist ? wishlist.productIds.map(String).includes(String(resolvedProductId)) : false),
    wishlist,
  };
}

export { createEmptyWishlist };
