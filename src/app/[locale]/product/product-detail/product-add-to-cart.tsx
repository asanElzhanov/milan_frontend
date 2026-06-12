'use client';

import { useState } from 'react';

import type { ProductDetail, ProductVariant } from '@/entities/product';
import { Button, QuantitySelector } from '@/shared/ui';

import type { ProductDetailDictionary } from './product-detail.types';
import { getVariantStockQuantity, isVariantInStock } from './variant-resolver';

type ProductAddToCartProps = {
  dictionary: ProductDetailDictionary;
  product: ProductDetail;
  selectedVariant: ProductVariant | null;
};

export function ProductAddToCart({ dictionary, product, selectedVariant }: ProductAddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const [notice, setNotice] = useState<string | null>(null);
  const hasVariants = (product.variants?.length ?? 0) > 0;
  const variantRequired = hasVariants && !selectedVariant;
  const inStock = hasVariants ? isVariantInStock(selectedVariant) : product.inStock !== false;
  const stockQuantity = getVariantStockQuantity(selectedVariant) ?? undefined;
  const disabled = variantRequired || !inStock;

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <QuantitySelector
          disabled={disabled}
          max={stockQuantity}
          onChange={setQuantity}
          value={quantity}
        />
        <Button
          disabled={disabled}
          fullWidth
          onClick={() => {
            // Future cart mutation will use selectedVariant.id as variant_id plus quantity.
            void selectedVariant?.id;
            setNotice(dictionary.cartComingSoon);
          }}
        >
          {dictionary.addToCart}
        </Button>
      </div>
      {variantRequired ? (
        <p className="text-sm text-sara-bronze">{dictionary.selectVariant}</p>
      ) : null}
      {notice ? <p className="text-sm text-sara-graphite/70">{notice}</p> : null}
    </div>
  );
}
