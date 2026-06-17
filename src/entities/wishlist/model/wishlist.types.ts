import type { ProductListItem } from '@/entities/product';

export type WishlistItem = {
  id?: string | number | null;
  productId: string | number;
  product: ProductListItem;
  createdAt?: string | null;
};

export type Wishlist = {
  items: WishlistItem[];
  productIds: Array<string | number>;
  count: number;
};

export type ToggleWishlistResult = {
  productId: string | number;
  isWishlisted: boolean;
  wishlist?: Wishlist | null;
};
