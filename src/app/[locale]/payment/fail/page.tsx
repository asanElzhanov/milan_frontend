import { notFound } from 'next/navigation';

import { isSupportedLocale, type AppLocale } from '@/shared/config';

import { PaymentPlaceholder } from '../payment-placeholder';

type PaymentStatusPageProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

export default async function PaymentFailPage({ params }: PaymentStatusPageProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const title = locale === 'kk' ? 'Төлем орындалмады' : 'Оплата не прошла';
  const description =
    locale === 'kk'
      ? 'Төлем провайдерінің қатесін өңдеу келесі кезеңде қосылады.'
      : 'Обработка ошибок платёжного провайдера будет подключена на следующем этапе.';

  return (
    <PaymentPlaceholder description={description} locale={locale as AppLocale} title={title} />
  );
}
