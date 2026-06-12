'use client';

import { ProductCard } from '@/entities/product';
import { DEFAULT_LOCALE } from '@/shared/config';
import { cn } from '@/shared/lib';
import { EmptyState, ErrorState } from '@/shared/ui';

import type { ProductGridProps } from '../model/types';
import { ProductGridSkeleton } from './product-grid-skeleton';

const smColumns = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
};

const mdColumns = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
};

const lgColumns = {
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
};

const getGridColumns = (columns: ProductGridProps['columns']) =>
  cn(smColumns[columns?.sm ?? 2], mdColumns[columns?.md ?? 3], lgColumns[columns?.lg ?? 4]);

export function ProductGrid({
  className,
  columns,
  emptyDescription = 'Товары появятся здесь после подключения каталога.',
  emptyTitle = 'Товары не найдены',
  error,
  isLoading = false,
  locale = DEFAULT_LOCALE,
  onWishlistToggle,
  products,
  showColors = true,
  showRating = true,
  showSizes = true,
  showWishlist = false,
  wishlistIds = [],
}: ProductGridProps) {
  if (isLoading) {
    return <ProductGridSkeleton className={className} />;
  }

  if (error) {
    return (
      <ErrorState
        className={className}
        title="Не удалось загрузить товары"
        description="Попробуйте обновить страницу или изменить параметры каталога."
      />
    );
  }

  if (products.length === 0) {
    return <EmptyState className={className} title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className={cn('grid gap-x-6 gap-y-10', getGridColumns(columns), className)}>
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          locale={locale}
          onWishlistToggle={onWishlistToggle}
          priority={index < 4}
          product={product}
          showColors={showColors}
          showRating={showRating}
          showSizes={showSizes}
          showWishlist={showWishlist}
          wishlistActive={wishlistIds.includes(product.id)}
        />
      ))}
    </div>
  );
}
