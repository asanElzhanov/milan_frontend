import { useQuery } from '@tanstack/react-query';

import { colorApi } from './color.api';
import { colorKeys } from './color.keys';

const CATALOG_META_STALE_TIME = 5 * 60 * 1000;

export const useColorsQuery = (params?: { active?: boolean }, options?: { enabled?: boolean }) =>
  useQuery({
    queryKey: colorKeys.list(params),
    queryFn: () => colorApi.getColors(params),
    staleTime: CATALOG_META_STALE_TIME,
    enabled: options?.enabled,
  });
