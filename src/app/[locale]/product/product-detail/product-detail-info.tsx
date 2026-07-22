'use client';

import { useMemo, useState } from 'react';

import type { ProductDetail } from '@/entities/product';
import { ProductBadges, ProductPrice, ProductRating } from '@/entities/product';
import { WishlistToggleButton } from '@/features/wishlist';
import type { AppLocale } from '@/shared/config';

import { ProductAddToCart } from './product-add-to-cart';
import type { ProductDetailDictionary } from './product-detail.types';
import { ProductStock } from './product-stock';
import { ProductVariantSelector } from './product-variant-selector';
import { resolveSelectedVariant } from './variant-resolver';

type ProductDetailInfoProps = {
  dictionary: ProductDetailDictionary;
  locale: AppLocale;
  product: ProductDetail;
};

export function ProductDetailInfo({ dictionary, locale, product }: ProductDetailInfoProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const selectedVariant = useMemo(
    () => resolveSelectedVariant({ product, selectedColor, selectedSize }),
    [product, selectedColor, selectedSize],
  );
  const badgeLabels =
    locale === 'ru'
      ? { new: 'Новинка', sale: 'Скидка', outOfStock: 'Нет в наличии' }
      : locale === 'kk'
        ? { new: 'Жаңа', sale: 'Жеңілдік', outOfStock: 'Қоймада жоқ' }
        : { new: 'New', sale: 'Sale', outOfStock: 'Out of stock' };
  const ratingValue = product.averageRating ?? product.rating ?? 0;
  const ratingLabel =
    locale === 'ru'
      ? `Рейтинг ${ratingValue} из 5`
      : locale === 'kk'
        ? `Рейтинг: ${ratingValue} / 5`
        : `Rating ${ratingValue} out of 5`;

  return (
    <div className="space-y-7">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 text-caption text-sara-graphite/60">
          {product.brandName ? <span>{product.brandName}</span> : null}
          {product.categoryName ? <span>{product.categoryName}</span> : null}
          {product.sku ? <span>SKU: {product.sku}</span> : null}
        </div>
        <h1 className="font-fashion text-4xl font-medium leading-tight text-sara-black md:text-5xl">
          {product.name}
        </h1>
        <ProductBadges
          discountPercent={product.discountPercent}
          inStock={product.inStock}
          isNew={product.isNew}
          isSale={product.isSale}
          labels={badgeLabels}
        />
        <ProductRating
          ariaLabel={ratingLabel}
          averageRating={product.averageRating ?? product.rating}
          reviewsCount={product.reviewsCount}
          showEmpty
        />
      </div>

      <ProductPrice
        discountPercent={product.discountPercent}
        oldPrice={selectedVariant?.oldPrice ?? product.oldPrice}
        price={selectedVariant?.price ?? product.price}
        size="lg"
      />

      <ProductVariantSelector
        dictionary={dictionary}
        onColorChange={setSelectedColor}
        onSizeChange={setSelectedSize}
        product={product}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
      />

      <ProductStock dictionary={dictionary} product={product} selectedVariant={selectedVariant} />
      <WishlistToggleButton locale={locale} productId={product.id} variant="button" />
      <ProductAddToCart
        dictionary={dictionary}
        locale={locale}
        product={product}
        selectedVariant={selectedVariant}
      />
    </div>
  );
}
