import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { isSupportedLocale, type AppLocale } from '@/shared/config';

import { CartPage } from './cart/cart-page';
import { getCartDictionary } from './cart/cart.dictionary';

type CartRouteProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: CartRouteProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return {
    title: getCartDictionary(locale).metadataTitle,
  };
}

export default async function CartRoute({ params }: CartRouteProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return <CartPage locale={locale as AppLocale} />;
}
