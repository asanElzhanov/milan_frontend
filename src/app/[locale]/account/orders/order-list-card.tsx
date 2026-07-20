import Link from 'next/link';

import {
  getOrderItemsCount,
  getOrderTotal,
  OrderStatusBadge,
  PaymentStatusBadge,
  type Order,
} from '@/entities/order';
import { type AppLocale, localizedRoutes } from '@/shared/config';
import { formatPriceKzt } from '@/shared/lib';
import { Button } from '@/shared/ui';

import {
  getOrderStatusLabels,
  getPaymentStatusLabels,
  type OrdersDictionary,
} from './orders.dictionary';
import { OrderPaymentLink } from './order-payment-link';

export type OrderListCardProps = {
  order: Order;
  locale: AppLocale;
  labels: OrdersDictionary;
};

const formatDate = (value: string | null | undefined, locale: AppLocale): string =>
  value
    ? new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : locale === 'kk' ? 'kk-KZ' : 'ru-RU', {
        dateStyle: 'medium',
      }).format(new Date(value))
    : '—';

const formatPrice = (value: number | string | null | undefined): string =>
  value === null || value === undefined ? '—' : formatPriceKzt(value);

export function OrderListCard({ labels, locale, order }: OrderListCardProps) {
  return (
    <article className="border border-sara-beige-dark bg-white p-5 shadow-soft">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3">
          <div>
            <p className="text-overline text-sara-bronze">{labels.order}</p>
            <h2 className="mt-1 font-fashion text-2xl text-sara-black">#{order.orderNumber}</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <OrderStatusBadge labels={getOrderStatusLabels(labels)} status={order.status} />
            <PaymentStatusBadge
              labels={getPaymentStatusLabels(labels)}
              status={order.paymentStatus}
            />
          </div>
        </div>

        <div className="grid gap-3 text-sm text-sara-graphite sm:grid-cols-3 md:text-right">
          <div>
            <p className="text-caption">{labels.orderDate}</p>
            <p className="mt-1 font-medium">{formatDate(order.createdAt, locale)}</p>
          </div>
          <div>
            <p className="text-caption">{labels.items}</p>
            <p className="mt-1 font-medium">{getOrderItemsCount(order)}</p>
          </div>
          <div>
            <p className="text-caption">{labels.total}</p>
            <p className="mt-1 font-medium">{formatPrice(getOrderTotal(order))}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link href={localizedRoutes.accountOrderDetail(locale, order.orderNumber)}>
            {labels.details}
          </Link>
        </Button>
        <OrderPaymentLink locale={locale} order={order}>
          {labels.continuePayment}
        </OrderPaymentLink>
      </div>
    </article>
  );
}
