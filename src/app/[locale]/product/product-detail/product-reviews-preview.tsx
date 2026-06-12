import type { ProductDetail } from '@/entities/product';
import type { ProductReview } from '@/entities/review';
import { RatingStars } from '@/shared/ui';

import type { ProductDetailDictionary } from './product-detail.types';

type ProductReviewsPreviewProps = {
  dictionary: ProductDetailDictionary;
  product: ProductDetail;
  reviews: ProductReview[];
};

export function ProductReviewsPreview({
  dictionary,
  product,
  reviews,
}: ProductReviewsPreviewProps) {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-overline text-sara-bronze">{dictionary.reviews}</p>
          <h2 className="text-heading text-sara-black">{dictionary.reviews}</h2>
        </div>
        <RatingStars
          reviewsCount={product.reviewsCount}
          showValue
          value={product.averageRating ?? product.rating ?? 0}
        />
      </div>

      {reviews.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-3">
          {reviews.slice(0, 3).map((review) => (
            <article className="sara-card p-5" key={review.id}>
              <RatingStars showValue value={review.rating} />
              <p className="mt-4 text-sm leading-6 text-sara-graphite/75">{review.text}</p>
              <p className="mt-4 text-caption text-sara-graphite/55">
                {review.authorName ?? 'Sara Milan'}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-body text-sara-graphite/65">{dictionary.noReviews}</p>
      )}
    </section>
  );
}
