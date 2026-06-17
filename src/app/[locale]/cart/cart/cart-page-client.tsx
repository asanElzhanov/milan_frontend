'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  isCartEmpty,
  useCartQuery,
  useClearCartMutation,
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
} from '@/entities/cart';
import type { AppLocale } from '@/shared/config';
import { withLocale } from '@/shared/config';
import { Alert, Button, Container, SectionTitle } from '@/shared/ui';
import { CartSummary } from '@/widgets/cart-summary';

import { CartEmptyState } from './cart-empty-state';
import { CartErrorState } from './cart-error-state';
import { CartItemsList } from './cart-items-list';
import { CartPromoCode } from './cart-promo-code';
import type { CartDictionary } from './cart.dictionary';

type CartPageClientProps = {
  labels: CartDictionary;
  locale: AppLocale;
};

const clampQuantity = (quantity: number, availableStock?: number | null): number => {
  const minQuantity = Math.max(1, Math.round(Number.isFinite(quantity) ? quantity : 1));

  if (availableStock === null || availableStock === undefined) {
    return minQuantity;
  }

  return Math.min(minQuantity, Math.max(1, availableStock));
};

export function CartPageClient({ labels, locale }: CartPageClientProps) {
  const router = useRouter();
  const cartQuery = useCartQuery();
  const updateItemMutation = useUpdateCartItemMutation();
  const removeItemMutation = useRemoveCartItemMutation();
  const clearCartMutation = useClearCartMutation();
  const [pendingItemId, setPendingItemId] = useState<string | number | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const cart = cartQuery.data;

  const refreshAfterMutation = () => {
    // Header cart badge is server-rendered; refresh keeps it in sync until a global cart signal exists.
    router.refresh();
  };

  const handleQuantityChange = (itemId: string | number, quantity: number) => {
    const item = cart?.items.find((cartItem) => cartItem.id === itemId);

    if (!item) {
      return;
    }

    const nextQuantity = clampQuantity(
      quantity,
      item.availableStock ?? item.variant.availableStock,
    );

    if (nextQuantity === item.quantity) {
      return;
    }

    setActionError(null);
    setPendingItemId(itemId);
    updateItemMutation.mutate(
      { itemId, payload: { quantity: nextQuantity } },
      {
        onSuccess: refreshAfterMutation,
        onError: () => setActionError(labels.updateError),
        onSettled: () => setPendingItemId(null),
      },
    );
  };

  const handleRemove = (itemId: string | number) => {
    setActionError(null);
    setPendingItemId(itemId);
    removeItemMutation.mutate(itemId, {
      onSuccess: refreshAfterMutation,
      onError: () => setActionError(labels.removeError),
      onSettled: () => setPendingItemId(null),
    });
  };

  const handleClearCart = () => {
    if (!cart || isCartEmpty(cart) || !window.confirm(labels.clearConfirm)) {
      return;
    }

    setActionError(null);
    clearCartMutation.mutate(undefined, {
      onSuccess: refreshAfterMutation,
      onError: () => setActionError(labels.clearError),
    });
  };

  if (cartQuery.isLoading) {
    return (
      <Container className="sara-section">
        <SectionTitle eyebrow="Sara Milan" title={labels.loading} />
      </Container>
    );
  }

  if (cartQuery.isError) {
    return (
      <Container className="sara-section">
        <CartErrorState labels={labels} onRetry={() => void cartQuery.refetch()} />
      </Container>
    );
  }

  if (!cart || isCartEmpty(cart)) {
    return (
      <Container className="sara-section">
        <CartEmptyState labels={labels} locale={locale} />
      </Container>
    );
  }

  const isMutating =
    updateItemMutation.isPending || removeItemMutation.isPending || clearCartMutation.isPending;

  return (
    <Container className="sara-section">
      <SectionTitle
        action={
          <Button
            disabled={clearCartMutation.isPending}
            loading={clearCartMutation.isPending}
            onClick={handleClearCart}
            variant="outline"
          >
            {labels.clearCart}
          </Button>
        }
        description={labels.subtitle}
        eyebrow="Sara Milan"
        title={labels.title}
      />

      {actionError ? (
        <Alert className="mt-8" role="alert" title={actionError} variant="danger" />
      ) : null}

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <CartItemsList
          isUpdating={isMutating}
          items={cart.items}
          labels={labels}
          locale={locale}
          onQuantityChange={handleQuantityChange}
          onRemove={handleRemove}
          pendingItemId={pendingItemId}
        />
        <div className="space-y-5">
          <CartPromoCode
            cart={cart}
            labels={{
              applyPromo: labels.applyPromo,
              promoApplied: labels.promoApplied,
              promoApplyError: labels.promoApplyError,
              promoInvalid: labels.promoInvalid,
              promoPlaceholder: labels.promoPlaceholder,
              promoRemoveError: labels.promoRemoveError,
              promoTitle: labels.promoTitle,
              removePromo: labels.removePromo,
            }}
          />
          <CartSummary
            cart={cart}
            checkoutHref={withLocale(locale, '/checkout')}
            disabled={isMutating || isCartEmpty(cart)}
            labels={{
              discount: labels.discount,
              proceedToCheckout: labels.proceedToCheckout,
              promoCode: labels.promoCode,
              subtotal: labels.subtotal,
              summaryTitle: labels.summaryTitle,
              total: labels.total,
              totalAfterDiscount: labels.totalAfterDiscount,
            }}
            locale={locale}
          />
        </div>
      </div>
    </Container>
  );
}
