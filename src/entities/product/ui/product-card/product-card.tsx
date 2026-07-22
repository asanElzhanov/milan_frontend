'use client';

import { Heart } from 'lucide-react';
import Link from 'next/link';

import { WishlistToggleButton } from '@/features/wishlist';
import type { AppLocale } from '@/shared/config';
import { DEFAULT_LOCALE, withLocale } from '@/shared/config';
import { cn, getLocalizedField, localizeBackendValue } from '@/shared/lib';

import type { ProductListItem } from '../../model/product.types';
import { ProductBadges } from '../product-badges';
import { ProductColorDots } from '../product-color-dots';
import { ProductImage } from '../product-image';
import { ProductPrice } from '../product-price';
import { ProductRating } from '../product-rating';
import { ProductSizePreview } from '../product-size-preview';

export type ProductCardProps = {
  product: ProductListItem;
  locale?: AppLocale;
  priority?: boolean;
  showRating?: boolean;
  showColors?: boolean;
  showSizes?: boolean;
  showWishlist?: boolean;
  wishlistActive?: boolean;
  onWishlistToggle?: (product: ProductListItem) => void;
  className?: string;
};

const productCardCopy: Record<
  AppLocale,
  {
    new: string;
    sale: string;
    outOfStock: string;
    availableColors: string;
    availableSizes: string;
    addToWishlist: string;
    removeFromWishlist: string;
    rating: (value: number, max: number) => string;
  }
> = {
  ru: {
    new: 'Новинка',
    sale: 'Скидка',
    outOfStock: 'Нет в наличии',
    availableColors: 'Доступные цвета',
    availableSizes: 'Доступные размеры',
    addToWishlist: 'Добавить в избранное',
    removeFromWishlist: 'Убрать из избранного',
    rating: (value, max) => `Рейтинг ${value} из ${max}`,
  },
  kk: {
    new: 'Жаңа',
    sale: 'Жеңілдік',
    outOfStock: 'Қоймада жоқ',
    availableColors: 'Қолжетімді түстер',
    availableSizes: 'Қолжетімді өлшемдер',
    addToWishlist: 'Таңдаулыларға қосу',
    removeFromWishlist: 'Таңдаулылардан алып тастау',
    rating: (value, max) => `Рейтинг: ${value} / ${max}`,
  },
  en: {
    new: 'New',
    sale: 'Sale',
    outOfStock: 'Out of stock',
    availableColors: 'Available colors',
    availableSizes: 'Available sizes',
    addToWishlist: 'Add to wishlist',
    removeFromWishlist: 'Remove from wishlist',
    rating: (value, max) => `Rating ${value} out of ${max}`,
  },
};

export function ProductCard({
  className,
  locale = DEFAULT_LOCALE,
  onWishlistToggle,
  priority,
  product,
  showColors = true,
  showRating = true,
  showSizes = true,
  showWishlist = false,
  wishlistActive = false,
}: ProductCardProps) {
  const href = withLocale(locale, `/product/${product.slug}`);
  const isOutOfStock = product.inStock === false;
  const productName = getLocalizedField(product, 'name', locale);
  const copy = productCardCopy[locale];

  return (
    <article className={cn('group relative', isOutOfStock && 'opacity-75', className)}>
      <div className="relative">
        <ProductImage
          alt={productName}
          className={cn(isOutOfStock && 'grayscale')}
          href={href}
          priority={priority}
          src={product.mainImage}
        />
        <ProductBadges
          className="absolute left-3 top-3"
          discountPercent={product.discountPercent}
          inStock={product.inStock}
          isNew={product.isNew}
          isSale={product.isSale}
          labels={copy}
        />
        {showWishlist && onWishlistToggle ? (
          <button
            aria-label={wishlistActive ? copy.removeFromWishlist : copy.addToWishlist}
            className={cn(
              'sara-focus absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center border border-sara-beige-dark bg-sara-white/90 text-sara-graphite transition-colors hover:text-sara-bronze',
              wishlistActive && 'text-sara-bronze',
            )}
            disabled={!onWishlistToggle}
            onClick={() => onWishlistToggle?.(product)}
            type="button"
          >
            <Heart aria-hidden className={cn('h-5 w-5', wishlistActive && 'fill-current')} />
          </button>
        ) : null}
        {showWishlist && !onWishlistToggle ? (
          <WishlistToggleButton
            className="absolute right-3 top-3"
            isActive={wishlistActive || undefined}
            locale={locale}
            productId={product.id}
            size="sm"
          />
        ) : null}
      </div>

      <div className="mt-4 space-y-3">
        <div className="space-y-1">
          {product.categoryName ? (
            <p className="text-overline text-sara-bronze">
              {localizeBackendValue(product.categoryName, locale)}
            </p>
          ) : null}
          <Link
            className="sara-focus block font-fashion text-2xl leading-tight text-sara-black hover:text-sara-bronze"
            href={href}
          >
            {productName}
          </Link>
          {product.brandName ? (
            <p className="text-sm text-sara-graphite/55">{product.brandName}</p>
          ) : null}
        </div>

        <ProductPrice
          discountPercent={product.discountPercent}
          minPrice={product.minPrice}
          oldPrice={product.oldPrice}
          price={product.price}
        />

        {showRating ? (
          <ProductRating
            ariaLabel={copy.rating(product.averageRating ?? 0, 5)}
            averageRating={product.averageRating}
            reviewsCount={product.reviewsCount}
          />
        ) : null}

        <div className="flex flex-col gap-2">
          {showColors ? (
            <ProductColorDots
              ariaLabel={copy.availableColors}
              colors={product.availableColors?.map((color) => localizeBackendValue(color, locale))}
            />
          ) : null}
          {showSizes ? (
            <ProductSizePreview
              ariaLabel={copy.availableSizes}
              sizes={product.availableSizes?.map((size) => localizeBackendValue(size, locale))}
            />
          ) : null}
        </div>
      </div>
    </article>
  );
}
