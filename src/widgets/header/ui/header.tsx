import { getHeaderCartSummary } from '../api/cart';
import { getHeaderCategories } from '../api/categories';
import type { HeaderProps } from '../model/types';
import { HeaderClient } from './header-client';

export async function Header({ locale }: HeaderProps) {
  const [navItems, cartSummary] = await Promise.all([
    getHeaderCategories(locale),
    getHeaderCartSummary(),
  ]);

  return <HeaderClient cartCount={cartSummary.count} locale={locale} navItems={navItems} />;
}
