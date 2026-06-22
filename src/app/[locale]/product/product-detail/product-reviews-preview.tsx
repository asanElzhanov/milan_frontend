import type { ProductDetail } from '@/entities/product';
import type { ReviewListResponse } from '@/entities/review';
import { ProductReviewsSection } from '@/features/product-review';
import type { AppLocale } from '@/shared/config';

import type { ProductDetailDictionary } from './product-detail.types';

type ProductReviewsPreviewProps = {
  dictionary: ProductDetailDictionary;
  locale: AppLocale;
  product: ProductDetail;
  reviews: ReviewListResponse;
};

export function ProductReviewsPreview({ locale, product, reviews }: ProductReviewsPreviewProps) {
  return (
    <ProductReviewsSection initialReviews={reviews} locale={locale} productSlug={product.slug} />
  );
}
