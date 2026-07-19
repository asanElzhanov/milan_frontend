import { describe, expect, it } from 'vitest';

import { adaptCart, createEmptyCart } from './cart.adapters';
import { formatCartItemsCount, getCartItemsCount } from './cart.selectors';

describe('cart count', () => {
  it('returns zero for an empty cart', () => {
    expect(getCartItemsCount(createEmptyCart())).toBe(0);
  });

  it('sums backend item quantities when no total is provided', () => {
    const cart = adaptCart({ items: [
      { id: 1, variant_id: 10, product: { name: 'A' }, quantity: 2 },
      { id: 2, variant_id: 20, product: { name: 'B' }, quantity: 3 },
    ] });
    expect(getCartItemsCount(cart)).toBe(5);
  });

  it('uses backend total quantity rather than line count', () => {
    const cart = adaptCart({ items_count: 1, total_quantity: 2, items: [] });
    expect(getCartItemsCount(cart)).toBe(2);
  });

  it('formats counts above 99', () => {
    expect(formatCartItemsCount(99)).toBe('99');
    expect(formatCartItemsCount(100)).toBe('99+');
  });
});
