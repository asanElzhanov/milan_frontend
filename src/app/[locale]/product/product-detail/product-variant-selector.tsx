'use client';

import type { ProductDetail } from '@/entities/product';
import { cn } from '@/shared/lib';

import type { ProductDetailDictionary } from './product-detail.types';
import { getAvailableColors, getAvailableSizes } from './variant-resolver';

type ProductVariantSelectorProps = {
  dictionary: ProductDetailDictionary;
  product: ProductDetail;
  selectedColor: string | null;
  selectedSize: string | null;
  onColorChange: (color: string | null) => void;
  onSizeChange: (size: string | null) => void;
};

export function ProductVariantSelector({
  dictionary,
  onColorChange,
  onSizeChange,
  product,
  selectedColor,
  selectedSize,
}: ProductVariantSelectorProps) {
  const colors = getAvailableColors(product);
  const sizes = getAvailableSizes(product, selectedColor);

  return (
    <div className="space-y-6">
      {colors.length > 0 ? (
        <section className="space-y-3">
          <h3 className="text-caption font-semibold uppercase text-sara-bronze">
            {dictionary.color}
          </h3>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                aria-pressed={selectedColor === color}
                className={cn(
                  'sara-focus min-h-10 border px-4 text-sm',
                  selectedColor === color
                    ? 'border-sara-graphite bg-sara-graphite text-sara-white'
                    : 'border-sara-beige-dark bg-sara-white text-sara-graphite hover:bg-sara-beige',
                )}
                key={color}
                onClick={() => {
                  onColorChange(selectedColor === color ? null : color);
                  onSizeChange(null);
                }}
                type="button"
              >
                {color}
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {sizes.length > 0 ? (
        <section className="space-y-3">
          <h3 className="text-caption font-semibold uppercase text-sara-bronze">
            {dictionary.size}
          </h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                aria-pressed={selectedSize === size}
                className={cn(
                  'sara-focus min-h-10 min-w-12 border px-4 text-sm',
                  selectedSize === size
                    ? 'border-sara-graphite bg-sara-graphite text-sara-white'
                    : 'border-sara-beige-dark bg-sara-white text-sara-graphite hover:bg-sara-beige',
                )}
                key={size}
                onClick={() => onSizeChange(selectedSize === size ? null : size)}
                type="button"
              >
                {size}
              </button>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
