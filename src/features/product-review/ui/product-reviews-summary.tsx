import { getAverageRating, type ProductReview } from '@/entities/review';
import { RatingStars } from '@/shared/ui';

export function ProductReviewsSummary({
  count,
  emptyText,
  reviews,
}: {
  reviews: ProductReview[];
  count: number;
  emptyText: string;
}) {
  const average = getAverageRating(reviews);
  if (average === null) return <p className="text-body text-sara-graphite/65">{emptyText}</p>;
  return <RatingStars reviewsCount={count} showValue size="lg" value={average} />;
}
