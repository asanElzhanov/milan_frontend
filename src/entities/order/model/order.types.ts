export type OrderStatus =
  | 'pending'
  | 'created'
  | 'processing'
  | 'paid'
  | 'payment_pending'
  | 'cancelled'
  | 'failed'
  | string;

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'cancelled' | 'not_required' | string;

export type CheckoutOrder = {
  id: string | number;
  orderNumber?: string | null;
  status?: OrderStatus | null;
  paymentStatus?: PaymentStatus | null;
  total?: number | string | null;
  currency?: string | null;
  paymentUrl?: string | null;
  paymentProvider?: string | null;
  createdAt?: string | null;
};

export type CheckoutResult = {
  order: CheckoutOrder | null;
  redirectUrl?: string | null;
  paymentUrl?: string | null;
  message?: string | null;
};
