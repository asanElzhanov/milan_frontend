'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { useMyReviewsQuery } from '@/entities/review';
import { getApiErrorMessage } from '@/shared/api';
import type { AppLocale } from '@/shared/config';
import { localizedRoutes } from '@/shared/config';
import { Button, EmptyState, ErrorState, SectionTitle, Skeleton } from '@/shared/ui';

import { AccountReviewsList } from './account-reviews-list';
import type { AccountReviewsDictionary } from './account-reviews.dictionary';

const parsePage = (value: string | null) => {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : 1;
};

export function ReviewsPageClient({
  labels,
  locale,
}: {
  labels: AccountReviewsDictionary;
  locale: AppLocale;
}) {
  const page = parsePage(useSearchParams().get('page'));
  const query = useMyReviewsQuery({ page }, { enabled: true });
  if (query.isLoading)
    return (
      <div className="space-y-4">
        <p className="text-caption">{labels.loading}</p>
        <Skeleton className="h-44" />
        <Skeleton className="h-44" />
      </div>
    );
  if (query.isError)
    return (
      <ErrorState
        action={<Button onClick={() => void query.refetch()}>{labels.retry}</Button>}
        description={getApiErrorMessage(query.error)}
        title={labels.loadError}
      />
    );
  if (!query.data || query.data.reviews.length === 0)
    return (
      <EmptyState
        action={
          <Button asChild>
            <Link href={localizedRoutes.catalog(locale)}>{labels.goToCatalog}</Link>
          </Button>
        }
        description={labels.emptyDescription}
        title={labels.emptyTitle}
      />
    );
  return (
    <div className="space-y-6">
      <SectionTitle description={labels.subtitle} title={labels.title} />
      <AccountReviewsList labels={labels} locale={locale} reviews={query.data.reviews} />
    </div>
  );
}
