import type { Order } from '@/entities/order';
import type { AppLocale } from '@/shared/config';

import { OrderListCard } from './order-list-card';
import type { OrdersDictionary } from './orders.dictionary';

type OrdersListProps = {
  labels: OrdersDictionary;
  locale: AppLocale;
  orders: Order[];
};

export function OrdersList({ labels, locale, orders }: OrdersListProps) {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderListCard
          key={`${order.id}-${order.orderNumber}`}
          labels={labels}
          locale={locale}
          order={order}
        />
      ))}
    </div>
  );
}
