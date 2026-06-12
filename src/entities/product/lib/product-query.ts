import type { ProductListQuery } from '../model/product-query.types';

export const normalizeProductListQuery = (
  query?: ProductListQuery,
): ProductListQuery | undefined => {
  if (!query) {
    return undefined;
  }

  const entries = Object.entries(query).filter(([, value]) => value !== undefined && value !== '');

  return entries.length > 0 ? Object.fromEntries(entries) : undefined;
};
