import { describe, expect, it } from 'vitest';

import { adaptOrder, adaptOrderList } from './order.adapters';
import { formatOrderAddress } from './order.selectors';

const baseOrder = {
  id: 1,
  order_number: 'SM-1',
  items: [],
};

describe('order delivery address', () => {
  it('keeps a string delivery address from a paid order', () => {
    const order = adaptOrder({
      ...baseOrder,
      payment_status: 'paid',
      delivery_address: 'Алматы, ул. Абая, 10',
    });

    expect(formatOrderAddress(order)).toBe('Алматы, ул. Абая, 10');
  });

  it('reads common delivery address snapshot fields', () => {
    const order = adaptOrder({
      ...baseOrder,
      delivery_address: 42,
      delivery_address_snapshot: {
        city: 'Астана',
        street: 'Сыганак',
        house: '15',
      },
    });

    expect(formatOrderAddress(order)).toBe('Астана, Сыганак, 15');
  });

  it('reads a formatted address nested in delivery details', () => {
    const order = adaptOrder({
      ...baseOrder,
      delivery_details: { address: { formatted_address: 'Шымкент, Тауке хана, 8' } },
    });

    expect(formatOrderAddress(order)).toBe('Шымкент, Тауке хана, 8');
  });
});

describe('adaptOrderList pagination', () => {
  const orders = (count: number) =>
    Array.from({ length: count }, (_, index) => ({ ...baseOrder, id: index + 1 }));

  it('does not overcount pages when the last page is only partially filled', () => {
    const result = adaptOrderList({
      count: 25,
      next: null,
      previous: 'http://api/orders/?page=1',
      results: orders(5),
    });

    expect(result.totalPages).toBe(1);
  });

  it('derives totalPages from a full page that has more pages after it', () => {
    const result = adaptOrderList({
      count: 25,
      next: 'http://api/orders/?page=2',
      previous: null,
      results: orders(20),
    });

    expect(result.totalPages).toBe(2);
  });
});
