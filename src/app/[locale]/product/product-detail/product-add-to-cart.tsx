'use client';

import { useState } from 'react';

import type { ProductDetail, ProductVariant } from '@/entities/product';
import { useCreateCartItemMutation } from '@/entities/cart';
import { getApiErrorMessage } from '@/shared/api';
import { Button, QuantitySelector } from '@/shared/ui';
import type { AppLocale } from '@/shared/config';

import type { ProductDetailDictionary } from './product-detail.types';
import { getVariantStockQuantity, isVariantInStock } from './variant-resolver';

type ProductAddToCartProps = {
  dictionary: ProductDetailDictionary;
  product: ProductDetail;
  selectedVariant: ProductVariant | null;
  locale: AppLocale;
};

export function ProductAddToCart({
  dictionary,
  locale,
  product,
  selectedVariant,
}: ProductAddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const [notice, setNotice] = useState<string | null>(null);
  const addCartItemMutation = useCreateCartItemMutation();
  const hasVariants = (product.variants?.length ?? 0) > 0;
  const variantRequired = hasVariants && !selectedVariant;
  const inStock = hasVariants ? isVariantInStock(selectedVariant) : product.inStock !== false;
  const stockQuantity = getVariantStockQuantity(selectedVariant) ?? undefined;
  const disabled = variantRequired || !inStock || addCartItemMutation.isPending;

  const handleAddToCart = () => {
    if (!selectedVariant) {
      setNotice(dictionary.selectVariant);
      return;
    }

    addCartItemMutation.mutate(
      {
        variant_id: selectedVariant.id,
        quantity,
      },
      {
        onSuccess: () => setNotice(dictionary.addedToCart),
        onError: (error) => setNotice(getApiErrorMessage(error)),
      },
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <QuantitySelector
          locale={locale}
          disabled={disabled}
          max={stockQuantity}
          onChange={setQuantity}
          value={quantity}
        />
        <Button
          disabled={disabled}
          fullWidth
          loading={addCartItemMutation.isPending}
          onClick={handleAddToCart}
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
