import type { ProductDetail, ProductListItem, ProductVariant } from '@/entities/product';
import type { ProductReview } from '@/entities/review';
import type { AppLocale } from '@/shared/config';

export type ProductDetailPageProps = {
  locale: AppLocale;
  slug: string;
};

export type ProductDetailData = {
  product: ProductDetail | null;
  similarProducts: ProductListItem[];
  reviews: ProductReview[];
  hasError: boolean;
};

export type ProductGalleryItem = {
  id: string;
  type: 'image' | 'video';
  url: string;
  alt?: string | null;
};

export type ProductDetailDictionary = {
  size: string;
  color: string;
  chooseSize: string;
  chooseColor: string;
  inStock: string;
  outOfStock: string;
  stockLeft: string;
  addToCart: string;
  selectVariant: string;
  description: string;
  composition: string;
  material: string;
  season: string;
  reviews: string;
  noReviews: string;
  similar: string;
  notFoundTitle: string;
  notFoundDescription: string;
  backToCatalog: string;
  cartComingSoon: string;
};

export type SelectedVariantState = {
  selectedColor: string | null;
  selectedSize: string | null;
  selectedVariant: ProductVariant | null;
};
