import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { isSupportedLocale, localizedRoutes, type AppLocale } from '@/shared/config';
import { Button, Container, EmptyState, SectionTitle } from '@/shared/ui';

type CheckoutRouteProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

export const metadata: Metadata = {
  title: 'Checkout | Sara Milan',
};

export default async function CheckoutPage({ params }: CheckoutRouteProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const appLocale = locale as AppLocale;

  return (
    <Container className="sara-section">
      <div className="mx-auto max-w-3xl">
        <SectionTitle
          eyebrow="Sara Milan"
          title="Checkout"
          description="Checkout page will be implemented next. The API foundation is ready for delivery methods, saved addresses, manual addresses, and order creation."
        />
        <EmptyState
          className="mt-10"
          title="Checkout UI is pending"
          description="Return to the cart while the checkout form and payment flow are connected."
          action={
            <Button asChild>
              <Link href={localizedRoutes.cart(appLocale)}>Back to cart</Link>
            </Button>
          }
        />
      </div>
    </Container>
  );
}
