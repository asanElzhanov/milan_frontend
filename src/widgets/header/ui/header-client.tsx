'use client';

import { Heart, ShoppingBag, User } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

import { NotificationHeaderBadge } from '@/features/notifications';
import type { AppLocale } from '@/shared/config';
import { env, withLocale } from '@/shared/config';

import { headerDictionary } from '../lib/header.dictionary';
import type { HeaderNavItem } from '../model/types';
import { HeaderIconLink } from './header-icon-link';
import { LanguageSwitcher } from './language-switcher';
import { MobileMenu } from './mobile-menu';
import { SearchDrawer } from './search-drawer';

export function HeaderClient({
  cartCount = 0,
  locale,
  navItems,
}: {
  locale: AppLocale;
  navItems: HeaderNavItem[];
  cartCount?: number;
}) {
  const showWishlist = env.features.wishlist;
  const dictionary = headerDictionary[locale];

  return (
    <>
      <div className="bg-sara-bronze px-5 py-2 text-center text-xs font-medium uppercase tracking-[0.18em] text-sara-white">
        {dictionary.announcement}
      </div>
      <header className="sticky top-0 z-40 border-b border-sara-beige-dark/60 bg-sara-beige/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-[80px]">
          <div className="flex flex-1 items-center gap-3">
            <MobileMenu
              dictionary={dictionary}
              locale={locale}
              navItems={navItems}
              showWishlist={showWishlist}
            />
            <nav className="hidden items-center gap-7 lg:flex">
              {navItems.map((item) => (
                <Link
                  className="uppercase-nav sara-focus text-sara-graphite hover:text-sara-bronze"
                  href={item.href}
                  key={item.id}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <Link
            className="sara-focus inline-flex items-center justify-center"
            href={withLocale(locale)}
          >
            <img
              alt="Sara Milan"
              className="h-10 w-[180px] object-contain md:h-12 md:w-[220px]"
              src="/images/saramilan-logo.svg"
            />
          </Link>

          <div className="flex flex-1 items-center justify-end gap-1 md:gap-3">
            <div className="hidden md:block">
              <Suspense fallback={null}>
                <LanguageSwitcher locale={locale} />
              </Suspense>
            </div>
            <SearchDrawer dictionary={dictionary} locale={locale} />
            {showWishlist ? (
              <HeaderIconLink
                href={withLocale(locale, '/account/wishlist')}
                label={dictionary.wishlist}
              >
                <Heart aria-hidden className="h-5 w-5" />
              </HeaderIconLink>
            ) : null}
            <HeaderIconLink href={withLocale(locale, '/account')} label={dictionary.account}>
              <User aria-hidden className="h-5 w-5" />
              <NotificationHeaderBadge />
            </HeaderIconLink>
            <HeaderIconLink
              badge={cartCount}
              href={withLocale(locale, '/cart')}
              label={dictionary.cart}
            >
              <ShoppingBag aria-hidden className="h-5 w-5" />
            </HeaderIconLink>
          </div>
        </div>
      </header>
    </>
  );
}
