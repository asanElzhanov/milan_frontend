import Link from 'next/link';

import { ReviewCard, type ProductReview } from '@/entities/review';
import type { AppLocale } from '@/shared/config';
import { localizedRoutes } from '@/shared/config';

import type { AccountReviewsDictionary } from './account-reviews.dictionary';

export function AccountReviewsList({
  labels,
  locale,
  reviews,
}: {
  labels: AccountReviewsDictionary;
  locale: AppLocale;
  reviews: ProductReview[];
}) {
  const cardLabels = {
    pending: labels.pending,
    approved: labels.approved,
    rejected: labels.rejected,
    published: labels.published,
    hidden: labels.hidden,
    anonymous: labels.anonymous,
    advantages: labels.advantages,
    disadvantages: labels.disadvantages,
  };
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div className="space-y-2" key={review.id}>
          <ReviewCard labels={cardLabels} review={review} showProduct />
          {review.productSlug ? (
            <Link
              className="sara-focus inline-block text-sm font-medium text-sara-bronze underline-offset-4 hover:underline"
              href={localizedRoutes.product(locale, review.productSlug)}
            >
              {labels.viewProduct}
            </Link>
          ) : null}
        </div>
      ))}
    </div>
  );
}
