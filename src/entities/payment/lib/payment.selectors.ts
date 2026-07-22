import type { PaymentSession, PaymentStatus } from '../model/payment.types';

const normalizeStatus = (status?: PaymentStatus | null): string =>
  String(status ?? '')
    .trim()
    .toLowerCase();

export function isPaymentPaid(status?: PaymentStatus | null): boolean {
  return ['paid', 'success', 'completed'].includes(normalizeStatus(status));
}

export function isPaymentFailed(status?: PaymentStatus | null): boolean {
  return ['failed', 'error', 'cancelled', 'expired'].includes(normalizeStatus(status));
}

export function isPaymentPending(status?: PaymentStatus | null): boolean {
  return ['pending', 'created', 'processing', 'requires_action', 'waiting', 'unpaid'].includes(
    normalizeStatus(status),
  );
}

export function getPaymentRedirectUrl(session?: PaymentSession | null): string | null {
  return session?.paymentUrl ?? session?.redirectUrl ?? session?.qrUrl ?? null;
}
