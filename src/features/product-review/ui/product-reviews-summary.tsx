import { getAverageRating, type ProductReview } from '@/entities/review';
import { RatingStars } from '@/shared/ui';
import type { AppLocale } from '@/shared/config';

export function ProductReviewsSummary({
  count,
  emptyText,
  locale,
  reviews,
}: {
  reviews: ProductReview[];
  count: number;
  emptyText: string;
  locale: AppLocale;
}) {
  const average = getAverageRating(reviews);
  if (average === null) return <p className="text-body text-sara-graphite/65">{emptyText}</p>;
  const ratingLabel =
    locale === 'ru'
      ? `Рейтинг ${average} из 5`
      : locale === 'kk'
        ? `Рейтинг: ${average} / 5`
        : `Rating ${average} out of 5`;
  return (
    <RatingStars ariaLabel={ratingLabel} reviewsCount={count} showValue size="lg" value={average} />
  );
}
