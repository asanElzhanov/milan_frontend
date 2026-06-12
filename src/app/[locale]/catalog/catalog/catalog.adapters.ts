import type { ProductListItem } from '@/entities/product';
import type { PaginatedResponse } from '@/shared/api';

export type CatalogPaginationMeta = {
  totalCount: number;
  totalPages: number;
};

const isPaginatedProductResponse = (
  value: PaginatedResponse<ProductListItem> | ProductListItem[],
): value is PaginatedResponse<ProductListItem> => !Array.isArray(value);

export const extractProductList = (
  response: PaginatedResponse<ProductListItem> | ProductListItem[],
): ProductListItem[] => (isPaginatedProductResponse(response) ? response.results : response);

export const extractPaginationMeta = (
  response: PaginatedResponse<ProductListItem> | ProductListItem[],
  products: ProductListItem[],
): CatalogPaginationMeta => {
  if (!isPaginatedProductResponse(response)) {
    return {
      totalCount: products.length,
      totalPages: 1,
    };
  }

  const totalCount = response.count;
  const totalPages = products.length > 0 ? Math.ceil(totalCount / products.length) : 1;

  return {
    totalCount,
    totalPages: Math.max(totalPages, 1),
  };
};

export const normalizeFilterOptions = <T extends { isActive?: boolean }>(items: T[]): T[] =>
  items.filter((item) => item.isActive !== false);
