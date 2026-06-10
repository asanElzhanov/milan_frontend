'use client';

import { Heart, ShoppingBag, User } from 'lucide-react';
import Link from 'next/link';

import type { AppLocale } from '@/shared/config';
import { env } from '@/shared/config';
import { withLocale } from '@/shared/lib';

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

  return (
    <>
      <div className="bg-sara-bronze px-5 py-2 text-center text-xs font-medium uppercase tracking-[0.18em] text-sara-white">
        Бесплатная доставка по Казахстану от 50 000 ₸
      </div>
      <header className="sticky top-0 z-40 border-b border-sara-beige-dark/60 bg-sara-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-[80px]">
          <div className="flex flex-1 items-center gap-3">
            <MobileMenu locale={locale} navItems={navItems} />
            <nav className="hidden items-center gap-7 lg:flex">
              {navItems.map((item) => (
                <Link
                  className="uppercase-nav sara-focus text-sara-graphite hover:text-sara-bronze"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <Link
            className="sara-focus font-fashion text-2xl tracking-[0.18em] text-sara-black md:text-3xl"
            href={withLocale(locale)}
          >
            SARA MILAN
          </Link>

          <div className="flex flex-1 items-center justify-end gap-1 md:gap-3">
            <div className="hidden md:block">
              <LanguageSwitcher locale={locale} />
            </div>
            <SearchDrawer locale={locale} />
            {showWishlist ? (
              <HeaderIconLink href={withLocale(locale, '/account/wishlist')} label="Избранное">
                <Heart aria-hidden className="h-5 w-5" />
              </HeaderIconLink>
            ) : null}
            <HeaderIconLink href={withLocale(locale, '/login')} label="Профиль">
              <User aria-hidden className="h-5 w-5" />
            </HeaderIconLink>
            {/* TODO: cart count will be connected in Prompt 18-20. */}
            <HeaderIconLink badge={cartCount} href={withLocale(locale, '/cart')} label="Корзина">
              <ShoppingBag aria-hidden className="h-5 w-5" />
            </HeaderIconLink>
          </div>
        </div>
      </header>
    </>
  );
}
