'use client';

import { Heart, ShoppingBag, User } from 'lucide-react';
import Link from 'next/link';

import { NotificationHeaderBadge } from '@/features/notifications';
import { getCartItemsCount, useCartQuery } from '@/entities/cart';
import type { AppLocale } from '@/shared/config';
import { withLocale } from '@/shared/config';

import { headerDictionary } from '../lib/header.dictionary';
import type { HeaderNavItem } from '../model/types';
import { HeaderIconLink } from './header-icon-link';
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
  const dictionary = headerDictionary[locale];
  const cartQuery = useCartQuery();
  const currentCartCount = cartQuery.data ? getCartItemsCount(cartQuery.data) : cartCount;

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
            <SearchDrawer dictionary={dictionary} locale={locale} />
            <HeaderIconLink href={withLocale(locale, '/account/wishlist')} label={dictionary.wishlist}>
              <Heart aria-hidden className="h-5 w-5" />
            </HeaderIconLink>
            <HeaderIconLink href={withLocale(locale, '/account')} label={dictionary.account}>
              <User aria-hidden className="h-5 w-5" />
              <NotificationHeaderBadge />
            </HeaderIconLink>
            <HeaderIconLink
              badge={currentCartCount}
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
