import Link from 'next/link';
import { ShoppingBag, X } from 'lucide-react';

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
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href={withLocale(locale, '/catalog')}>{labels.continueShopping}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={withLocale(locale)}>
              <X aria-hidden className="h-4 w-4" />
              {locale === 'en' ? 'Close' : locale === 'kk' ? 'Жабу' : 'Закрыть'}
            </Link>
          </Button>
        </div>
      }
      description={labels.emptyDescription}
      icon={<ShoppingBag aria-hidden className="h-10 w-10" />}
      title={labels.emptyTitle}
    />
  );
}
