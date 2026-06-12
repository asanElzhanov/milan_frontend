import type { ProductListItem } from '@/entities/product';
import type { AppLocale } from '@/shared/config';

export type ProductGridProps = {
  products: ProductListItem[];
  locale?: AppLocale;
  isLoading?: boolean;
  error?: unknown;
  emptyTitle?: string;
  emptyDescription?: string;
  showRating?: boolean;
  showColors?: boolean;
  showSizes?: boolean;
  showWishlist?: boolean;
  wishlistIds?: Array<string | number>;
  onWishlistToggle?: (product: ProductListItem) => void;
  columns?: {
    sm?: 1 | 2;
    md?: 2 | 3;
    lg?: 3 | 4;
  };
  className?: string;
};
