'use client';

import { useRouter } from 'next/navigation';

import { Pagination } from '@/shared/ui';

import { buildCatalogHref, setFilterValue } from './catalog-url';
import type { CatalogPageProps } from './catalog.types';

type CatalogPaginationProps = Pick<CatalogPageProps, 'categorySlug' | 'locale' | 'searchParams'> & {
  currentPage: number;
  totalPages: number;
};

export function CatalogPagination({
  categorySlug,
  currentPage,
  locale,
  searchParams,
  totalPages,
}: CatalogPaginationProps) {
  const router = useRouter();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination
      className="mt-12"
      locale={locale}
      onPageChange={(page) =>
        router.push(
          buildCatalogHref(
            locale,
            setFilterValue(searchParams, 'page', String(page)),
            categorySlug,
          ),
        )
      }
      page={currentPage}
      totalPages={totalPages}
    />
  );
}
