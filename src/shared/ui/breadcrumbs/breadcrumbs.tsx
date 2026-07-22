import Link from 'next/link';
import type { ReactNode } from 'react';

import { cn } from '@/shared/lib';

export type BreadcrumbItem = {
  label: ReactNode;
  href?: string;
};

export type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  className?: string;
  ariaLabel?: string;
};

export function Breadcrumbs({
  ariaLabel = 'Breadcrumbs',
  className,
  items,
  separator = '/',
}: BreadcrumbsProps) {
  return (
    <nav aria-label={ariaLabel} className={cn('text-caption', className)}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1 || !item.href;

          return (
            <li className="flex items-center gap-2" key={index}>
              {index > 0 ? <span className="text-sara-graphite/35">{separator}</span> : null}
              {isCurrent ? (
                <span aria-current="page" className="text-sara-graphite">
                  {item.label}
                </span>
              ) : (
                <Link className="luxury-link" href={item.href ?? '#'}>
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
