import { useQuery } from '@tanstack/react-query';

import type { ProductListQuery } from '../model/product-query.types';
import { productApi } from './product.api';
import { productKeys } from './product.keys';

const PRODUCT_STALE_TIME = 60 * 1000;

export const useProductsQuery = (query?: ProductListQuery, options?: { enabled?: boolean }) =>
  useQuery({
    queryKey: productKeys.list(query),
    queryFn: () => productApi.getProducts(query),
    staleTime: PRODUCT_STALE_TIME,
    enabled: options?.enabled,
  });

export const useProductQuery = (slug: string, options?: { enabled?: boolean }) =>
  useQuery({
    queryKey: productKeys.detail(slug),
    queryFn: () => productApi.getProductBySlug(slug),
    staleTime: PRODUCT_STALE_TIME,
    enabled: Boolean(slug) && options?.enabled !== false,
  });

export const useSimilarProductsQuery = (slug: string, options?: { enabled?: boolean }) =>
  useQuery({
    queryKey: productKeys.similar(slug),
    queryFn: () => productApi.getSimilarProducts(slug),
    staleTime: PRODUCT_STALE_TIME,
    enabled: Boolean(slug) && options?.enabled !== false,
  });
