import { useQuery } from '@tanstack/react-query';

import { categoryApi } from './category.api';
import { categoryKeys } from './category.keys';

const CATALOG_META_STALE_TIME = 5 * 60 * 1000;

export const useCategoriesQuery = (
  params?: { active?: boolean },
  options?: { enabled?: boolean },
) =>
  useQuery({
    queryKey: categoryKeys.list(params),
    queryFn: () => categoryApi.getCategories(params),
    staleTime: CATALOG_META_STALE_TIME,
    enabled: options?.enabled,
  });

export const useCategoryQuery = (slug: string, options?: { enabled?: boolean }) =>
  useQuery({
    queryKey: categoryKeys.detail(slug),
    queryFn: () => categoryApi.getCategoryBySlug(slug),
    staleTime: CATALOG_META_STALE_TIME,
    enabled: Boolean(slug) && options?.enabled !== false,
  });

export const useCategoryTreeQuery = (
  params?: { active?: boolean },
  options?: { enabled?: boolean },
) =>
  useQuery({
    queryKey: categoryKeys.tree(params),
    queryFn: () => categoryApi.getCategoryTree(params),
    staleTime: CATALOG_META_STALE_TIME,
    enabled: options?.enabled,
  });
