import type { Order, OrderStatus, PaymentStatus } from '../model/order.types';

const normalize = (value?: string | null): string =>
  String(value ?? '')
    .trim()
    .toLowerCase();

const paymentPendingStatuses = ['pending', 'payment_pending', 'created', 'requires_action'];
const paidStatuses = ['paid', 'success', 'completed'];
const cancelledStatuses = ['cancelled', 'canceled'];

export function isOrderPaymentPending(order?: Order | null): boolean {
  return paymentPendingStatuses.includes(normalize(order?.paymentStatus));
}

export function isOrderPaid(order?: Order | null): boolean {
  return paidStatuses.includes(normalize(order?.paymentStatus));
}

export function isOrderCancelled(order?: Order | null): boolean {
  return cancelledStatuses.includes(normalize(order?.status));
}

export function canContinuePayment(order?: Order | null): boolean {
  return Boolean(order?.orderNumber && isOrderPaymentPending(order) && !isOrderCancelled(order));
}

export function getOrderItemsCount(order?: Order | null): number {
  return order?.itemsCount ?? 0;
}

export function getOrderTotal(order?: Order | null): number | string | null {
  return order?.total ?? null;
}

export function formatOrderAddress(order?: Order | null): string {
  const address = order?.deliveryAddress;

  if (!address) {
    return '';
  }

  return [
    address.addressLine1,
    address.country,
    address.region,
    address.city,
    address.district,
    address.street,
    address.house,
    address.apartment,
    address.postalCode,
  ]
    .filter(Boolean)
    .join(', ');
}

export function isKnownOrderStatus(status?: OrderStatus | null): boolean {
  return [
    'draft',
    'pending',
    'created',
    'processing',
    'confirmed',
    'packed',
    'shipped',
    'delivered',
    'completed',
    'cancelled',
    'failed',
  ].includes(normalize(status));
}

export function isKnownPaymentStatus(status?: PaymentStatus | null): boolean {
  return [
    'pending',
    'payment_pending',
    'paid',
    'failed',
    'cancelled',
    'refunded',
    'not_required',
  ].includes(normalize(status));
}
