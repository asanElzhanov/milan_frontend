import type { Category } from '@/entities/category';
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

export type CategoryFilterOptions = {
  /** Slug the "all" option points to: the parent category, or undefined for the whole catalog. */
  allSlug?: string;
  /** Slug of the option rendered as selected; undefined means "all" is selected. */
  activeSlug?: string;
  options: Category[];
};

type CategoryMatch = {
  node: Category;
  parent?: Category;
};

const findCategory = (
  categories: Category[],
  slug: string,
  parent?: Category,
): CategoryMatch | undefined => {
  for (const node of categories) {
    if (node.slug === slug) {
      return { node, parent };
    }

    const match = findCategory(node.children ?? [], slug, node);

    if (match) {
      return match;
    }
  }

  return undefined;
};

/**
 * Header links point at root categories, so the filter list must show the level below the
 * selected category instead of repeating the header. A child slug keeps its siblings visible.
 */
export const getCategoryFilterOptions = (
  tree: Category[],
  categorySlug?: string,
): CategoryFilterOptions => {
  const roots = normalizeFilterOptions(tree);

  if (!categorySlug) {
    return { options: roots };
  }

  const match = findCategory(tree, categorySlug);

  if (!match) {
    return { activeSlug: categorySlug, options: roots };
  }

  const children = normalizeFilterOptions(match.node.children ?? []);

  if (children.length > 0) {
    return { allSlug: match.node.slug, options: children };
  }

  const siblings = normalizeFilterOptions(match.parent?.children ?? []);

  if (match.parent && siblings.length > 0) {
    return { allSlug: match.parent.slug, activeSlug: match.node.slug, options: siblings };
  }

  return { activeSlug: match.node.slug, options: roots };
};
