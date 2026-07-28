'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import type { AppLocale } from '@/shared/config';
import { localizedRoutes } from '@/shared/config';
import { Pagination } from '@/shared/ui';

export function AccountReviewsPagination({
  currentPage,
  isFetching,
  locale,
  totalPages,
}: {
  currentPage: number;
  isFetching: boolean;
  locale: AppLocale;
  totalPages: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page <= 1) params.delete('page');
    else params.set('page', String(page));

    const query = params.toString();
    router.push(`${localizedRoutes.accountReviews(locale)}${query ? `?${query}` : ''}`);
  };

  return (
    <Pagination
      disabled={isFetching}
      locale={locale}
      onPageChange={handlePageChange}
      page={currentPage}
      totalPages={totalPages}
    />
  );
}
