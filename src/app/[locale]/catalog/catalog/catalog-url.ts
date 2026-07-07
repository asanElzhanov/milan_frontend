import type { ProductListQuery, ProductOrdering } from '@/entities/product';
import { withLocale, type AppLocale } from '@/shared/config';

import type { CatalogSearchParams } from './catalog.types';

export const CATALOG_QUERY_KEYS = [
  'search',
  'brand',
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

const cleanValues = (value: string | string[] | undefined): string[] => {
  const values = Array.isArray(value) ? value : value ? [value] : [];

  return Array.from(
    new Set(
      values.flatMap((item) => item.split(',')).map((item) => item.trim()).filter(Boolean),
    ),
  );
};

const joinValues = (value: string | string[] | undefined): string | undefined => {
  const values = cleanValues(value);

  return values.length > 0 ? values.join(',') : undefined;
};

const cleanValue = (value: string | string[] | undefined): string | undefined => {
  const current = firstValue(value)?.trim();

  return current || undefined;
};

const setCatalogParam = (
  params: CatalogSearchParams,
  key: keyof CatalogSearchParams,
  value: string | string[],
) => {
  params[key] = value;
};

const parsePage = (value: string | undefined): number => {
  const parsed = Number(value);

  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
};

const parseBoolean = (value: string | undefined): boolean | undefined =>
  value === 'true' ? true : undefined;

const isOrdering = (value: string | undefined): value is ProductOrdering =>
  Boolean(value && orderingValues.includes(value as ProductOrdering));

const isRepeatedParam = (key: keyof CatalogSearchParams): key is 'brand' | 'color' =>
  key === 'brand' || key === 'color';

const isMultiValueParam = (key: keyof CatalogSearchParams): key is 'brand' | 'color' | 'size' =>
  isRepeatedParam(key) || key === 'size';

export const normalizeCatalogSearchParams = (
  searchParams: CatalogSearchParams,
): CatalogSearchParams =>
  CATALOG_QUERY_KEYS.reduce<CatalogSearchParams>((acc, key) => {
    if (isMultiValueParam(key)) {
      const value = cleanValues(searchParams[key]);

      if (value.length > 0) {
        setCatalogParam(acc, key, value);
      }

      return acc;
    }

    const value = cleanValue(searchParams[key]);

    if (value) {
      setCatalogParam(acc, key, value);
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
    brand: cleanValues(params.brand),
    color: cleanValues(params.color),
    size: joinValues(params.size),
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
    const value = isMultiValueParam(key)
      ? cleanValues(params[key])
      : cleanValue(params[key]);

    if (Array.isArray(value)) {
      if (isRepeatedParam(key)) {
        value.forEach((item) => search.append(key, item));
      } else {
        const joinedValue = value.join(',');

        if (joinedValue) {
          search.set(key, joinedValue);
        }
      }
    } else if (value && !(key === 'page' && value === '1')) {
      search.set(key, value);
    }
  });

  const queryString = search.toString().replace(/%2C/gi, ',');
  const path = withLocale(locale, getCatalogBasePath(categorySlug));

  return queryString ? `${path}?${queryString}` : path;
};

export const setFilterValue = (
  searchParams: CatalogSearchParams,
  key: keyof CatalogSearchParams,
  value?: string | string[] | null,
): CatalogSearchParams => {
  const next = normalizeCatalogSearchParams(searchParams);

  if (Array.isArray(value)) {
    const values = cleanValues(value);

    if (values.length > 0) {
      setCatalogParam(next, key, values);
    } else {
      delete next[key];
    }
  } else if (value?.trim()) {
    setCatalogParam(next, key, value.trim());
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

export const removeFilterValue = (
  searchParams: CatalogSearchParams,
  key: keyof CatalogSearchParams,
  value: string,
): CatalogSearchParams => {
  const current = cleanValues(searchParams[key]);

  if (current.length <= 1) {
    return removeFilter(searchParams, key);
  }

  return setFilterValue(
    searchParams,
    key,
    current.filter((item) => item !== value),
  );
};

export const resetFiltersHref = (locale: AppLocale, categorySlug?: string): string =>
  buildCatalogHref(locale, {}, categorySlug);

export const hasCatalogFilters = (
  searchParams: CatalogSearchParams,
  categorySlug?: string,
): boolean => {
  const params = normalizeCatalogSearchParams(searchParams);

  return Boolean(categorySlug || CATALOG_QUERY_KEYS.some((key) => key !== 'page' && params[key]));
};

export const getSearchParam = (
  searchParams: CatalogSearchParams,
  key: keyof CatalogSearchParams,
): string | undefined => cleanValue(searchParams[key]);

export const getSearchParams = (
  searchParams: CatalogSearchParams,
  key: keyof CatalogSearchParams,
): string[] => cleanValues(searchParams[key]);
