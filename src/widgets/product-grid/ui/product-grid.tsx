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

const gridCopy = {
  ru: {
    emptyTitle: 'Товары не найдены',
    emptyDescription: 'По вашему запросу товаров нет.',
    errorTitle: 'Не удалось загрузить товары',
    errorDescription: 'Попробуйте обновить страницу или изменить параметры каталога.',
  },
  kk: {
    emptyTitle: 'Тауарлар табылмады',
    emptyDescription: 'Сұрауыңыз бойынша тауар табылмады.',
    errorTitle: 'Тауарларды жүктеу мүмкін болмады',
    errorDescription: 'Бетті жаңартып немесе каталог параметрлерін өзгертіп көріңіз.',
  },
  en: {
    emptyTitle: 'No products found',
    emptyDescription: 'No products match your request.',
    errorTitle: 'Unable to load products',
    errorDescription: 'Try refreshing the page or changing the catalog filters.',
  },
} as const;

export function ProductGrid({
  className,
  columns,
  emptyDescription,
  emptyTitle,
  error,
  isLoading = false,
  locale = DEFAULT_LOCALE,
  onWishlistToggle,
  products,
  showColors = true,
  showRating = true,
  showSizes = true,
  showWishlist = true,
  wishlistIds = [],
}: ProductGridProps) {
  const copy = gridCopy[locale];
  if (isLoading) {
    return <ProductGridSkeleton className={className} />;
  }

  if (error) {
    return (
      <ErrorState
        className={className}
        title={copy.errorTitle}
        description={copy.errorDescription}
      />
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        className={className}
        title={emptyTitle ?? copy.emptyTitle}
        description={emptyDescription ?? copy.emptyDescription}
      />
    );
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
