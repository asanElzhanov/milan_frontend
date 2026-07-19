'use client';

import Link from 'next/link';

import type { CartItem } from '@/entities/cart';
import { ProductImage } from '@/entities/product';
import type { AppLocale } from '@/shared/config';
import { withLocale } from '@/shared/config';
import { getLocalizedField } from '@/shared/lib';
import { Button, Price, QuantitySelector } from '@/shared/ui';

import type { CartDictionary } from './cart.dictionary';

export type CartItemCardProps = {
  item: CartItem;
  locale: AppLocale;
  labels: CartDictionary;
  isUpdating?: boolean;
  onQuantityChange: (itemId: string | number, quantity: number) => void;
  onRemove: (itemId: string | number) => void;
};

export function CartItemCard({
  isUpdating = false,
  item,
  labels,
  locale,
  onQuantityChange,
  onRemove,
}: CartItemCardProps) {
  const productHref = item.product.slug
    ? withLocale(locale, `/product/${item.product.slug}`)
    : null;
  const availableStock = item.availableStock ?? item.variant.availableStock;
  const isUnavailable = item.inStock === false || item.variant.inStock === false;
  const unitPrice = item.unitPrice ?? item.variant.price;
  const totalPrice = item.totalPrice ?? unitPrice;
  const productName = getLocalizedField(item.product, 'name', locale);

  return (
    <article className="sara-card grid gap-5 p-4 sm:grid-cols-[124px_minmax(0,1fr)] md:p-5">
      <ProductImage
        alt={productName}
        aspectRatio="portrait"
        className="rounded-sara-md"
        href={productHref ?? undefined}
        src={item.product.imageUrl}
      />

      <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_auto]">
        <div className="min-w-0">
          {productHref ? (
            <Link className="luxury-link font-fashion text-2xl text-sara-black" href={productHref}>
              {productName}
            </Link>
          ) : (
            <h2 className="font-fashion text-2xl text-sara-black">{productName}</h2>
          )}

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-sara-graphite/65">
            {item.variant.color ? <span>{item.variant.color}</span> : null}
            {item.variant.size ? <span>{item.variant.size}</span> : null}
            {(item.variant.sku ?? item.product.sku) ? (
              <span>SKU {item.variant.sku ?? item.product.sku}</span>
            ) : null}
          </div>

          <div className="mt-4 space-y-2 text-sm">
            {isUnavailable ? (
              <p className="font-medium text-red-700">{labels.unavailable}</p>
            ) : availableStock !== null && availableStock !== undefined ? (
              <p className="text-sara-graphite/65">
                {labels.stockLeft}: {availableStock}
              </p>
            ) : null}
            {unitPrice ? <Price value={unitPrice} /> : null}
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 md:items-end">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.16em] text-sara-graphite/55">
              {labels.quantity}
            </p>
            <QuantitySelector
              disabled={isUpdating || isUnavailable}
              max={availableStock ?? undefined}
              min={1}
              onChange={(quantity) => onQuantityChange(item.id, quantity)}
              value={item.quantity}
            />
          </div>
          {totalPrice ? <Price size="lg" value={totalPrice} /> : null}
          <Button
            disabled={isUpdating}
            loading={isUpdating}
            onClick={() => onRemove(item.id)}
            size="sm"
            variant="link"
          >
            {labels.remove}
          </Button>
        </div>
      </div>
    </article>
  );
}
