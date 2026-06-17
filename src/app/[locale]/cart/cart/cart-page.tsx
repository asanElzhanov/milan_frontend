import type { AppLocale } from '@/shared/config';

import { CartPageClient } from './cart-page-client';
import { getCartDictionary } from './cart.dictionary';

export function CartPage({ locale }: { locale: AppLocale }) {
  return <CartPageClient labels={getCartDictionary(locale)} locale={locale} />;
}
