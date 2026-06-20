import type { Order } from '@/entities/order';
import { formatPriceKzt } from '@/shared/lib';

import type { OrdersDictionary } from '../orders.dictionary';

type OrderSummaryCardProps = {
  labels: OrdersDictionary;
  order: Order;
};

const formatPrice = (value: number | string | null | undefined): string =>
  value === null || value === undefined ? '—' : formatPriceKzt(value);

export function OrderSummaryCard({ labels, order }: OrderSummaryCardProps) {
  return (
    <section className="border border-sara-beige-dark bg-white p-5 shadow-soft">
      <h2 className="font-fashion text-2xl text-sara-black">{labels.total}</h2>
      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-sara-graphite/65">{labels.subtotal}</dt>
          <dd className="font-medium text-sara-black">{formatPrice(order.subtotal)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-sara-graphite/65">{labels.discount}</dt>
          <dd className="font-medium text-sara-black">{formatPrice(order.discountAmount)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-sara-graphite/65">{labels.deliveryPrice}</dt>
          <dd className="font-medium text-sara-black">{formatPrice(order.deliveryPrice)}</dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-sara-beige-dark pt-3 text-base">
          <dt className="font-medium text-sara-black">{labels.total}</dt>
          <dd className="font-medium text-sara-black">{formatPrice(order.total)}</dd>
        </div>
      </dl>
    </section>
  );
}
