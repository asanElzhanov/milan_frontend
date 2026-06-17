import { adaptCheckoutResult, type CheckoutResult } from '@/entities/order';
import { ApiError, apiClient, isMockApiMode, syncCartTokenFromResponse } from '@/shared/api';

import type { CheckoutPayload } from '../model/checkout.types';

const CHECKOUT_ENDPOINT = '/api/v1/orders/checkout/';
const CHECKOUT_MUTATION_DISABLED = 'Checkout API is disabled in mock mode';

const throwMockCheckoutError = (): never => {
  throw new ApiError({
    status: 503,
    message: CHECKOUT_MUTATION_DISABLED,
    code: 'checkout_mock_mode',
  });
};

export const checkoutApi = {
  async checkout(payload: CheckoutPayload): Promise<CheckoutResult> {
    if (isMockApiMode) {
      throwMockCheckoutError();
    }

    const response = await apiClient.post<unknown>(CHECKOUT_ENDPOINT, payload);

    syncCartTokenFromResponse(response);

    return adaptCheckoutResult(response);
  },
};
