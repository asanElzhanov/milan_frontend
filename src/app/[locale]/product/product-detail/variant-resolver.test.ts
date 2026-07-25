import { describe, expect, it } from 'vitest';

import type { ProductDetail } from '@/entities/product';

import {
  getColorOptions,
  getSizeOptions,
  isVariantInStock,
  resolveSelectedVariant,
} from './variant-resolver';

const product: ProductDetail = {
  id: 1,
  name: 'Shoes',
  slug: 'shoes',
  inStock: true,
  variants: [
    { id: 1, color: 'Black', size: '43', stockQuantity: 2, inStock: true },
    { id: 2, color: 'White', size: '43', stockQuantity: 1, inStock: true },
    { id: 3, color: 'Black', size: '54', stockQuantity: 3, inStock: true },
    { id: 4, color: 'White', size: '54', stockQuantity: 0, inStock: false },
  ],
};

describe('variant resolver', () => {
  it('does not resolve a variant until every product option is selected', () => {
    expect(resolveSelectedVariant({ product, selectedColor: 'Black' })).toBeNull();
    expect(resolveSelectedVariant({ product, selectedSize: '43' })).toBeNull();
    expect(
      resolveSelectedVariant({ product, selectedColor: 'Black', selectedSize: '43' })?.id,
    ).toBe(1);
  });

  it('keeps every option visible and disables unavailable combinations', () => {
    expect(getColorOptions(product, '54')).toEqual([
      { value: 'Black', inStock: true },
      { value: 'White', inStock: false },
    ]);
    expect(getSizeOptions(product, 'White')).toEqual([
      { value: '43', inStock: true },
      { value: '54', inStock: false },
    ]);
  });

  it('treats a zero quantity as out of stock even if the flag is stale', () => {
    expect(isVariantInStock({ id: 5, stockQuantity: 0, inStock: true })).toBe(false);
  });
});
