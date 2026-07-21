import type { DeliveryMethod } from '../model/delivery-method.types';

type DeliveryMethodLocale = 'ru' | 'kk' | 'en';

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

const readLocalizedString = (
  raw: Record<string, unknown>,
  locale: DeliveryMethodLocale,
  baseKey: string,
): string | null => {
  const localizedKeys = [locale, 'ru', 'kk', 'en'];

  for (const candidate of localizedKeys) {
    const value = raw[`${baseKey}_${candidate}`];

    if (typeof value === 'string' && value.trim()) {
      return value;
    }
  }

  return null;
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

export function adaptDeliveryMethod(raw: unknown, locale: DeliveryMethodLocale = 'ru'): DeliveryMethod | null {
  if (!isRecord(raw)) {
    return null;
  }

  const id = readStringOrNumber(raw.id, raw.pk);
  const name = readLocalizedString(raw, locale, 'name') ?? readString(raw.name, raw.title, raw.label);

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
    slug: readString(raw.slug),
    name,
    deliveryType: readString(raw.delivery_type, raw.deliveryType),
    description: readString(raw.description, raw.short_description),
    price: readStringOrNumber(raw.price, raw.cost, raw.delivery_price, raw.base_price),
    basePrice: readStringOrNumber(raw.base_price, raw.basePrice),
    priceType,
    freeFromAmount: readStringOrNumber(raw.free_from_amount, raw.freeFromAmount),
    isFree: readBoolean(raw.is_free, raw.free, raw.isFree),
    isActive: readBoolean(raw.is_active, raw.active, raw.isActive),
    requiresManagerCalculation,
    sortOrder: readNumber(raw.sort_order, raw.position, raw.sortOrder),
  };
}

export function adaptDeliveryMethods(
  raw: unknown,
  locale: DeliveryMethodLocale = 'ru',
): DeliveryMethod[] {
  return unwrapList(raw)
    .map((method) => adaptDeliveryMethod(method, locale))
    .filter((method): method is DeliveryMethod => Boolean(method));
}
