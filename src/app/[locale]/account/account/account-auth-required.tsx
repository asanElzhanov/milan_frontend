'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { getSafeCallbackUrl, withLocale, type AppLocale } from '@/shared/config';
import { Button, EmptyState } from '@/shared/ui';

import type { AccountDictionary } from './account.types';

export function AccountAuthRequired({
  labels,
  locale,
}: {
  labels: AccountDictionary;
  locale: AppLocale;
}) {
  const searchParams = useSearchParams();
  // Preserve an incoming callbackUrl (e.g. checkout for guests coming from the cart)
  // so sign-in returns the shopper to where they were, defaulting to the account page.
  const callbackUrl = encodeURIComponent(
    getSafeCallbackUrl(searchParams.get('callbackUrl'), withLocale(locale, '/account')),
  );

  return (
    <div className="mx-auto max-w-2xl">
      <EmptyState
        action={
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href={`${withLocale(locale, '/login')}?callbackUrl=${callbackUrl}`}>
                {labels.goToLogin}
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`${withLocale(locale, '/register')}?callbackUrl=${callbackUrl}`}>
                {labels.goToRegister}
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href={withLocale(locale, '/catalog')}>{labels.backToCatalog}</Link>
            </Button>
          </div>
        }
        description={labels.authRequiredDescription}
        title={labels.authRequiredTitle}
      />
    </div>
  );
}
