import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { isSupportedLocale, type AppLocale } from '@/shared/config';

import { AccountShell } from '../account/account-shell';
import { getOrdersDictionary } from './orders.dictionary';
import { OrdersPageClient } from './orders-page-client';

type AccountOrdersRouteProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: AccountOrdersRouteProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    return {};
  }

  return {
    title:
      locale === 'en'
        ? 'Orders — Sara Milan'
        : locale === 'kk'
          ? 'Тапсырыстар — Sara Milan'
          : 'Заказы — Sara Milan',
  };
}

export default async function AccountOrdersPage({ params }: AccountOrdersRouteProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return (
    <AccountShell activeKey="orders" locale={locale}>
      <OrdersPageClient
        labels={getOrdersDictionary(locale as AppLocale)}
        locale={locale as AppLocale}
      />
    </AccountShell>
  );
}
