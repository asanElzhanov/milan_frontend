'use client';

import type { ProductDetail } from '@/entities/product';
import { cn } from '@/shared/lib';

import type { ProductDetailDictionary } from './product-detail.types';
import { getColorOptions, getSizeOptions } from './variant-resolver';

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
  const colors = getColorOptions(product, selectedSize);
  const sizes = getSizeOptions(product, selectedColor);

  return (
    <div className="space-y-6">
      {colors.length > 0 ? (
        <section className="space-y-3">
          <h3 className="text-caption font-semibold uppercase text-sara-bronze">
            {dictionary.color}
          </h3>
          <div className="flex flex-wrap gap-2">
            {colors.map((option) => (
              <button
                aria-label={
                  option.inStock ? option.value : `${option.value} — ${dictionary.outOfStock}`
                }
                aria-pressed={selectedColor === option.value}
                className={cn(
                  'sara-focus min-h-10 border px-4 py-2 text-sm',
                  selectedColor === option.value
                    ? 'border-sara-graphite bg-sara-graphite text-sara-white'
                    : 'border-sara-beige-dark bg-sara-white text-sara-graphite hover:bg-sara-beige',
                  !option.inStock &&
                    'cursor-not-allowed opacity-45 line-through hover:bg-sara-white',
                )}
                disabled={!option.inStock}
                key={option.value}
                onClick={() => onColorChange(selectedColor === option.value ? null : option.value)}
                title={!option.inStock ? dictionary.outOfStock : undefined}
                type="button"
              >
                <span className="block">{option.value}</span>
                {!option.inStock ? (
                  <span className="block text-[0.65rem] no-underline">{dictionary.outOfStock}</span>
                ) : null}
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
            {sizes.map((option) => (
              <button
                aria-label={
                  option.inStock ? option.value : `${option.value} — ${dictionary.outOfStock}`
                }
                aria-pressed={selectedSize === option.value}
                className={cn(
                  'sara-focus min-h-10 min-w-12 border px-4 py-2 text-sm',
                  selectedSize === option.value
                    ? 'border-sara-graphite bg-sara-graphite text-sara-white'
                    : 'border-sara-beige-dark bg-sara-white text-sara-graphite hover:bg-sara-beige',
                  !option.inStock &&
                    'cursor-not-allowed opacity-45 line-through hover:bg-sara-white',
                )}
                disabled={!option.inStock}
                key={option.value}
                onClick={() => onSizeChange(selectedSize === option.value ? null : option.value)}
                title={!option.inStock ? dictionary.outOfStock : undefined}
                type="button"
              >
                <span className="block">{option.value}</span>
                {!option.inStock ? (
                  <span className="block text-[0.65rem] no-underline">{dictionary.outOfStock}</span>
                ) : null}
              </button>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
