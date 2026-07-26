import { describe, expect, it } from 'vitest';

import type { DeliveryMethod } from '../model/delivery-method.types';
import { isDeliveryFreeForAmount } from './delivery-method.selectors';

const courier: DeliveryMethod = {
  id: 1,
  name: 'Courier',
  price: 3000,
  freeFromAmount: 25000,
};

describe('delivery method price selectors', () => {
  it('marks delivery as free when the order reaches the threshold', () => {
    expect(isDeliveryFreeForAmount(courier, 25000)).toBe(true);
    expect(isDeliveryFreeForAmount(courier, '30 000.00')).toBe(true);
  });

  it('keeps delivery paid below the threshold', () => {
    expect(isDeliveryFreeForAmount(courier, 24999)).toBe(false);
  });
});
