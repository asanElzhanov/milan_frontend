import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

import type { AppLocale } from '@/shared/config';
import { withLocale } from '@/shared/config';
import { Button, EmptyState } from '@/shared/ui';

import type { CartDictionary } from './cart.dictionary';

type CartEmptyStateProps = {
  labels: CartDictionary;
  locale: AppLocale;
};

export function CartEmptyState({ labels, locale }: CartEmptyStateProps) {
  return (
    <EmptyState
      action={
        <Button asChild>
          <Link href={withLocale(locale, '/catalog')}>{labels.continueShopping}</Link>
        </Button>
      }
      description={labels.emptyDescription}
      icon={<ShoppingBag aria-hidden className="h-10 w-10" />}
      title={labels.emptyTitle}
    />
  );
}
