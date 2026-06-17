import Link from 'next/link';

import { withLocale, type AppLocale } from '@/shared/config';
import { Button, EmptyState } from '@/shared/ui';

import type { AccountDictionary } from './account.types';

export function AccountAuthRequired({
  labels,
  locale,
}: {
  labels: AccountDictionary;
  locale: AppLocale;
}) {
  const callbackUrl = encodeURIComponent(withLocale(locale, '/account'));

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
              <Link href={withLocale(locale, '/register')}>{labels.goToRegister}</Link>
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
