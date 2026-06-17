export { wishlistApi } from './api/wishlist.api';
export { wishlistKeys } from './api/wishlist.keys';
export { useToggleWishlistMutation, useWishlistQuery } from './api/wishlist.queries';
export {
  adaptToggleWishlistResult,
  adaptWishlist,
  adaptWishlistItem,
  createEmptyWishlist,
} from './lib/wishlist.adapters';
export {
  getWishlistCount,
  getWishlistProductIds,
  isProductWishlisted,
} from './lib/wishlist.selectors';
export type { ToggleWishlistResult, Wishlist, WishlistItem } from './model/wishlist.types';
