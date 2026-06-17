import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { isSupportedLocale, type AppLocale } from '@/shared/config';

import { CheckoutPageClient } from './checkout/checkout-page-client';
import { getCheckoutDictionary } from './checkout/checkout.dictionary';

type CheckoutRouteProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: CheckoutRouteProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return {
    title: getCheckoutDictionary(locale).metadataTitle,
  };
}

export default async function CheckoutPage({ params }: CheckoutRouteProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const appLocale = locale as AppLocale;

  return <CheckoutPageClient labels={getCheckoutDictionary(appLocale)} locale={appLocale} />;
}
