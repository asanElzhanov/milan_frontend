import { getReviewAuthor } from '../lib/review.selectors';
import type { ProductReview } from '../model/review.types';
import { ReviewRating } from './review-rating';
import { ReviewStatusBadge } from './review-status-badge';
import { DEFAULT_LOCALE, LOCALE_TAGS, type AppLocale } from '@/shared/config';

export type ReviewCardProps = {
  review: ProductReview;
  labels?: {
    pending?: string;
    approved?: string;
    rejected?: string;
    published?: string;
    hidden?: string;
    anonymous?: string;
    advantages?: string;
    disadvantages?: string;
  };
  showProduct?: boolean;
  locale?: AppLocale;
};

const formatDate = (value: string | null | undefined, locale: AppLocale) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat(LOCALE_TAGS[locale]).format(date);
};

export function ReviewCard({
  labels,
  locale = DEFAULT_LOCALE,
  review,
  showProduct = false,
}: ReviewCardProps) {
  const author = getReviewAuthor(review) || labels?.anonymous || 'Покупатель';
  const date = formatDate(review.createdAt, locale);
  return (
    <article className="sara-card space-y-4 p-5 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <ReviewRating locale={locale} rating={review.rating} />
        {showProduct ? <ReviewStatusBadge labels={labels} status={review.status} /> : null}
      </div>
      {showProduct && review.productName ? (
        <p className="text-sm font-medium text-sara-graphite">{review.productName}</p>
      ) : null}
      <div className="flex flex-wrap gap-x-3 text-caption text-sara-graphite/60">
        <span>{author}</span>
        {date ? <time dateTime={review.createdAt ?? undefined}>{date}</time> : null}
      </div>
      {review.title ? (
        <h3 className="font-fashion text-xl text-sara-black">{review.title}</h3>
      ) : null}
      {review.text ? (
        <p className="text-sm leading-6 text-sara-graphite/75">{review.text}</p>
      ) : null}
      {review.advantages ? (
        <div>
          <p className="text-caption font-medium text-emerald-800">
            {labels?.advantages ?? 'Плюсы'}
          </p>
          <p className="mt-1 text-sm leading-6 text-sara-graphite/75">{review.advantages}</p>
        </div>
      ) : null}
      {review.disadvantages ? (
        <div>
          <p className="text-caption font-medium text-red-800">
            {labels?.disadvantages ?? 'Минусы'}
          </p>
          <p className="mt-1 text-sm leading-6 text-sara-graphite/75">{review.disadvantages}</p>
        </div>
      ) : null}
    </article>
  );
}
