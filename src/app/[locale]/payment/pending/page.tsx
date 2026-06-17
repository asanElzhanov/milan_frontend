import { notFound } from 'next/navigation';

import { isSupportedLocale, type AppLocale } from '@/shared/config';

import { PaymentPlaceholder } from '../payment-placeholder';

type PaymentStatusPageProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

export default async function PaymentPendingPage({ params }: PaymentStatusPageProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const title = locale === 'kk' ? 'Төлемге өту' : 'Переход к оплате';
  const description =
    locale === 'kk'
      ? 'Тапсырыс жасалды. Төлем экраны келесі кезеңде қосылады.'
      : 'Заказ создан. Экран оплаты будет подключён на следующем этапе.';

  return (
    <PaymentPlaceholder description={description} locale={locale as AppLocale} title={title} />
  );
}
