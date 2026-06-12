import type { ProductListQuery } from '../model/product-query.types';

export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (query?: ProductListQuery) => [...productKeys.lists(), query] as const,
  detail: (slug: string) => [...productKeys.all, 'detail', slug] as const,
  similar: (slug: string) => [...productKeys.all, 'similar', slug] as const,
};
