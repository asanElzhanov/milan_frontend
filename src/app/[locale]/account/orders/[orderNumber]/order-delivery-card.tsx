import { formatOrderAddress, type Order } from '@/entities/order';

import type { OrdersDictionary } from '../orders.dictionary';

type OrderDeliveryCardProps = {
  labels: OrdersDictionary;
  order: Order;
};

export function OrderDeliveryCard({ labels, order }: OrderDeliveryCardProps) {
  const address = formatOrderAddress(order);

  return (
    <section className="border border-sara-beige-dark bg-white p-5 shadow-soft">
      <h2 className="font-fashion text-2xl text-sara-black">{labels.delivery}</h2>
      <dl className="mt-5 space-y-4 text-sm">
        <div>
          <dt className="text-caption">{labels.method}</dt>
          <dd className="mt-1 font-medium text-sara-black">
            {order.delivery?.methodName ?? labels.noData}
          </dd>
        </div>
        <div>
          <dt className="text-caption">{labels.deliveryAddress}</dt>
          <dd className="mt-1 leading-6 text-sara-graphite">{address || labels.noData}</dd>
        </div>
        <div>
          <dt className="text-caption">{labels.customer}</dt>
          <dd className="mt-1 leading-6 text-sara-graphite">
            {[order.customerFullName, order.customerPhone].filter(Boolean).join(', ') ||
              labels.noData}
          </dd>
        </div>
        {order.comment ? (
          <div>
            <dt className="text-caption">{labels.comment}</dt>
            <dd className="mt-1 leading-6 text-sara-graphite">{order.comment}</dd>
          </div>
        ) : null}
      </dl>
    </section>
  );
}
