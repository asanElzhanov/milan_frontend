'use client';

import { ReviewCard, useProductReviewsQuery, type ReviewListResponse } from '@/entities/review';
import { getApiErrorMessage } from '@/shared/api';
import type { AppLocale } from '@/shared/config';
import { Button, EmptyState, ErrorState, SectionTitle, Skeleton } from '@/shared/ui';
import { useState } from 'react';

import { getProductReviewDictionary } from '../product-review.dictionary';
import { ProductReviewForm } from './product-review-form';
import { ProductReviewsSummary } from './product-reviews-summary';

export type ProductReviewsSectionProps = {
  productSlug: string;
  productId: string | number;
  locale: AppLocale;
  initialReviews?: ReviewListResponse | null;
};

export function ProductReviewsSection({
  initialReviews,
  locale,
  productSlug,
  productId,
}: ProductReviewsSectionProps) {
  const [page, setPage] = useState(1);
  const labels = getProductReviewDictionary(locale);
  const query = useProductReviewsQuery(productSlug, {
    initialData: page === 1 ? (initialReviews ?? undefined) : undefined,
    page,
  });
  const reviewList = query.data;
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
    <section className="space-y-8" id="reviews">
      <SectionTitle
        eyebrow={labels.reviews}
        title={labels.reviews}
        action={
          reviewList ? (
            <ProductReviewsSummary
              count={reviewList.count}
              emptyText={labels.noReviews}
              locale={locale}
              reviews={reviewList.reviews}
            />
          ) : null
        }
      />
      {query.isLoading ? (
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
        </div>
      ) : null}
      {query.isError && !reviewList ? (
        <ErrorState
          action={<Button onClick={() => void query.refetch()}>{labels.retry}</Button>}
          description={getApiErrorMessage(query.error)}
          title={labels.loadError}
        />
      ) : null}
      {reviewList && reviewList.reviews.length === 0 ? (
        <EmptyState description={labels.firstReview} title={labels.noReviews} />
      ) : null}
      {reviewList && reviewList.reviews.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {reviewList.reviews.map((review) => (
            <ReviewCard key={review.id} labels={cardLabels} locale={locale} review={review} />
          ))}
        </div>
      ) : null}
      {reviewList && reviewList.totalPages > 1 ? (
        <div className="flex items-center justify-center gap-3">
          <Button
            disabled={page <= 1 || query.isFetching}
            onClick={() => setPage((v) => v - 1)}
            variant="outline"
          >
            {labels.previous}
          </Button>
          <span className="text-sm text-sara-graphite">
            {page} / {reviewList.totalPages}
          </span>
          <Button
            disabled={page >= reviewList.totalPages || query.isFetching}
            onClick={() => setPage((v) => v + 1)}
            variant="outline"
          >
            {labels.next}
          </Button>
        </div>
      ) : null}
      <ProductReviewForm
        labels={labels}
        locale={locale}
        productId={productId}
        productSlug={productSlug}
      />
    </section>
  );
}
