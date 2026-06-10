'use client';

import { Menu, Search, ShoppingBag, User } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import type { AppLocale } from '@/shared/config';
import { withLocale } from '@/shared/lib';
import { Drawer, DrawerContent, DrawerTrigger } from '@/shared/ui';

import type { HeaderNavItem } from '../model/types';
import { LanguageSwitcher } from './language-switcher';

export function MobileMenu({ locale, navItems }: { locale: AppLocale; navItems: HeaderNavItem[] }) {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <Drawer onOpenChange={setOpen} open={open}>
      <DrawerTrigger asChild>
        <button
          aria-label="Открыть меню"
          className="sara-focus inline-flex h-10 w-10 items-center justify-center text-sara-graphite lg:hidden"
          type="button"
        >
          <Menu aria-hidden className="h-6 w-6" />
        </button>
      </DrawerTrigger>
      <DrawerContent side="left">
        <div className="space-y-8 pr-8">
          <div>
            <p className="text-overline text-sara-bronze">Меню</p>
            <Link
              className="mt-2 block font-fashion text-3xl tracking-[0.12em] text-sara-black"
              href={withLocale(locale)}
              onClick={close}
            >
              SARA MILAN
            </Link>
          </div>
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                className="uppercase-nav sara-focus text-sara-graphite hover:text-sara-bronze"
                href={item.href}
                key={item.href}
                onClick={close}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="grid gap-3 border-t border-sara-beige-dark pt-6">
            <Link
              className="flex items-center gap-3 text-sm text-sara-graphite"
              href={withLocale(locale, '/catalog')}
              onClick={close}
            >
              <Search aria-hidden className="h-4 w-4" />
              Поиск и каталог
            </Link>
            <Link
              className="flex items-center gap-3 text-sm text-sara-graphite"
              href={withLocale(locale, '/login')}
              onClick={close}
            >
              <User aria-hidden className="h-4 w-4" />
              Профиль
            </Link>
            <Link
              className="flex items-center gap-3 text-sm text-sara-graphite"
              href={withLocale(locale, '/cart')}
              onClick={close}
            >
              <ShoppingBag aria-hidden className="h-4 w-4" />
              Корзина
            </Link>
          </div>
          <LanguageSwitcher locale={locale} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
