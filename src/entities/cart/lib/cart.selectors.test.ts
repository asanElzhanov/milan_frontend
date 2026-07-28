import { describe, expect, it } from 'vitest';

import { adaptCart, createEmptyCart } from './cart.adapters';
import { formatCartItemsCount, getCartItemsCount } from './cart.selectors';

describe('cart count', () => {
  it('returns zero for an empty cart', () => {
    expect(getCartItemsCount(createEmptyCart())).toBe(0);
  });

  it('sums backend item quantities when no total is provided', () => {
    const cart = adaptCart({
      items: [
        { id: 1, variant_id: 10, product: { name: 'A' }, quantity: 2 },
        { id: 2, variant_id: 20, product: { name: 'B' }, quantity: 3 },
      ],
    });
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

  it('keeps different variants of the same product as separate cart lines', () => {
    const cart = adaptCart({
      items: [
        {
          id: 101,
          variant_id: 10,
          product_id: 1,
          product_name: 'Кроссовки',
          product_name_ru: 'Кроссовки',
          product_slug: 'sneakers',
          sku: 'BLACK-42',
          color: 'Чёрный',
          size: '42',
          quantity: 1,
          unit_price: '12000.00',
        },
        {
          id: 102,
          variant_id: 11,
          product_id: 1,
          product_name: 'Кроссовки',
          product_name_ru: 'Кроссовки',
          product_slug: 'sneakers',
          sku: 'WHITE-43',
          color: 'Белый',
          size: '43',
          quantity: 2,
          unit_price: '12000.00',
        },
      ],
    });

    expect(cart.items).toHaveLength(2);
    expect(cart.items.map((item) => item.variant.id)).toEqual([10, 11]);
    expect(cart.items.map((item) => [item.variant.color, item.variant.size])).toEqual([
      ['Чёрный', '42'],
      ['Белый', '43'],
    ]);
    expect(cart.items.every((item) => item.product.id === 1)).toBe(true);
  });
});
