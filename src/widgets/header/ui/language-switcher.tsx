'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SUPPORTED_LOCALES, type AppLocale } from '@/shared/config';
import { cn, replaceLocale } from '@/shared/lib';

export function LanguageSwitcher({ locale }: { locale: AppLocale }) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1" aria-label="Выбор языка">
      {SUPPORTED_LOCALES.map((item) => (
        <Link
          className={cn(
            'sara-focus px-2 py-1 text-xs font-medium uppercase tracking-[0.16em]',
            item === locale ? 'text-sara-bronze' : 'text-sara-graphite/55 hover:text-sara-graphite',
          )}
          href={replaceLocale(pathname, item)}
          key={item}
        >
          {item}
        </Link>
      ))}
    </div>
  );
}
