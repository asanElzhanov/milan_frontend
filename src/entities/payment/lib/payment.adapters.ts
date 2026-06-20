import { isPaymentFailed, isPaymentPaid, isPaymentPending } from './payment.selectors';
import type { PaymentSession, PaymentStatusResult } from '../model/payment.types';

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

const unwrapPaymentObject = (raw: unknown): unknown => {
  if (!isRecord(raw)) {
    return raw;
  }

  if (isRecord(raw.payment)) {
    return raw.payment;
  }

  if (isRecord(raw.session)) {
    return raw.session;
  }

  if (isRecord(raw.data)) {
    if (isRecord(raw.data.payment)) {
      return raw.data.payment;
    }

    if (isRecord(raw.data.session)) {
      return raw.data.session;
    }

    return raw.data;
  }

  return raw;
};

export function adaptPaymentSession(raw: unknown): PaymentSession | null {
  const record = unwrapPaymentObject(raw);

  if (!isRecord(record)) {
    return null;
  }

  const paymentUrl = readString(
    record.payment_url,
    record.paymentUrl,
    record.url,
    record.checkout_url,
    record.confirmation_url,
    record.kaspi_url,
    record.stripe_url,
  );

  const session: PaymentSession = {
    id: readStringOrNumber(record.id, record.pk, record.payment_id, record.session_id),
    orderId: readStringOrNumber(record.order_id, record.orderId),
    orderNumber: readString(record.order_number, record.orderNumber, record.number),
    provider: readString(record.provider, record.payment_provider, record.paymentProvider),
    status: readString(record.status, record.payment_status, record.paymentStatus),
    paymentUrl,
    redirectUrl: readString(record.redirect_url, record.redirectUrl),
    qrUrl: readString(record.qr_url, record.qrUrl),
    amount: readStringOrNumber(record.amount, record.amount_total, record.total),
    currency: readString(record.currency),
    expiresAt: readString(record.expires_at, record.expiresAt),
    createdAt: readString(record.created_at, record.createdAt),
  };

  if (!session.id && !session.orderId && !session.orderNumber && !getSessionUrl(session)) {
    return null;
  }

  return session;
}

export function adaptPaymentStatusResult(raw: unknown): PaymentStatusResult | null {
  const record = unwrapPaymentObject(raw);

  if (!isRecord(record)) {
    return null;
  }

  const status = readString(record.status, record.payment_status, record.paymentStatus);

  if (!status) {
    return null;
  }

  const paymentStatus = readString(record.payment_status, record.paymentStatus);

  return {
    orderId: readStringOrNumber(record.order_id, record.orderId),
    orderNumber: readString(record.order_number, record.orderNumber, record.number),
    provider: readString(record.provider, record.payment_provider, record.paymentProvider),
    status,
    paymentStatus,
    isPaid: isPaymentPaid(status) || isPaymentPaid(paymentStatus),
    isFailed: isPaymentFailed(status) || isPaymentFailed(paymentStatus),
    isPending: isPaymentPending(status) || isPaymentPending(paymentStatus),
    message: readString(record.message, record.detail),
    paymentUrl: readString(
      record.payment_url,
      record.paymentUrl,
      record.url,
      record.checkout_url,
      record.confirmation_url,
      record.kaspi_url,
      record.stripe_url,
    ),
    redirectUrl: readString(record.redirect_url, record.redirectUrl),
  };
}

const getSessionUrl = (session: PaymentSession): string | null =>
  session.paymentUrl ?? session.redirectUrl ?? session.qrUrl ?? null;
