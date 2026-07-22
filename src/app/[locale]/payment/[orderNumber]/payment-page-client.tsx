'use client';

import { CreditCard, ExternalLink, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import {
  getPaymentRedirectUrl,
  isPaymentFailed,
  isPaymentPaid,
  isPaymentPending,
  isSafeExternalPaymentUrl,
  usePaymentStatusQuery,
  useStartPaymentMutation,
} from '@/entities/payment';
import { getApiErrorMessage } from '@/shared/api';
import { type AppLocale, localizedRoutes } from '@/shared/config';
import { Alert, Badge, Button, Container, SectionTitle } from '@/shared/ui';

import { PaymentResultCard } from '../payment-result-card';
import type { PaymentDictionary } from '../payment.dictionary';

type PaymentPageClientProps = {
  labels: PaymentDictionary;
  locale: AppLocale;
  orderNumber: string;
};

export function PaymentPageClient({ labels, locale, orderNumber }: PaymentPageClientProps) {
  const startPaymentMutation = useStartPaymentMutation();
  const [notice, setNotice] = useState<string | null>(null);
  const statusQuery = usePaymentStatusQuery(orderNumber, {
    refetchInterval: 5000,
  });

  const statusResult = statusQuery.data ?? null;
  const statusLabel = statusResult?.paymentStatus ?? statusResult?.status ?? 'pending';
  const resultCardStatus = useMemo(() => {
    if (isPaymentPaid(statusLabel)) {
      return 'success';
    }

    if (isPaymentFailed(statusLabel)) {
      return 'fail';
    }

    if (isPaymentPending(statusLabel)) {
      return 'pending';
    }

    return 'info';
  }, [statusLabel]);

  const isPaid = resultCardStatus === 'success';

  const handleStartPayment = async () => {
    setNotice(null);

    try {
      const session = await startPaymentMutation.mutateAsync({
        order_number: orderNumber,
        locale,
        provider: 'freedom',
      });
      const redirectUrl = getPaymentRedirectUrl(session);

      if (redirectUrl && isSafeExternalPaymentUrl(redirectUrl)) {
        window.location.assign(redirectUrl);
        return;
      }

      setNotice(labels.noRedirectDescription);
    } catch (error) {
      setNotice(`${labels.startPaymentError}: ${getApiErrorMessage(error)}`);
    }
  };

  const cardTitle = isPaid
    ? labels.successTitle
    : resultCardStatus === 'fail'
      ? labels.failTitle
      : labels.pendingTitle;
  const cardDescription = isPaid
    ? labels.successDescription
    : resultCardStatus === 'fail'
      ? labels.failDescription
      : labels.pendingDescription;

  return (
    <Container className="sara-section">
      <SectionTitle eyebrow="Sara Milan" title={labels.title} description={labels.subtitle} />

      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-5">
          <PaymentResultCard
            status={resultCardStatus}
            title={cardTitle}
            description={cardDescription}
            actions={
              <>
                <Button asChild variant="outline">
                  <Link href={localizedRoutes.cart(locale)}>{labels.backToCart}</Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link href={localizedRoutes.catalog(locale)}>{labels.backToCatalog}</Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link href={localizedRoutes.accountOrders(locale)}>{labels.goToOrders}</Link>
                </Button>
              </>
            }
          />

          <section className="border border-sara-beige-dark bg-sara-white p-6 shadow-soft">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-overline text-sara-bronze">{labels.order}</p>
                <p className="mt-2 font-medium text-sara-black">{orderNumber}</p>
              </div>
              <div>
                <p className="text-overline text-sara-bronze">{labels.status}</p>
                <Badge className="mt-2" variant={resultCardStatus === 'fail' ? 'danger' : 'muted'}>
                  {statusLabel}
                </Badge>
              </div>
            </div>
          </section>

          {notice ? (
            <Alert role="alert" title={labels.startPaymentError} variant="warning">
              {notice}
            </Alert>
          ) : null}
        </div>

        <aside className="space-y-4 border border-sara-beige-dark bg-sara-white p-6 shadow-soft">
          <div>
            <p className="text-overline text-sara-bronze">{labels.provider}</p>
            <h2 className="mt-2 font-fashion text-2xl text-sara-black">{labels.continuePayment}</h2>
          </div>

          {isPaid ? (
            <Alert variant="success">{labels.successDescription}</Alert>
          ) : (
            <Button
              className="justify-between"
              disabled={startPaymentMutation.isPending}
              fullWidth
              loading={startPaymentMutation.isPending}
              onClick={() => void handleStartPayment()}
              variant="primary"
            >
              <span className="inline-flex items-center gap-2">
                <CreditCard aria-hidden className="h-4 w-4" />
                {labels.payOnline}
              </span>
              <ExternalLink aria-hidden className="h-4 w-4" />
            </Button>
          )}

          <Button
            disabled={statusQuery.isFetching}
            fullWidth
            onClick={() => void statusQuery.refetch()}
            variant="ghost"
          >
            <RefreshCw aria-hidden className="h-4 w-4" />
            {labels.checkStatus}
          </Button>
        </aside>
      </div>
    </Container>
  );
}
