import { useQuery } from '@tanstack/react-query';

import { deliveryMethodApi } from './delivery-method.api';
import { deliveryMethodKeys } from './delivery-method.keys';

export function useDeliveryMethodsQuery(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: deliveryMethodKeys.list(),
    queryFn: () => deliveryMethodApi.getDeliveryMethods(),
    enabled: options?.enabled,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
