import type { CheckoutOrder, CheckoutResult } from '../model/order.types';

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

const unwrapOrder = (raw: unknown): unknown => {
  if (!isRecord(raw)) {
    return raw;
  }

  if (raw.order !== undefined) {
    return raw.order;
  }

  if (isRecord(raw.data) && raw.data.order !== undefined) {
    return raw.data.order;
  }

  if (isRecord(raw.data) && (raw.data.id !== undefined || raw.data.order_number !== undefined)) {
    return raw.data;
  }

  return raw;
};

export function adaptCheckoutOrder(raw: unknown): CheckoutOrder | null {
  const record = unwrapOrder(raw);

  if (!isRecord(record)) {
    return null;
  }

  const id = readStringOrNumber(record.id, record.pk);

  if (id === null) {
    return null;
  }

  return {
    id,
    orderNumber: readString(record.order_number, record.orderNumber, record.number),
    status: readString(record.status),
    paymentStatus: readString(record.payment_status, record.paymentStatus),
    total: readStringOrNumber(record.total, record.total_amount, record.amount),
    currency: readString(record.currency),
    paymentUrl: readString(record.payment_url, record.paymentUrl),
    paymentProvider: readString(record.payment_provider, record.paymentProvider),
    createdAt: readString(record.created_at, record.createdAt),
  };
}

export function adaptCheckoutResult(raw: unknown): CheckoutResult {
  const record = isRecord(raw) ? raw : {};
  const data = isRecord(record.data) ? record.data : {};
  const order = adaptCheckoutOrder(raw);

  return {
    order,
    redirectUrl: readString(record.redirect_url, record.redirectUrl, data.redirect_url),
    paymentUrl: readString(
      record.payment_url,
      record.paymentUrl,
      data.payment_url,
      order?.paymentUrl,
    ),
    message: readString(record.message, record.detail, data.message),
  };
}
