import { useQuery } from '@tanstack/react-query';

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
