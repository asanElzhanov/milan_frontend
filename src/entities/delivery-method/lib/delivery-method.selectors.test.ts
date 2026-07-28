import { describe, expect, it } from 'vitest';

import type { DeliveryMethod } from '../model/delivery-method.types';
import { getFreeDeliveryThreshold, isDeliveryFreeForAmount } from './delivery-method.selectors';

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

describe('getFreeDeliveryThreshold', () => {
  it('uses the lowest active threshold configured by the backend', () => {
    const methods: DeliveryMethod[] = [
      { id: 1, name: 'Courier', freeFromAmount: '75000', isActive: true },
      { id: 2, name: 'Express', freeFromAmount: 100000, isActive: true },
      { id: 3, name: 'Old', freeFromAmount: 50000, isActive: false },
    ];

    expect(getFreeDeliveryThreshold(methods)).toBe(75000);
  });

  it('does not invent a threshold when the backend did not provide one', () => {
    expect(getFreeDeliveryThreshold([{ id: 1, name: 'Courier' }])).toBeNull();
  });
});
