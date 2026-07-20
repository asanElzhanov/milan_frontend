'use client';

import { Heart } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  isProductWishlisted,
  useToggleWishlistMutation,
  useWishlistQuery,
} from '@/entities/wishlist';
import { getAccessToken, getApiErrorMessage } from '@/shared/api';
import type { AppLocale } from '@/shared/config';
import { cn } from '@/shared/lib';
import { Alert, Button } from '@/shared/ui';

import { buildWishlistLoginHref } from '../lib/wishlist-auth';

export type WishlistToggleButtonProps = {
  productId: string | number;
  locale: AppLocale;
  isActive?: boolean;
  variant?: 'icon' | 'button';
  size?: 'sm' | 'md';
  className?: string;
  labels?: {
    add: string;
    remove: string;
    loginRequired: string;
    error: string;
  };
};

const defaultLabels: Record<AppLocale, Required<WishlistToggleButtonProps>['labels']> = {
  ru: {
    add: 'Добавить в избранное',
    remove: 'Удалить из избранного',
    loginRequired: 'Войдите, чтобы добавлять товары в избранное',
    error: 'Не удалось обновить избранное',
  },
  kk: {
    add: 'Таңдаулыларға қосу',
    remove: 'Таңдаулылардан жою',
    loginRequired: 'Тауарларды таңдаулыларға қосу үшін кіріңіз',
    error: 'Таңдаулыларды жаңарту мүмкін болмады',
  },
  en: {
    add: 'Add to wishlist',
    remove: 'Remove from wishlist',
    loginRequired: 'Sign in to add products to your wishlist',
    error: 'Unable to update your wishlist',
  },
};

export function WishlistToggleButton({
  className,
  isActive,
  labels,
  locale,
  productId,
  size = 'md',
  variant = 'icon',
}: WishlistToggleButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const copy = labels ?? defaultLabels[locale];
  const [error, setError] = useState<string | null>(null);
  const isAuthenticated = Boolean(getAccessToken());
  const wishlistQuery = useWishlistQuery({ enabled: isAuthenticated && isActive === undefined });
  const toggleMutation = useToggleWishlistMutation();
  const active = isActive ?? isProductWishlisted(wishlistQuery.data, productId);
  const ariaLabel = active ? copy.remove : copy.add;

  const handleClick = () => {
    setError(null);

    if (!isAuthenticated) {
      router.push(buildWishlistLoginHref(locale, pathname || `/${locale}`));
      return;
    }

    toggleMutation.mutate(productId, {
      onError: (mutationError) => {
        setError(getApiErrorMessage(mutationError) || copy.error);
      },
    });
  };

  if (variant === 'button') {
    return (
      <div className={className}>
        <Button
          loading={toggleMutation.isPending}
          onClick={handleClick}
          type="button"
          variant="outline"
        >
          <Heart aria-hidden className={cn('h-4 w-4', active && 'fill-current text-sara-bronze')} />
          {ariaLabel}
        </Button>
        {error ? <Alert className="mt-3" title={error} variant="danger" /> : null}
      </div>
    );
  }

  return (
    <div className={className}>
      <button
        aria-label={ariaLabel}
        className={cn(
          'sara-focus inline-flex items-center justify-center border border-sara-beige-dark bg-sara-white text-sara-graphite transition-colors hover:text-sara-bronze disabled:opacity-45',
          size === 'sm' ? 'h-9 w-9' : 'h-11 w-11',
          active && 'text-sara-bronze',
        )}
        disabled={toggleMutation.isPending}
        onClick={handleClick}
        type="button"
      >
        <Heart aria-hidden className={cn('h-5 w-5', active && 'fill-current')} />
      </button>
      {error ? <Alert className="mt-3" title={error} variant="danger" /> : null}
    </div>
  );
}
