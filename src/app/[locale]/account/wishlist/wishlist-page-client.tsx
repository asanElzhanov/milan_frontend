'use client';

import Link from 'next/link';
import { useState } from 'react';

import type { ProductListItem } from '@/entities/product';
import { useToggleWishlistMutation, useWishlistQuery } from '@/entities/wishlist';
import { getApiErrorMessage } from '@/shared/api';
import { withLocale, type AppLocale } from '@/shared/config';
import { Alert, Button, EmptyState, ErrorState, Skeleton } from '@/shared/ui';
import { ProductGrid } from '@/widgets/product-grid';

import { getWishlistPageDictionary } from './wishlist.dictionary';

function WishlistLoadingState() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-24" />
      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-96" />
        <Skeleton className="h-96" />
      </div>
    </div>
  );
}

export function WishlistPageClient({ locale }: { locale: AppLocale }) {
  const labels = getWishlistPageDictionary(locale);
  const wishlistQuery = useWishlistQuery({ enabled: true });
  const toggleMutation = useToggleWishlistMutation();
  const [error, setError] = useState<string | null>(null);

  if (wishlistQuery.isLoading) {
    return <WishlistLoadingState />;
  }

  if (wishlistQuery.isError) {
    return (
      <ErrorState
        action={
          <Button onClick={() => void wishlistQuery.refetch()} type="button">
            {labels.title}
          </Button>
        }
        description={getApiErrorMessage(wishlistQuery.error) || labels.loadError}
        title={labels.loadError}
      />
    );
  }

  const wishlist = wishlistQuery.data;
  const products = wishlist?.items.map((item) => item.product) ?? [];

  const handleWishlistToggle = (product: ProductListItem) => {
    setError(null);
    toggleMutation.mutate(product.id, {
      onError: (mutationError) => setError(getApiErrorMessage(mutationError) || labels.toggleError),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 border border-sara-beige-dark bg-sara-white p-5 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <p className="text-caption">{labels.title}</p>
          <h2 className="font-serif text-3xl text-sara-graphite">{labels.title}</h2>
          <p className="text-sm leading-6 text-sara-graphite/65">{labels.subtitle}</p>
        </div>
        <Button asChild variant="outline">
          <Link href={withLocale(locale, '/catalog')}>{labels.goToCatalog}</Link>
        </Button>
      </div>

      {error ? <Alert title={error} variant="danger" /> : null}

      {products.length > 0 ? (
        <ProductGrid
          columns={{ lg: 3, md: 2, sm: 2 }}
          locale={locale}
          onWishlistToggle={handleWishlistToggle}
          products={products}
          showWishlist
          wishlistIds={wishlist?.productIds ?? []}
        />
      ) : (
        <EmptyState
          action={
            <Button asChild>
              <Link href={withLocale(locale, '/catalog')}>{labels.goToCatalog}</Link>
            </Button>
          }
          description={labels.emptyDescription}
          title={labels.emptyTitle}
        />
      )}
    </div>
  );
}
