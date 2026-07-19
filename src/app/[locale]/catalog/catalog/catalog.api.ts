import { brandApi } from '@/entities/brand';
import { categoryApi } from '@/entities/category';
import { colorApi } from '@/entities/color';
import { productApi, type ProductListItem } from '@/entities/product';
import { sizeApi } from '@/entities/size';
import { isMockApiMode, type PaginatedResponse } from '@/shared/api';

import {
  extractPaginationMeta,
  extractProductList,
  normalizeFilterOptions,
} from './catalog.adapters';
import { isRecommendedSort, parseCatalogSearchParams } from './catalog-url';
import { recommendationsApi, type RecommendationResult } from './recommendations.api';
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

const isRecommendationResult = (value: unknown): value is RecommendationResult =>
  typeof value === 'object' && value !== null && 'products' in value;

export async function getCatalogData(args: {
  categorySlug?: string;
  searchParams: CatalogSearchParams;
}): Promise<CatalogData> {
  const query = parseCatalogSearchParams(args.searchParams, args.categorySlug);
  const currentPage = query.page ?? 1;

  const loadProducts = async () => {
    if (!isRecommendedSort(args.searchParams.ordering)) {
      return productApi.getProducts(query);
    }

    const personalized = await recommendationsApi.getPersonalized(currentPage);
    if (personalized.products.length > 0) return personalized;

    const popular = await recommendationsApi.getPopular(currentPage);
    if (popular.products.length > 0) return popular;

    // The recommendations contract does not advertise catalog filters. The
    // final fallback keeps the user's filters and omits the UI-only ordering.
    return productApi.getProducts(query);
  };

  const [productsResult, categoriesResult, brandsResult, colorsResult, sizesResult] =
    await Promise.allSettled([
      loadProducts(),
      categoryApi.getCategoryTree({ active: true }),
      brandApi.getBrands({ active: true }),
      colorApi.getColors({ active: true }),
      sizeApi.getSizes({ active: true }),
    ]);

  if (productsResult.status === 'rejected') {
    return emptyCatalogData(currentPage, !isMockApiMode);
  }

  const recommendationResult = isRecommendationResult(productsResult.value)
    ? productsResult.value
    : undefined;
  let products;
  let pagination;
  if (recommendationResult) {
    products = recommendationResult.products;
    pagination = {
      totalCount: recommendationResult.count,
      totalPages: recommendationResult.totalPages,
    };
  } else {
    const catalogResponse = productsResult.value as
      | PaginatedResponse<ProductListItem>
      | ProductListItem[];
    products = extractProductList(catalogResponse);
    pagination = extractPaginationMeta(catalogResponse, products);
  }

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
