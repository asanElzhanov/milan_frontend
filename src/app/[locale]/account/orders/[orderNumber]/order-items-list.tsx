import Link from 'next/link';

import type { Order } from '@/entities/order';
import { type AppLocale, localizedRoutes } from '@/shared/config';
import { formatPriceKzt, localizeBackendValue } from '@/shared/lib';

import type { OrdersDictionary } from '../orders.dictionary';

type OrderItemsListProps = {
  labels: OrdersDictionary;
  locale: AppLocale;
  order: Order;
};

const formatPrice = (value: number | string | null | undefined): string =>
  value === null || value === undefined ? '—' : formatPriceKzt(value);

export function OrderItemsList({ labels, locale, order }: OrderItemsListProps) {
  return (
    <section className="border border-sara-beige-dark bg-white p-5 shadow-soft">
      <h2 className="font-fashion text-2xl text-sara-black">{labels.items}</h2>
      <div className="mt-5 divide-y divide-sara-beige-dark">
        {order.items.map((item) => {
          const productName = localizeBackendValue(item.productName, locale, item.productSlug);
          const content = (
            <span className="font-medium text-sara-black transition-colors hover:text-sara-bronze">
              {productName}
            </span>
          );

          return (
            <article className="flex gap-4 py-4 first:pt-0 last:pb-0" key={item.id}>
              <div
                aria-label={productName}
                className="h-24 w-20 shrink-0 bg-sara-beige bg-cover bg-center"
                role={item.imageUrl ? 'img' : undefined}
                style={item.imageUrl ? { backgroundImage: `url("${item.imageUrl}")` } : undefined}
              />
              <div className="min-w-0 flex-1">
                {item.productSlug ? (
                  <Link href={localizedRoutes.product(locale, item.productSlug)}>{content}</Link>
                ) : (
                  content
                )}
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-sara-graphite/65">
                  {item.sku ? <span>SKU: {item.sku}</span> : null}
                  {item.color ? <span>{localizeBackendValue(item.color, locale)}</span> : null}
                  {item.size ? <span>{localizeBackendValue(item.size, locale)}</span> : null}
                </div>
                <div className="mt-3 grid gap-2 text-sm text-sara-graphite sm:grid-cols-3">
                  <span>
                    {item.quantity} × {formatPrice(item.unitPrice)}
                  </span>
                  <span className="font-medium sm:text-right sm:col-span-2">
                    {formatPrice(item.totalPrice)}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
