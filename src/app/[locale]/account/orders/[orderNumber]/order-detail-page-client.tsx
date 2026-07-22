'use client';

import Link from 'next/link';

import {
  OrderStatusBadge,
  OrderTimeline,
  PaymentStatusBadge,
  useOrderQuery,
} from '@/entities/order';
import { getApiErrorMessage } from '@/shared/api';
import { type AppLocale, localizedRoutes } from '@/shared/config';
import { Button, EmptyState, ErrorState, SectionTitle, Skeleton } from '@/shared/ui';

import {
  getOrderStatusLabels,
  getPaymentStatusLabels,
  type OrdersDictionary,
} from '../orders.dictionary';
import { OrderPaymentLink } from '../order-payment-link';
import { OrderDeliveryCard } from './order-delivery-card';
import { OrderItemsList } from './order-items-list';
import { OrderPaymentCard } from './order-payment-card';
import { OrderSummaryCard } from './order-summary-card';

type OrderDetailPageClientProps = {
  labels: OrdersDictionary;
  locale: AppLocale;
  orderNumber: string;
};

function OrderDetailLoadingState({ labels }: { labels: OrdersDictionary }) {
  return (
    <div className="space-y-4">
      <p className="text-caption">{labels.loading}</p>
      <Skeleton className="h-32" />
      <Skeleton className="h-64" />
      <Skeleton className="h-48" />
    </div>
  );
}

export function OrderDetailPageClient({ labels, locale, orderNumber }: OrderDetailPageClientProps) {
  const orderQuery = useOrderQuery(orderNumber, { enabled: true });
  const order = orderQuery.data;

  if (orderQuery.isLoading) {
    return <OrderDetailLoadingState labels={labels} />;
  }

  if (orderQuery.isError) {
    return (
      <ErrorState
        title={labels.loadError}
        description={getApiErrorMessage(orderQuery.error)}
        action={<Button onClick={() => void orderQuery.refetch()}>{labels.loading}</Button>}
      />
    );
  }

  if (!order) {
    return (
      <EmptyState
        title={labels.orderNotFound}
        action={
          <Button asChild>
            <Link href={localizedRoutes.accountOrders(locale)}>{labels.backToOrders}</Link>
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <SectionTitle
          title={`${labels.order} #${order.orderNumber}`}
          description={labels.subtitle}
        />
        <Button asChild variant="ghost">
          <Link href={localizedRoutes.accountOrders(locale)}>{labels.backToOrders}</Link>
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <OrderStatusBadge labels={getOrderStatusLabels(labels)} status={order.status} />
        <PaymentStatusBadge labels={getPaymentStatusLabels(labels)} status={order.paymentStatus} />
      </div>

      <OrderTimeline
        status={order.status}
        labels={{
          created: labels.created,
          processing: labels.processing,
          shipped: labels.shipped,
          delivered: labels.delivered,
          cancelled: labels.cancelled,
        }}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-6">
          <OrderItemsList labels={labels} locale={locale} order={order} />
          <OrderDeliveryCard labels={labels} locale={locale} order={order} />
        </div>
        <div className="space-y-6">
          <OrderSummaryCard labels={labels} order={order} />
          <OrderPaymentCard labels={labels} locale={locale} order={order} />
          <OrderPaymentLink locale={locale} order={order} variant="primary">
            {labels.continuePayment}
          </OrderPaymentLink>
        </div>
      </div>
    </div>
  );
}
