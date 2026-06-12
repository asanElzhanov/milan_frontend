import { useQuery } from '@tanstack/react-query';

import { brandApi } from './brand.api';
import { brandKeys } from './brand.keys';

const CATALOG_META_STALE_TIME = 5 * 60 * 1000;

export const useBrandsQuery = (params?: { active?: boolean }, options?: { enabled?: boolean }) =>
  useQuery({
    queryKey: brandKeys.list(params),
    queryFn: () => brandApi.getBrands(params),
    staleTime: CATALOG_META_STALE_TIME,
    enabled: options?.enabled,
  });

export const useBrandQuery = (slug: string, options?: { enabled?: boolean }) =>
  useQuery({
    queryKey: brandKeys.detail(slug),
    queryFn: () => brandApi.getBrandBySlug(slug),
    staleTime: CATALOG_META_STALE_TIME,
    enabled: Boolean(slug) && options?.enabled !== false,
  });
