import { useQuery } from '@tanstack/react-query';

import type { AppLocale } from '@/shared/config';

import { deliveryMethodApi } from './delivery-method.api';
import { deliveryMethodKeys } from './delivery-method.keys';

export function useDeliveryMethodsQuery(options?: { enabled?: boolean; locale?: AppLocale }) {
  const locale = options?.locale ?? 'ru';

  return useQuery({
    queryKey: deliveryMethodKeys.list(locale),
    queryFn: () => deliveryMethodApi.getDeliveryMethods(locale),
    enabled: options?.enabled,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
