import type { Cart, CartItem } from '../model/cart.types';

export function getCartItemsCount(cart?: Cart | null): number {
  return cart?.itemsCount ?? 0;
}

export function isCartEmpty(cart?: Cart | null): boolean {
  return cart?.isEmpty ?? true;
}

export function getCartSubtotal(cart?: Cart | null): number | string | null {
  return cart?.subtotal ?? null;
}

export function getCartTotal(cart?: Cart | null): number | string | null {
  return cart?.total ?? cart?.totalAfterDiscount ?? null;
}

export function canUpdateCartItemQuantity(item: CartItem, nextQuantity: number): boolean {
  if (!Number.isFinite(nextQuantity) || nextQuantity < 1) {
    return false;
  }

  const availableStock = item.availableStock ?? item.variant.availableStock;

  if (availableStock === null || availableStock === undefined) {
    return true;
  }

  return nextQuantity <= availableStock;
}
