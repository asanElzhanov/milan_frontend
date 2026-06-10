import type { HeaderProps } from '../model/types';
import { getHeaderCategories } from '../api/categories';
import { HeaderClient } from './header-client';

export async function Header({ cartCount = 0, locale }: HeaderProps) {
  const navItems = await getHeaderCategories(locale);

  return <HeaderClient cartCount={cartCount} locale={locale} navItems={navItems} />;
}
