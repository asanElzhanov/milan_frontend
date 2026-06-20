import { PaymentStatusBadge, type Order } from '@/entities/order';
import type { AppLocale } from '@/shared/config';

import { getPaymentStatusLabels, type OrdersDictionary } from '../orders.dictionary';
import { OrderPaymentLink } from '../order-payment-link';

type OrderPaymentCardProps = {
  labels: OrdersDictionary;
  locale: AppLocale;
  order: Order;
};

export function OrderPaymentCard({ labels, locale, order }: OrderPaymentCardProps) {
  return (
    <section className="border border-sara-beige-dark bg-white p-5 shadow-soft">
      <h2 className="font-fashion text-2xl text-sara-black">{labels.payment}</h2>
      <dl className="mt-5 space-y-4 text-sm">
        <div>
          <dt className="text-caption">{labels.provider}</dt>
          <dd className="mt-1 font-medium text-sara-black">
            {order.paymentProvider ?? labels.noData}
          </dd>
        </div>
        <div>
          <dt className="text-caption">{labels.paymentStatus}</dt>
          <dd className="mt-2">
            <PaymentStatusBadge
              labels={getPaymentStatusLabels(labels)}
              status={order.paymentStatus}
            />
          </dd>
        </div>
      </dl>
      <div className="mt-5">
        <OrderPaymentLink locale={locale} order={order}>
          {labels.continuePayment}
        </OrderPaymentLink>
      </div>
    </section>
  );
}
