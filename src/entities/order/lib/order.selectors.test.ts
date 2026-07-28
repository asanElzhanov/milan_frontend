import { describe, expect, it } from 'vitest';

import type { Order } from '../model/order.types';
import { shouldDisplayOrderStatus } from './order.selectors';

const order = (status: string | null): Order => ({
  id: 1,
  orderNumber: 'SM-1',
  status,
  paymentStatus: 'paid',
  items: [],
  itemsCount: 0,
});

describe('order status presentation', () => {
  it('hides a payment-only status duplicated in the order status field', () => {
    expect(shouldDisplayOrderStatus(order('paid'))).toBe(false);
    expect(shouldDisplayOrderStatus(order('success'))).toBe(false);
  });

  it('keeps real order workflow statuses', () => {
    expect(shouldDisplayOrderStatus(order('processing'))).toBe(true);
    expect(shouldDisplayOrderStatus(order('completed'))).toBe(true);
  });
});
