import Link from 'next/link';
import type { ReactNode } from 'react';

import { cn } from '@/shared/lib';

export type HeaderIconLinkProps = {
  href: string;
  label: string;
  children: ReactNode;
  badge?: number;
  className?: string;
};

export function HeaderIconLink({ badge, children, className, href, label }: HeaderIconLinkProps) {
  return (
    <Link
      aria-label={label}
      className={cn(
        'sara-focus relative inline-flex h-10 w-10 items-center justify-center text-sara-graphite hover:text-sara-bronze',
        className,
      )}
      href={href}
    >
      {children}
      {badge !== undefined && badge > 0 ? (
        <span className="absolute top-0 right-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-sara-bronze px-1 text-[10px] font-medium text-sara-white">
          {badge}
        </span>
      ) : null}
    </Link>
  );
}
