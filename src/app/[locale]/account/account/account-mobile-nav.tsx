import Link from 'next/link';

import { cn } from '@/shared/lib';

import type { AccountNavItem } from './account.types';

export function AccountMobileNav({
  activeKey,
  items,
  label,
}: {
  activeKey: AccountNavItem['key'];
  items: AccountNavItem[];
  label: string;
}) {
  return (
    <nav aria-label={label} className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:hidden">
      {items.map((item) => (
        <Link
          className={cn(
            'sara-focus shrink-0 border border-sara-beige-dark bg-sara-white px-4 py-2 text-xs font-medium tracking-[0.12em] text-sara-graphite/70 uppercase',
            item.key === activeKey && 'border-sara-graphite bg-sara-graphite !text-sara-white',
          )}
          href={item.href}
          key={item.key}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
