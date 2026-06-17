import { useMutation, useQueryClient } from '@tanstack/react-query';

import { cartKeys } from '@/entities/cart';

import type { CheckoutPayload } from '../model/checkout.types';
import { checkoutApi } from './checkout.api';
import { checkoutKeys } from './checkout.keys';

export function useCheckoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: checkoutKeys.mutation(),
    mutationFn: (payload: CheckoutPayload) => checkoutApi.checkout(payload),
    retry: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: cartKeys.current() });
    },
  });
}
