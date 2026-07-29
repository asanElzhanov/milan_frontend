import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { Order } from '../model/order.types';
import { orderApi } from './order.api';
import { orderKeys } from './order.keys';

export function useOrdersQuery(params?: { page?: number }, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: orderKeys.list(params),
    queryFn: () => orderApi.getOrders(params),
    enabled: options?.enabled,
    retry: 1,
  });
}

export function useOrderQuery(
  orderNumber: string | number | null | undefined,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: orderKeys.detail(orderNumber ?? ''),
    queryFn: () => orderApi.getOrder(orderNumber as string | number),
    enabled: Boolean(orderNumber) && options?.enabled,
    retry: 1,
  });
}

type CancelOrderVariables = {
  orderNumber: string | number;
  email?: string;
  comment?: string;
};

export function useCancelOrderMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderNumber, email, comment }: CancelOrderVariables) =>
      orderApi.cancelOrder(orderNumber, { email, comment }),
    retry: false,
    onSuccess: (order: Order | null, variables: CancelOrderVariables) => {
      if (order) {
        queryClient.setQueryData(orderKeys.detail(variables.orderNumber), order);
      }
      void queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    },
  });
}
