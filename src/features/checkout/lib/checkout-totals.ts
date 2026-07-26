import type { Cart } from '@/entities/cart';
import {
  isDeliveryFreeForAmount,
  isManagerCalculationDelivery,
  type DeliveryMethod,
} from '@/entities/delivery-method';

export type CheckoutTotals = {
  itemsTotal: number;
  deliveryPrice: number | null;
  total: number;
  isFinal: boolean;
};

const toAmount = (value: number | string | null | undefined): number | null => {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value.replace(/\s/g, '').replace(',', '.'));

    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
};

export function calculateCheckoutTotals(
  cart: Cart,
  deliveryMethod?: DeliveryMethod | null,
): CheckoutTotals {
  const itemsTotal = toAmount(cart.total ?? cart.totalAfterDiscount ?? cart.subtotal) ?? 0;

  if (!deliveryMethod || isManagerCalculationDelivery(deliveryMethod)) {
    return { itemsTotal, deliveryPrice: null, total: itemsTotal, isFinal: false };
  }

  const isFree =
    deliveryMethod.isFree === true || isDeliveryFreeForAmount(deliveryMethod, itemsTotal);
  const deliveryPrice = isFree ? 0 : toAmount(deliveryMethod.price ?? deliveryMethod.basePrice);

  if (deliveryPrice === null) {
    return { itemsTotal, deliveryPrice: null, total: itemsTotal, isFinal: false };
  }

  return {
    itemsTotal,
    deliveryPrice,
    total: itemsTotal + deliveryPrice,
    isFinal: true,
  };
}
