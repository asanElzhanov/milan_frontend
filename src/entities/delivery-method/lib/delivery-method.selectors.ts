import type { DeliveryMethod } from '../model/delivery-method.types';

export function getActiveDeliveryMethods(methods: DeliveryMethod[]): DeliveryMethod[] {
  return methods.filter((method) => method.isActive !== false);
}

export function getDefaultDeliveryMethod(methods: DeliveryMethod[]): DeliveryMethod | null {
  const activeMethods = getActiveDeliveryMethods(methods);

  return activeMethods.toSorted((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)).at(0) ?? null;
}

export function isManagerCalculationDelivery(method: DeliveryMethod): boolean {
  return method.requiresManagerCalculation === true || method.priceType === 'manager_calculation';
}

export function getDeliveryMethodPrice(method: DeliveryMethod): number | string | null {
  if (method.isFree || method.priceType === 'free') {
    return method.price ?? 0;
  }

  if (isManagerCalculationDelivery(method)) {
    return null;
  }

  return method.price ?? null;
}
