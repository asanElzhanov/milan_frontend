import Link from 'next/link';

import type { AppLocale } from '@/shared/config';
import { cn } from '@/shared/lib';

import { AccountLogoutButton } from './account-logout-button';
import type { AccountDictionary, AccountNavItem } from './account.types';

export function AccountSidebar({
  activeKey,
  items,
  labels,
  locale,
}: {
  activeKey: AccountNavItem['key'];
  items: AccountNavItem[];
  labels: AccountDictionary;
  locale: AppLocale;
}) {
  return (
    <aside className="hidden border border-sara-beige-dark bg-sara-white p-5 lg:block">
      <nav className="space-y-1" aria-label={labels.accountTitle}>
        {items.map((item) => (
          <Link
            className={cn(
              'sara-focus flex px-3 py-2 text-sm font-medium text-sara-graphite/70 transition-colors hover:bg-sara-beige hover:text-sara-graphite',
              item.key === activeKey &&
                'bg-sara-graphite text-sara-white hover:bg-sara-graphite hover:text-sara-white',
            )}
            href={item.href}
            key={item.key}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-6 border-t border-sara-beige-dark pt-4">
        <AccountLogoutButton label={labels.logout} locale={locale} />
      </div>
    </aside>
  );
}
