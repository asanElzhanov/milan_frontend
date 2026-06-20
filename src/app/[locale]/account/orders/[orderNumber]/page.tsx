import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { isSupportedLocale, type AppLocale } from '@/shared/config';

import { AccountShell } from '../../account/account-shell';
import { getOrdersDictionary } from '../orders.dictionary';
import { OrderDetailPageClient } from './order-detail-page-client';

type AccountOrderDetailRouteProps = Readonly<{
  params: Promise<{
    locale: string;
    orderNumber: string;
  }>;
}>;

export async function generateMetadata({
  params,
}: AccountOrderDetailRouteProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    return {};
  }

  return {
    title: locale === 'kk' ? 'Тапсырыс мәліметтері — Sara Milan' : 'Детали заказа — Sara Milan',
  };
}

export default async function AccountOrderDetailPage({ params }: AccountOrderDetailRouteProps) {
  const { locale, orderNumber } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return (
    <AccountShell activeKey="orders" locale={locale}>
      <OrderDetailPageClient
        labels={getOrdersDictionary(locale as AppLocale)}
        locale={locale as AppLocale}
        orderNumber={decodeURIComponent(orderNumber)}
      />
    </AccountShell>
  );
}
