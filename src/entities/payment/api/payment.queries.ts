import { useMutation, useQuery } from '@tanstack/react-query';

import type { PaymentStartPayload } from '../model/payment.types';
import { paymentApi } from './payment.api';
import { paymentKeys } from './payment.keys';

export function useStartPaymentMutation() {
  return useMutation({
    mutationFn: (payload: PaymentStartPayload) => paymentApi.startPayment(payload),
    retry: false,
  });
}

export function usePaymentStatusQuery(
  orderNumber: string | number | null | undefined,
  options?: {
    enabled?: boolean;
    refetchInterval?: number | false;
  },
) {
  return useQuery({
    queryKey: paymentKeys.status(orderNumber ?? ''),
    queryFn: () => paymentApi.getPaymentStatus(orderNumber as string | number),
    enabled: Boolean(orderNumber) && options?.enabled,
    refetchInterval: options?.refetchInterval ?? false,
    retry: 1,
  });
}
