import { describe, expect, it } from 'vitest';

import type { Category } from '@/entities/category';
import type { ProductListItem } from '@/entities/product';

import { filterProductsByCategory } from './catalog.adapters';

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
