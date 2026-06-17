import { notFound } from 'next/navigation';

import { isSupportedLocale, type AppLocale } from '@/shared/config';

import { PaymentPlaceholder } from '../payment-placeholder';

type PaymentOrderPageProps = Readonly<{
  params: Promise<{
    locale: string;
    orderNumber: string;
  }>;
}>;

export default async function PaymentOrderPage({ params }: PaymentOrderPageProps) {
  const { locale, orderNumber } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const title = locale === 'kk' ? 'Төлемге өту' : 'Переход к оплате';
  const description =
    locale === 'kk'
      ? `Тапсырыс ${orderNumber} жасалды. Төлем провайдері келесі кезеңде қосылады.`
      : `Заказ ${orderNumber} создан. Платёжный провайдер будет подключён на следующем этапе.`;

  return (
    <PaymentPlaceholder description={description} locale={locale as AppLocale} title={title} />
  );
}
