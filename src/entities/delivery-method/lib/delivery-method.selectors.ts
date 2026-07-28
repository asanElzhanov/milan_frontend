import type { DeliveryMethod } from '../model/delivery-method.types';

const toAmount = (value: number | string | null | undefined): number | null => {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value.replace(/\s/g, '').replace(',', '.'));

    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
};

export function getActiveDeliveryMethods(methods: DeliveryMethod[]): DeliveryMethod[] {
  return methods.filter((method) => method.isActive !== false);
}

export function getDefaultDeliveryMethod(methods: DeliveryMethod[]): DeliveryMethod | null {
  const activeMethods = getActiveDeliveryMethods(methods);

  return activeMethods.toSorted((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)).at(0) ?? null;
}

export function getFreeDeliveryThreshold(methods: DeliveryMethod[]): number | null {
  const thresholds = getActiveDeliveryMethods(methods)
    .map((method) => toAmount(method.freeFromAmount))
    .filter((amount): amount is number => amount !== null && amount > 0);

  return thresholds.length > 0 ? Math.min(...thresholds) : null;
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

export function isDeliveryFreeForAmount(
  method: DeliveryMethod,
  orderAmount: number | string | null | undefined,
): boolean {
  if (method.isFree || method.priceType === 'free') {
    return true;
  }

  const threshold = toAmount(method.freeFromAmount);
  const amount = toAmount(orderAmount);

  return threshold !== null && amount !== null && amount >= threshold;
}
