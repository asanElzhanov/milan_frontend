import type { ProductListQuery, ProductOrdering } from '@/entities/product';
import { withLocale, type AppLocale } from '@/shared/config';

import type { CatalogSearchParams } from './catalog.types';

export const CATALOG_QUERY_KEYS = [
  'search',
  'brand_slug',
  'color',
  'size',
  'material',
  'season',
  'in_stock',
  'is_sale',
  'is_new',
  'price_min',
  'price_max',
  'ordering',
  'page',
] as const;

const orderingValues: ProductOrdering[] = [
  'price',
  '-price',
  'created_at',
  '-created_at',
  'rating',
  '-rating',
  'orders_count',
  '-orders_count',
];

const firstValue = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

const cleanValue = (value: string | string[] | undefined): string | undefined => {
  const current = firstValue(value)?.trim();

  return current || undefined;
};

const parsePage = (value: string | undefined): number => {
  const parsed = Number(value);

  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
};

const parseBoolean = (value: string | undefined): boolean | undefined =>
  value === 'true' ? true : undefined;

const isOrdering = (value: string | undefined): value is ProductOrdering =>
  Boolean(value && orderingValues.includes(value as ProductOrdering));

export const normalizeCatalogSearchParams = (
  searchParams: CatalogSearchParams,
): CatalogSearchParams =>
  CATALOG_QUERY_KEYS.reduce<CatalogSearchParams>((acc, key) => {
    const value = cleanValue(searchParams[key]);

    if (value) {
      acc[key] = value;
    }

    return acc;
  }, {});

export const parseCatalogSearchParams = (
  searchParams: CatalogSearchParams,
  categorySlug?: string,
): ProductListQuery => {
  const params = normalizeCatalogSearchParams(searchParams);
  const ordering = cleanValue(params.ordering);

  return {
    category_slug: categorySlug,
    brand_slug: cleanValue(params.brand_slug),
    color: cleanValue(params.color),
    size: cleanValue(params.size),
    material: cleanValue(params.material),
    season: cleanValue(params.season),
    in_stock: parseBoolean(cleanValue(params.in_stock)),
    is_sale: parseBoolean(cleanValue(params.is_sale)),
    is_new: parseBoolean(cleanValue(params.is_new)),
    price_min: cleanValue(params.price_min),
    price_max: cleanValue(params.price_max),
    search: cleanValue(params.search),
    ordering: isOrdering(ordering) ? ordering : undefined,
    page: parsePage(cleanValue(params.page)),
  };
};

const getCatalogBasePath = (categorySlug?: string) =>
  categorySlug ? `/catalog/${categorySlug}` : '/catalog';

export const buildCatalogHref = (
  locale: AppLocale,
  nextQuery: CatalogSearchParams,
  categorySlug?: string,
): string => {
  const params = normalizeCatalogSearchParams(nextQuery);
  const search = new URLSearchParams();

  CATALOG_QUERY_KEYS.forEach((key) => {
    const value = cleanValue(params[key]);

    if (value && !(key === 'page' && value === '1')) {
      search.set(key, value);
    }
  });

  const queryString = search.toString();
  const path = withLocale(locale, getCatalogBasePath(categorySlug));

  return queryString ? `${path}?${queryString}` : path;
};

export const setFilterValue = (
  searchParams: CatalogSearchParams,
  key: keyof CatalogSearchParams,
  value?: string | null,
): CatalogSearchParams => {
  const next = normalizeCatalogSearchParams(searchParams);

  if (value?.trim()) {
    next[key] = value.trim();
  } else {
    delete next[key];
  }

  next.page = '1';

  return next;
};

export const toggleFilterValue = (
  searchParams: CatalogSearchParams,
  key: keyof CatalogSearchParams,
  value: string,
): CatalogSearchParams => {
  const current = cleanValue(searchParams[key]);

  return setFilterValue(searchParams, key, current === value ? undefined : value);
};

export const removeFilter = (
  searchParams: CatalogSearchParams,
  key: keyof CatalogSearchParams,
): CatalogSearchParams => {
  const next = normalizeCatalogSearchParams(searchParams);

  delete next[key];
  next.page = '1';

  return next;
};

export const resetFiltersHref = (locale: AppLocale, categorySlug?: string): string =>
  buildCatalogHref(locale, {}, categorySlug);

export const getSearchParam = (
  searchParams: CatalogSearchParams,
  key: keyof CatalogSearchParams,
): string | undefined => cleanValue(searchParams[key]);
