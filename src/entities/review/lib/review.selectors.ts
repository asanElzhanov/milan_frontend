import type { ProductReview } from '../model/review.types';

const normalizedStatus = (review?: ProductReview | null) => review?.status?.toLowerCase();

export function isReviewApproved(review?: ProductReview | null): boolean {
  return (
    review?.isApproved === true ||
    normalizedStatus(review) === 'approved' ||
    normalizedStatus(review) === 'published'
  );
}

export function isReviewPending(review?: ProductReview | null): boolean {
  return normalizedStatus(review) === 'pending';
}

export function getReviewAuthor(review?: ProductReview | null): string {
  return review?.authorName?.trim() || review?.userName?.trim() || '';
}

export function getAverageRating(reviews: ProductReview[]): number | null {
  const ratings = reviews.map((review) => review.rating).filter((rating) => rating > 0);
  if (ratings.length === 0) return null;
  return ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
}

export function getApprovedReviews(reviews: ProductReview[]): ProductReview[] {
  return reviews.filter(isReviewApproved);
}
