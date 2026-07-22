import { cn } from '@/shared/lib';
import { RatingStars } from '@/shared/ui';

export type ProductRatingProps = {
  averageRating?: number | null;
  reviewsCount?: number;
  showEmpty?: boolean;
  className?: string;
  ariaLabel?: string;
};

export function ProductRating({
  ariaLabel,
  averageRating,
  className,
  reviewsCount,
  showEmpty = false,
}: ProductRatingProps) {
  if ((averageRating === null || averageRating === undefined) && !showEmpty) {
    return null;
  }

  return (
    <RatingStars
      ariaLabel={ariaLabel}
      className={cn('text-sara-graphite/70', className)}
      reviewsCount={reviewsCount}
      showValue={averageRating !== null && averageRating !== undefined}
      value={averageRating ?? 0}
    />
  );
}
