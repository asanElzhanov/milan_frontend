import { useQuery } from '@tanstack/react-query';

import { sizeApi } from './size.api';
import { sizeKeys } from './size.keys';

const CATALOG_META_STALE_TIME = 5 * 60 * 1000;

export const useSizesQuery = (params?: { active?: boolean }, options?: { enabled?: boolean }) =>
  useQuery({
    queryKey: sizeKeys.list(params),
    queryFn: () => sizeApi.getSizes(params),
    staleTime: CATALOG_META_STALE_TIME,
    enabled: options?.enabled,
  });
