import { apiClient, isMockApiMode } from '@/shared/api';

import { adaptPaymentSession, adaptPaymentStatusResult } from '../lib/payment.adapters';
import type {
  PaymentSession,
  PaymentStartPayload,
  PaymentStatusResult,
} from '../model/payment.types';

const FREEDOM_CREATE_ENDPOINT = '/api/v1/payments/freedom/create/';
const FREEDOM_STATUS_ENDPOINT = '/api/v1/payments/freedom/status/';
const PAYMENT_MOCK_DISABLED = 'Payment is disabled in the current API mode';

export const paymentEndpointConfig = {
  start: FREEDOM_CREATE_ENDPOINT,
  status: FREEDOM_STATUS_ENDPOINT,
} as const;

export const paymentApi = {
  async startPayment(payload: PaymentStartPayload): Promise<PaymentSession | null> {
    if (isMockApiMode) {
      throw new Error(PAYMENT_MOCK_DISABLED);
    }

    const response = await apiClient.post<unknown>(FREEDOM_CREATE_ENDPOINT, {
      order_number: payload.order_number,
      email: payload.email,
      locale: payload.locale,
    });

    return adaptPaymentSession(response);
  },

  async getPaymentStatus(
    orderNumber: string | number,
    email?: string,
  ): Promise<PaymentStatusResult | null> {
    if (isMockApiMode) {
      return null;
    }

    const response = await apiClient.get<unknown>(FREEDOM_STATUS_ENDPOINT, {
      query: {
        order_number: orderNumber,
        ...(email ? { email } : {}),
      },
    });

    return adaptPaymentStatusResult(response);
  },
};
