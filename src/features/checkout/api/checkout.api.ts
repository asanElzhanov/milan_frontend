import { adaptCheckoutResult, type CheckoutResult } from '@/entities/order';
import {
  ApiError,
  apiClient,
  clearCartToken,
  getAccessToken,
  isMockApiMode,
  syncCartTokenFromResponse,
} from '@/shared/api';

import type { CheckoutPayload } from '../model/checkout.types';

const CHECKOUT_ENDPOINT = '/api/v1/orders/checkout/';
const CHECKOUT_MUTATION_DISABLED = 'Checkout is disabled in the current API mode';

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

    const result = adaptCheckoutResult(response);

    if (!getAccessToken() && result.order?.orderNumber) {
      clearCartToken();
    }

    return result;
  },
};
