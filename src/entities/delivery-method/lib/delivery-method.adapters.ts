import type { DeliveryMethod } from '../model/delivery-method.types';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const readString = (...values: unknown[]): string | null => {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) {
      return value;
    }

    if (typeof value === 'number' && Number.isFinite(value)) {
      return String(value);
    }
  }

  return null;
};

const readStringOrNumber = (...values: unknown[]): string | number | null => {
  for (const value of values) {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === 'string' && value.trim()) {
      return value;
    }
  }

  return null;
};

const readBoolean = (...values: unknown[]): boolean | undefined => {
  for (const value of values) {
    if (typeof value === 'boolean') {
      return value;
    }
  }

  return undefined;
};

const readNumber = (...values: unknown[]): number | null => {
  for (const value of values) {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === 'string' && value.trim()) {
      const parsed = Number(value);

      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
  }

  return null;
};

const unwrapList = (raw: unknown): unknown[] => {
  if (Array.isArray(raw)) {
    return raw;
  }

  if (!isRecord(raw)) {
    return [];
  }

  if (Array.isArray(raw.results)) {
    return raw.results;
  }

  if (Array.isArray(raw.methods)) {
    return raw.methods;
  }

  if (Array.isArray(raw.delivery_methods)) {
    return raw.delivery_methods;
  }

  if (Array.isArray(raw.data)) {
    return raw.data;
  }

  if (isRecord(raw.data)) {
    if (Array.isArray(raw.data.results)) {
      return raw.data.results;
    }

    if (Array.isArray(raw.data.methods)) {
      return raw.data.methods;
    }

    if (Array.isArray(raw.data.delivery_methods)) {
      return raw.data.delivery_methods;
    }
  }

  return [];
};

export function adaptDeliveryMethod(raw: unknown): DeliveryMethod | null {
  if (!isRecord(raw)) {
    return null;
  }

  const id = readStringOrNumber(raw.id, raw.pk);
  const name = readString(raw.name, raw.title, raw.label);

  if (id === null || !name) {
    return null;
  }

  const priceType = readString(raw.price_type, raw.calculation_type, raw.priceType);
  const managerCalculation = readBoolean(
    raw.requires_manager_calculation,
    raw.manager_calculation,
    raw.requiresManagerCalculation,
  );
  const requiresManagerCalculation =
    managerCalculation ?? (priceType === 'manager_calculation' ? true : undefined);

  return {
    id,
    code: readString(raw.code, raw.slug),
    name,
    description: readString(raw.description, raw.short_description),
    price: readStringOrNumber(raw.price, raw.cost, raw.delivery_price),
    priceType,
    isFree: readBoolean(raw.is_free, raw.free, raw.isFree),
    isActive: readBoolean(raw.is_active, raw.active, raw.isActive),
    requiresManagerCalculation,
    sortOrder: readNumber(raw.sort_order, raw.position, raw.sortOrder),
  };
}

export function adaptDeliveryMethods(raw: unknown): DeliveryMethod[] {
  return unwrapList(raw)
    .map(adaptDeliveryMethod)
    .filter((method): method is DeliveryMethod => Boolean(method));
}
