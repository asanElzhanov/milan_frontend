export type PaymentProvider = 'freedom' | string;

export type PaymentStatus =
  | 'pending'
  | 'created'
  | 'processing'
  | 'requires_action'
  | 'paid'
  | 'success'
  | 'failed'
  | 'cancelled'
  | 'expired'
  | string;

export type PaymentStartPayload = {
  order_number: string;
  email?: string;
  locale?: string;
  provider?: PaymentProvider;
};

export type PaymentSession = {
  id?: string | number | null;
  orderId?: string | number | null;
  orderNumber?: string | null;
  provider?: PaymentProvider | null;
  status?: PaymentStatus | null;
  paymentUrl?: string | null;
  redirectUrl?: string | null;
  clientSecret?: string | null;
  qrUrl?: string | null;
  amount?: number | string | null;
  currency?: string | null;
  expiresAt?: string | null;
  createdAt?: string | null;
};

export type PaymentStatusResult = {
  orderId?: string | number | null;
  orderNumber?: string | null;
  provider?: PaymentProvider | null;
  status: PaymentStatus;
  paymentStatus?: PaymentStatus | null;
  isPaid: boolean;
  isFailed: boolean;
  isPending: boolean;
  message?: string | null;
  paymentUrl?: string | null;
  redirectUrl?: string | null;
};
