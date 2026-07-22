'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { type AppLocale, localizedRoutes } from '@/shared/config';
import { Pagination } from '@/shared/ui';

type OrdersPaginationProps = {
  currentPage: number;
  locale: AppLocale;
  totalPages: number;
};

export function OrdersPagination({ currentPage, locale, totalPages }: OrdersPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) {
    return null;
  }

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page <= 1) {
      params.delete('page');
    } else {
      params.set('page', String(page));
    }

    const query = params.toString();
    router.push(`${localizedRoutes.accountOrders(locale)}${query ? `?${query}` : ''}`);
  };

  return (
    <Pagination
      className="mt-6"
      locale={locale}
      onPageChange={handlePageChange}
      page={currentPage}
      totalPages={totalPages}
    />
  );
}
