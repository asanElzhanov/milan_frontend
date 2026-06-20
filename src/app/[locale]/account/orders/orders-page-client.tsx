'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { useOrdersQuery } from '@/entities/order';
import { getApiErrorMessage } from '@/shared/api';
import { type AppLocale, localizedRoutes } from '@/shared/config';
import { Button, EmptyState, ErrorState, SectionTitle, Skeleton } from '@/shared/ui';

import type { OrdersDictionary } from './orders.dictionary';
import { OrdersList } from './orders-list';
import { OrdersPagination } from './orders-pagination';

type OrdersPageClientProps = {
  labels: OrdersDictionary;
  locale: AppLocale;
};

const parsePage = (value: string | null): number => {
  const page = Number(value);

  return Number.isInteger(page) && page > 0 ? page : 1;
};

function OrdersLoadingState({ labels }: { labels: OrdersDictionary }) {
  return (
    <div className="space-y-4">
      <p className="text-caption">{labels.loading}</p>
      <Skeleton className="h-40" />
      <Skeleton className="h-40" />
    </div>
  );
}

export function OrdersPageClient({ labels, locale }: OrdersPageClientProps) {
  const searchParams = useSearchParams();
  const page = parsePage(searchParams.get('page'));
  const ordersQuery = useOrdersQuery({ page }, { enabled: true });
  const orderList = ordersQuery.data;

  if (ordersQuery.isLoading) {
    return <OrdersLoadingState labels={labels} />;
  }

  if (ordersQuery.isError) {
    return (
      <ErrorState
        title={labels.loadError}
        description={getApiErrorMessage(ordersQuery.error)}
        action={<Button onClick={() => void ordersQuery.refetch()}>{labels.loading}</Button>}
      />
    );
  }

  if (!orderList || orderList.orders.length === 0) {
    return (
      <EmptyState
        title={labels.emptyTitle}
        description={labels.emptyDescription}
        action={
          <Button asChild>
            <Link href={localizedRoutes.catalog(locale)}>{labels.goToCatalog}</Link>
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <SectionTitle title={labels.title} description={labels.subtitle} />
      <OrdersList labels={labels} locale={locale} orders={orderList.orders} />
      <OrdersPagination
        currentPage={orderList.currentPage}
        locale={locale}
        totalPages={orderList.totalPages}
      />
    </div>
  );
}
