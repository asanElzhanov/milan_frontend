import { apiClient, isMockApiMode } from '@/shared/api';

import { adaptPaymentSession, adaptPaymentStatusResult } from '../lib/payment.adapters';
import type {
  PaymentSession,
  PaymentStartPayload,
  PaymentStatusResult,
} from '../model/payment.types';

const KASPI_CREATE_ENDPOINT = '/api/v1/payments/kaspi/create/';
const STRIPE_CREATE_INTENT_ENDPOINT = '/api/v1/payments/stripe/create-intent/';
const PAYMENT_START_DISABLED = 'Payment start endpoint is not configured';
const PAYMENT_START_MOCK_DISABLED = 'Payment is disabled in the current API mode';

export const paymentEndpointConfig = {
  start: {
    kaspi: KASPI_CREATE_ENDPOINT,
    stripe: STRIPE_CREATE_INTENT_ENDPOINT,
  },
  status: null,
} as const;

const getStartEndpoint = (provider: string): string | null => {
  const normalizedProvider = provider.trim().toLowerCase();

  if (normalizedProvider === 'kaspi') {
    return paymentEndpointConfig.start.kaspi;
  }

  if (normalizedProvider === 'stripe') {
    return paymentEndpointConfig.start.stripe;
  }

  return null;
};

export const paymentApi = {
  async startPayment(payload: PaymentStartPayload): Promise<PaymentSession | null> {
    if (isMockApiMode) {
      throw new Error(PAYMENT_START_MOCK_DISABLED);
    }

    const endpoint = getStartEndpoint(payload.provider);

    if (!endpoint) {
      throw new Error(PAYMENT_START_DISABLED);
    }

    const response = await apiClient.post<unknown>(endpoint, {
      order_number: payload.order_number,
      email: payload.email,
    });

    return adaptPaymentSession(response);
  },

  async getPaymentStatus(_orderNumber: string | number): Promise<PaymentStatusResult | null> {
    void _orderNumber;

    if (isMockApiMode || !paymentEndpointConfig.status) {
      return null;
    }

    return adaptPaymentStatusResult(null);
  },
};
