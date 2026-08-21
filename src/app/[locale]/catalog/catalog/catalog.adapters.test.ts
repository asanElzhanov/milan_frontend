import { describe, expect, it } from 'vitest';

import type { Category } from '@/entities/category';
import type { ProductListItem } from '@/entities/product';

import { extractPaginationMeta, filterProductsByCategory } from './catalog.adapters';

const categories: Category[] = [
  {
    id: 1,
    name: 'Men',
    slug: 'men',
    children: [{ id: 2, name: 'Men shoes', slug: 'men-shoes' }],
  },
  {
    id: 3,
    name: 'Women',
    name_ru: '\u0416\u0435\u043d\u0449\u0438\u043d\u0430\u043c',
    slug: 'women',
  },
];

const product = (id: number, categorySlug?: string, categoryName?: string): ProductListItem => ({
  id,
  name: `Product ${id}`,
  slug: `product-${id}`,
  categorySlug,
  categoryName,
});

describe('filterProductsByCategory', () => {
  it('removes products from a sibling category', () => {
    const products = [
      product(1, 'men', 'Men'),
      product(2, 'men-shoes', 'Men shoes'),
      product(3, 'women', '\u0416\u0435\u043d\u0449\u0438\u043d\u0430\u043c'),
    ];

    expect(filterProductsByCategory(products, categories, 'men').map(({ id }) => id)).toEqual([
      1, 2,
    ]);
  });

  it('supports legacy products that only contain a category name', () => {
    const products = [
      product(1, undefined, 'Men'),
      product(2, undefined, '\u0416\u0435\u043d\u0449\u0438\u043d\u0430\u043c'),
    ];

    expect(filterProductsByCategory(products, categories, 'women').map(({ id }) => id)).toEqual([
      2,
    ]);
  });
});

describe('extractPaginationMeta', () => {
  const products = (count: number): ProductListItem[] =>
    Array.from({ length: count }, (_, index) => product(index + 1));

  it('derives totalPages from a full page that has more pages after it', () => {
    const response = { count: 101, next: 'http://api/products/?page=2', previous: null, results: products(24) };

    expect(extractPaginationMeta(response, products(24), 1)).toEqual({
      totalCount: 101,
      totalPages: 5,
    });
  });

  it('does not overcount pages when the last page is only partially filled', () => {
    const response = { count: 101, next: null, previous: 'http://api/products/?page=4', results: products(5) };

    expect(extractPaginationMeta(response, products(5), 5)).toEqual({
      totalCount: 101,
      totalPages: 5,
    });
  });

  it('treats a single, non-final page as the only page', () => {
    const response = { count: 3, next: null, previous: null, results: products(3) };

    expect(extractPaginationMeta(response, products(3), 1)).toEqual({
      totalCount: 3,
      totalPages: 1,
    });
  });
});
