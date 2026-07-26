import { describe, expect, it } from 'vitest';

import type { Cart } from '@/entities/cart';
import type { DeliveryMethod } from '@/entities/delivery-method';

import { calculateCheckoutTotals } from './checkout-totals';

const cart = {
  items: [],
  itemsCount: 1,
  total: '25000.00',
  isEmpty: false,
} satisfies Cart;

const delivery = (overrides: Partial<DeliveryMethod> = {}): DeliveryMethod => ({
  id: 1,
  name: 'Courier',
  price: '3000.00',
  ...overrides,
});

describe('calculateCheckoutTotals', () => {
  it('adds the selected fixed delivery price to the cart total', () => {
    expect(calculateCheckoutTotals(cart, delivery())).toEqual({
      itemsTotal: 25000,
      deliveryPrice: 3000,
      total: 28000,
      isFinal: true,
    });
  });

  it('applies a free-delivery threshold', () => {
    expect(calculateCheckoutTotals(cart, delivery({ freeFromAmount: 20000 }))).toMatchObject({
      deliveryPrice: 0,
      total: 25000,
      isFinal: true,
    });
  });

  it('does not present a manager-calculated delivery as a final total', () => {
    expect(
      calculateCheckoutTotals(
        cart,
        delivery({ priceType: 'manager_calculation', requiresManagerCalculation: true }),
      ),
    ).toEqual({
      itemsTotal: 25000,
      deliveryPrice: null,
      total: 25000,
      isFinal: false,
    });
  });
});
