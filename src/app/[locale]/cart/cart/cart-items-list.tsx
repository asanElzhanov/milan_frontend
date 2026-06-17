'use client';

import type { CartItem } from '@/entities/cart';
import type { AppLocale } from '@/shared/config';

import { CartItemCard } from './cart-item-card';
import type { CartDictionary } from './cart.dictionary';

type CartItemsListProps = {
  items: CartItem[];
  locale: AppLocale;
  labels: CartDictionary;
  isUpdating?: boolean;
  pendingItemId?: string | number | null;
  onQuantityChange: (itemId: string | number, quantity: number) => void;
  onRemove: (itemId: string | number) => void;
};

export function CartItemsList({
  isUpdating = false,
  items,
  labels,
  locale,
  onQuantityChange,
  onRemove,
  pendingItemId,
}: CartItemsListProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <CartItemCard
          isUpdating={isUpdating && pendingItemId === item.id}
          item={item}
          key={item.id}
          labels={labels}
          locale={locale}
          onQuantityChange={onQuantityChange}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
