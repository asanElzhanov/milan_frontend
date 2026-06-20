import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { isSupportedLocale, type AppLocale } from '@/shared/config';

import { getPaymentDictionary } from '../payment.dictionary';
import { PaymentPageClient } from './payment-page-client';

type PaymentOrderPageProps = Readonly<{
  params: Promise<{
    locale: string;
    orderNumber: string;
  }>;
}>;

export async function generateMetadata({ params }: PaymentOrderPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    return {};
  }

  return {
    title: locale === 'kk' ? 'Тапсырысты төлеу — Sara Milan' : 'Оплата заказа — Sara Milan',
  };
}

export default async function PaymentOrderPage({ params }: PaymentOrderPageProps) {
  const { locale, orderNumber } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return (
    <PaymentPageClient
      labels={getPaymentDictionary(locale as AppLocale)}
      locale={locale as AppLocale}
      orderNumber={decodeURIComponent(orderNumber)}
    />
  );
}
