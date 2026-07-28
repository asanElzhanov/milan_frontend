import { describe, expect, it } from 'vitest';

import { adaptOrder } from './order.adapters';
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
