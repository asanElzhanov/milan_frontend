import type { ReviewListResponse } from '@/entities/review';
import { ProductReviewsSection } from '@/features/product-review';
import type { AppLocale } from '@/shared/config';

import type { ProductDetailDictionary } from './product-detail.types';

type ProductReviewsPreviewProps = {
  dictionary: ProductDetailDictionary;
  locale: AppLocale;
  productSlug: string;
  productId: string | number;
  reviews: ReviewListResponse;
};

export function ProductReviewsPreview({
  locale,
  productSlug,
  productId,
  reviews,
}: ProductReviewsPreviewProps) {
  return (
    <ProductReviewsSection initialReviews={reviews} locale={locale} productId={productId} productSlug={productSlug} />
  );
}
