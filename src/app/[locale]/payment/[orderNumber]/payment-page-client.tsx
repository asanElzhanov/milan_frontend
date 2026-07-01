'use client';

import { CreditCard, ExternalLink, Landmark, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import {
  getPaymentRedirectUrl,
  isPaymentFailed,
  isPaymentPaid,
  isPaymentPending,
  isRelativePaymentUrl,
  isSafeExternalPaymentUrl,
  paymentEndpointConfig,
  usePaymentStatusQuery,
  useStartPaymentMutation,
  type PaymentProvider,
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

const isPaymentStatusEndpointConfigured = Boolean(paymentEndpointConfig.status);
const paymentProviders: Array<{
  provider: PaymentProvider;
  labelKey: 'payWithKaspi' | 'payWithCard';
  icon: typeof Landmark;
}> = [
  { provider: 'kaspi', labelKey: 'payWithKaspi', icon: Landmark },
  { provider: 'stripe', labelKey: 'payWithCard', icon: CreditCard },
];

export function PaymentPageClient({ labels, locale, orderNumber }: PaymentPageClientProps) {
  const router = useRouter();
  const startPaymentMutation = useStartPaymentMutation();
  const [notice, setNotice] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<PaymentProvider | null>(null);
  const statusQuery = usePaymentStatusQuery(orderNumber, {
    enabled: isPaymentStatusEndpointConfigured,
    refetchInterval: isPaymentStatusEndpointConfigured ? 5000 : false,
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

  const handleStartPayment = async (provider: PaymentProvider) => {
    setNotice(null);
    setSelectedProvider(provider);

    try {
      const session = await startPaymentMutation.mutateAsync({
        order_number: orderNumber,
        provider,
      });
      const redirectUrl = getPaymentRedirectUrl(session);

      if (redirectUrl && isSafeExternalPaymentUrl(redirectUrl)) {
        window.location.assign(redirectUrl);
        return;
      }

      if (redirectUrl && isRelativePaymentUrl(redirectUrl)) {
        router.push(redirectUrl);
        return;
      }

      if (provider === 'stripe' && session?.clientSecret) {
        setNotice(labels.stripeElementsRequired);
        return;
      }

      setNotice(labels.noRedirectDescription);
    } catch (error) {
      setNotice(`${labels.startPaymentError}: ${getApiErrorMessage(error)}`);
    }
  };

  return (
    <Container className="sara-section">
      <SectionTitle eyebrow="Sara Milan" title={labels.title} description={labels.subtitle} />

      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-5">
          <PaymentResultCard
            status={isPaymentStatusEndpointConfigured ? resultCardStatus : 'info'}
            title={
              isPaymentStatusEndpointConfigured
                ? labels.pendingTitle
                : labels.paymentUnavailableTitle
            }
            description={
              isPaymentStatusEndpointConfigured
                ? labels.pendingDescription
                : labels.paymentUnavailableDescription
            }
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
                  {isPaymentStatusEndpointConfigured ? statusLabel : 'pending backend contract'}
                </Badge>
              </div>
            </div>
          </section>

          {!isPaymentStatusEndpointConfigured ? (
            <Alert title={labels.status} variant="warning">
              {labels.statusUnavailableDescription}
            </Alert>
          ) : null}

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

          <div className="space-y-3">
            {paymentProviders.map(({ icon: Icon, labelKey, provider }) => (
              <Button
                key={provider}
                className="justify-between"
                disabled={startPaymentMutation.isPending}
                fullWidth
                loading={startPaymentMutation.isPending && selectedProvider === provider}
                onClick={() => void handleStartPayment(provider)}
                variant={provider === 'kaspi' ? 'primary' : 'outline'}
              >
                <span className="inline-flex items-center gap-2">
                  <Icon aria-hidden className="h-4 w-4" />
                  {labels[labelKey]}
                </span>
                <ExternalLink aria-hidden className="h-4 w-4" />
              </Button>
            ))}
          </div>

          {isPaymentStatusEndpointConfigured ? (
            <Button
              disabled={statusQuery.isFetching}
              fullWidth
              onClick={() => void statusQuery.refetch()}
              variant="ghost"
            >
              <RefreshCw aria-hidden className="h-4 w-4" />
              {labels.checkStatus}
            </Button>
          ) : null}
        </aside>
      </div>
    </Container>
  );
}
