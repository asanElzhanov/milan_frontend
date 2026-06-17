import type { AppLocale } from '@/shared/config';
import { Container } from '@/shared/ui';

import { getAccountDictionary } from './account.dictionary';
import { AccountShellClient } from './account-shell-client';
import type { AccountNavItem } from './account.types';

export function AccountShell({
  activeKey,
  locale,
}: {
  locale: AppLocale;
  activeKey: AccountNavItem['key'];
}) {
  const labels = getAccountDictionary(locale);

  return (
    <main className="bg-sara-beige/35">
      <Container className="py-10 md:py-14">
        <div className="mb-8 max-w-3xl space-y-3">
          <p className="text-caption">{labels.profile}</p>
          <h1 className="font-serif text-4xl text-sara-graphite md:text-5xl">
            {labels.accountTitle}
          </h1>
          <p className="text-body text-sara-graphite/70">{labels.accountSubtitle}</p>
        </div>
        <AccountShellClient activeKey={activeKey} locale={locale} />
      </Container>
    </main>
  );
}
