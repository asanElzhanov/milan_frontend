import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { isSupportedLocale, localizedRoutes, type AppLocale } from '@/shared/config';
import { Button, Container, SectionTitle } from '@/shared/ui';

import { PaymentResultCard } from '../payment-result-card';
import { getPaymentDictionary } from '../payment.dictionary';

type PaymentStatusPageProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: PaymentStatusPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    return {};
  }

  return {
    title:
      locale === 'en'
        ? 'Payment failed — Sara Milan'
        : locale === 'kk'
          ? 'Төлем орындалмады — Sara Milan'
          : 'Оплата не прошла — Sara Milan',
  };
}

export default async function PaymentFailPage({ params }: PaymentStatusPageProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const appLocale = locale as AppLocale;
  const labels = getPaymentDictionary(appLocale);

  return (
    <Container className="sara-section">
      <SectionTitle eyebrow="Sara Milan" title={labels.failTitle} />
      <div className="mt-10 max-w-3xl">
        <PaymentResultCard
          title={labels.failTitle}
          description={labels.failDescription}
          status="fail"
          actions={
            <>
              <Button asChild>
                <Link href={localizedRoutes.cart(appLocale)}>{labels.backToCart}</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={localizedRoutes.catalog(appLocale)}>{labels.backToCatalog}</Link>
              </Button>
            </>
          }
        />
      </div>
    </Container>
  );
}
