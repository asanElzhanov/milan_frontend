import { useQuery } from '@tanstack/react-query';

import { bannerApi } from './banner.api';
import { bannerKeys } from './banner.keys';

const CATALOG_META_STALE_TIME = 5 * 60 * 1000;

export const useBannersQuery = (
  params?: { position?: string; active?: boolean },
  options?: { enabled?: boolean },
) =>
  useQuery({
    queryKey: bannerKeys.list(params),
    queryFn: () => bannerApi.getBanners(params),
    staleTime: CATALOG_META_STALE_TIME,
    enabled: options?.enabled,
  });
