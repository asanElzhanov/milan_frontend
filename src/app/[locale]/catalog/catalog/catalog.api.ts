import { brandApi } from '@/entities/brand';
import { categoryApi } from '@/entities/category';
import { colorApi } from '@/entities/color';
import { productApi } from '@/entities/product';
import { sizeApi } from '@/entities/size';
import { isMockApiMode } from '@/shared/api';

import {
  extractPaginationMeta,
  extractProductList,
  normalizeFilterOptions,
} from './catalog.adapters';
import { parseCatalogSearchParams } from './catalog-url';
import type { CatalogData, CatalogSearchParams } from './catalog.types';

const emptyCatalogData = (currentPage: number, hasError = false): CatalogData => ({
  products: [],
  totalCount: 0,
  totalPages: 1,
  currentPage,
  categories: [],
  brands: [],
  colors: [],
  sizes: [],
  hasError,
});

export async function getCatalogData(args: {
  categorySlug?: string;
  searchParams: CatalogSearchParams;
}): Promise<CatalogData> {
  const query = parseCatalogSearchParams(args.searchParams, args.categorySlug);
  const currentPage = query.page ?? 1;

  const [productsResult, categoriesResult, brandsResult, colorsResult, sizesResult] =
    await Promise.allSettled([
      productApi.getProducts(query),
      categoryApi.getCategoryTree({ active: true }),
      brandApi.getBrands({ active: true }),
      colorApi.getColors({ active: true }),
      sizeApi.getSizes({ active: true }),
    ]);

  if (productsResult.status === 'rejected') {
    return emptyCatalogData(currentPage, !isMockApiMode);
  }

  const products = extractProductList(productsResult.value);
  const pagination = extractPaginationMeta(productsResult.value, products);

  return {
    products,
    totalCount: pagination.totalCount,
    totalPages: pagination.totalPages,
    currentPage,
    categories:
      categoriesResult.status === 'fulfilled' ? normalizeFilterOptions(categoriesResult.value) : [],
    brands: brandsResult.status === 'fulfilled' ? normalizeFilterOptions(brandsResult.value) : [],
    colors: colorsResult.status === 'fulfilled' ? normalizeFilterOptions(colorsResult.value) : [],
    sizes: sizesResult.status === 'fulfilled' ? normalizeFilterOptions(sizesResult.value) : [],
    hasError: false,
  };
}
