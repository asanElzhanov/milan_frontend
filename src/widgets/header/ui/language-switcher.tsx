'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { replaceLocale, SUPPORTED_LOCALES, type AppLocale } from '@/shared/config';
import { cn } from '@/shared/lib';

export function LanguageSwitcher({
  locale,
  variant = 'header',
}: {
  locale: AppLocale;
  variant?: 'header' | 'footer';
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const fullPathname = query ? `${pathname}?${query}` : pathname;
  const languageLabel =
    locale === 'ru' ? 'Выбор языка' : locale === 'kk' ? 'Тілді таңдау' : 'Choose language';

  return (
    <div className="flex items-center gap-1" aria-label={languageLabel}>
      {SUPPORTED_LOCALES.map((item) => (
        <Link
          className={cn(
            'sara-focus px-2 py-1 text-xs font-medium uppercase tracking-[0.16em]',
            variant === 'footer'
              ? item === locale
                ? 'text-sara-white'
                : 'text-sara-beige/55 hover:text-sara-white'
              : item === locale
                ? 'text-sara-bronze'
                : 'text-sara-graphite/55 hover:text-sara-graphite',
          )}
          href={replaceLocale(fullPathname, item)}
          key={item}
        >
          {item}
        </Link>
      ))}
    </div>
  );
}
