import { RatingStars } from '@/shared/ui';

export function ReviewRating({ rating }: { rating: number }) {
  return <RatingStars showValue value={rating} />;
}
