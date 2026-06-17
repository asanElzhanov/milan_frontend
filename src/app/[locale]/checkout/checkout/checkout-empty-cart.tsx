import Link from 'next/link';

import { type AppLocale, localizedRoutes } from '@/shared/config';
import { Button, EmptyState } from '@/shared/ui';

import type { CheckoutDictionary } from './checkout.dictionary';

type CheckoutEmptyCartProps = {
  labels: CheckoutDictionary;
  locale: AppLocale;
};

export function CheckoutEmptyCart({ labels, locale }: CheckoutEmptyCartProps) {
  return (
    <EmptyState
      title={labels.emptyCartTitle}
      description={labels.emptyCartDescription}
      action={
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="outline">
            <Link href={localizedRoutes.cart(locale)}>{labels.backToCart}</Link>
          </Button>
          <Button asChild>
            <Link href={localizedRoutes.catalog(locale)}>{labels.continueShopping}</Link>
          </Button>
        </div>
      }
    />
  );
}
