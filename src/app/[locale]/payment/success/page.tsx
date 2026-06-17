import { notFound } from 'next/navigation';

import { isSupportedLocale, type AppLocale } from '@/shared/config';

import { PaymentPlaceholder } from '../payment-placeholder';

type PaymentStatusPageProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

export default async function PaymentSuccessPage({ params }: PaymentStatusPageProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const title = locale === 'kk' ? 'Төлем сәтті өтті' : 'Оплата прошла успешно';
  const description =
    locale === 'kk'
      ? 'Төлем статусының толық интеграциясы келесі кезеңде қосылады.'
      : 'Полная интеграция статуса оплаты будет подключена на следующем этапе.';

  return (
    <PaymentPlaceholder description={description} locale={locale as AppLocale} title={title} />
  );
}
