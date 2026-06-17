import type { Wishlist } from '../model/wishlist.types';

export function getWishlistProductIds(wishlist?: Wishlist | null): Array<string | number> {
  return wishlist?.productIds ?? [];
}

export function isProductWishlisted(
  wishlist: Wishlist | null | undefined,
  productId: string | number,
): boolean {
  return getWishlistProductIds(wishlist).map(String).includes(String(productId));
}

export function getWishlistCount(wishlist?: Wishlist | null): number {
  return wishlist?.count ?? 0;
}
