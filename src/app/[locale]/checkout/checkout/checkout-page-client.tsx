'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState, type FormEvent } from 'react';

import { getDefaultAddress, useAddressesQuery } from '@/entities/address';
import { useCartQuery } from '@/entities/cart';
import { getActiveDeliveryMethods, useDeliveryMethodsQuery } from '@/entities/delivery-method';
import {
  checkoutFormValuesToPayload,
  createInitialCheckoutFormValues,
  hasCheckoutFormErrors,
  isExternalUrl,
  resolveCheckoutRedirect,
  useCheckoutMutation,
  validateCheckoutForm,
  type CheckoutAddressMode,
  type CheckoutFormValues,
} from '@/features/checkout';
import { useCurrentUserQuery } from '@/features/auth';
import { type AppLocale, localizedRoutes } from '@/shared/config';
import { getApiErrorMessage } from '@/shared/api';
import { Button, Container, ErrorState, SectionTitle, Skeleton } from '@/shared/ui';
import { CartSummary } from '@/widgets/cart-summary';

import { CheckoutAddressSection } from './checkout-address-section';
import { CheckoutComment } from './checkout-comment';
import { CheckoutCustomerForm } from './checkout-customer-form';
import { CheckoutDeliveryMethods } from './checkout-delivery-methods';
import { CheckoutEmptyCart } from './checkout-empty-cart';
import { CheckoutPaymentMethod } from './checkout-payment-method';
import { CheckoutSubmitError } from './checkout-submit-error';
import type { CheckoutDictionary } from './checkout.dictionary';

type CheckoutPageClientProps = {
  labels: CheckoutDictionary;
  locale: AppLocale;
};

type CurrentUser = NonNullable<ReturnType<typeof useCurrentUserQuery>['data']>;

const getUserFullName = (user: CurrentUser) =>
  user.fullName ?? [user.firstName, user.lastName].filter(Boolean).join(' ');

function CheckoutPageSkeleton({ labels }: { labels: CheckoutDictionary }) {
  return (
    <Container className="sara-section">
      <SectionTitle eyebrow="Sara Milan" title={labels.title} description={labels.subtitle} />
      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="space-y-5">
          <Skeleton className="h-48" variant="text" />
          <Skeleton className="h-72" variant="text" />
          <Skeleton className="h-48" variant="text" />
        </div>
        <Skeleton className="h-96" variant="text" />
      </div>
    </Container>
  );
}

export function CheckoutPageClient({ labels, locale }: CheckoutPageClientProps) {
  const router = useRouter();
  const cartQuery = useCartQuery();
  const currentUserQuery = useCurrentUserQuery();
  const addressesQuery = useAddressesQuery({ enabled: Boolean(currentUserQuery.data) });
  const deliveryMethodsQuery = useDeliveryMethodsQuery();
  const checkoutMutation = useCheckoutMutation();
  const [values, setValues] = useState(() => createInitialCheckoutFormValues());
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [touchedFields, setTouchedFields] = useState<
    Partial<Record<keyof CheckoutFormValues, true>>
  >({});
  const [addressModeTouched, setAddressModeTouched] = useState(false);

  const addresses = useMemo(() => addressesQuery.data ?? [], [addressesQuery.data]);
  const activeDeliveryMethods = useMemo(
    () => getActiveDeliveryMethods(deliveryMethodsQuery.data ?? []),
    [deliveryMethodsQuery.data],
  );
  const canUseSavedAddresses = Boolean(currentUserQuery.data && addresses.length > 0);
  const defaultAddress = canUseSavedAddresses ? getDefaultAddress(addresses) : null;
  const singleDeliveryMethod = activeDeliveryMethods.length === 1 ? activeDeliveryMethods[0] : null;

  const effectiveValues: CheckoutFormValues = {
    ...values,
    customerFullName:
      touchedFields.customerFullName || !currentUserQuery.data
        ? values.customerFullName
        : values.customerFullName || getUserFullName(currentUserQuery.data),
    customerEmail:
      touchedFields.customerEmail || !currentUserQuery.data
        ? values.customerEmail
        : values.customerEmail || currentUserQuery.data.email || '',
    customerPhone:
      touchedFields.customerPhone || !currentUserQuery.data
        ? values.customerPhone
        : values.customerPhone || currentUserQuery.data.phone || '',
    addressMode: addressModeTouched
      ? values.addressMode
      : canUseSavedAddresses
        ? 'saved'
        : 'manual',
    addressId:
      values.addressId || (!addressModeTouched && defaultAddress ? String(defaultAddress.id) : ''),
    deliveryMethodId:
      values.deliveryMethodId || (singleDeliveryMethod ? String(singleDeliveryMethod.id) : ''),
  };

  const updateField = <Key extends keyof CheckoutFormValues>(
    key: Key,
    value: CheckoutFormValues[Key],
  ) => {
    setValues((current) => ({ ...current, [key]: value }));
    setTouchedFields((current) => ({ ...current, [key]: true }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const updateManualAddress = <Key extends keyof CheckoutFormValues['manualAddress']>(
    key: Key,
    value: CheckoutFormValues['manualAddress'][Key],
  ) => {
    setValues((current) => ({
      ...current,
      manualAddress: { ...current.manualAddress, [key]: value },
    }));
    setErrors((current) => ({ ...current, [`manualAddress.${String(key)}`]: undefined }));
  };

  const updateAddressMode = (mode: CheckoutAddressMode) => {
    setValues((current) => ({ ...current, addressMode: mode }));
    setAddressModeTouched(true);
    setErrors((current) => ({ ...current, addressId: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    const nextErrors = validateCheckoutForm(effectiveValues);
    setErrors(nextErrors);

    if (hasCheckoutFormErrors(nextErrors)) {
      return;
    }

    try {
      const result = await checkoutMutation.mutateAsync(
        checkoutFormValuesToPayload(effectiveValues),
      );
      const redirectUrl = resolveCheckoutRedirect({ locale, result });

      if (isExternalUrl(redirectUrl)) {
        window.location.href = redirectUrl;
        return;
      }

      router.push(redirectUrl);
    } catch (error) {
      setSubmitError(getApiErrorMessage(error));
    }
  };

  if (cartQuery.isLoading) {
    return <CheckoutPageSkeleton labels={labels} />;
  }

  if (cartQuery.isError) {
    return (
      <Container className="sara-section">
        <ErrorState
          title={labels.checkoutError}
          description={getApiErrorMessage(cartQuery.error)}
          action={<Button onClick={() => void cartQuery.refetch()}>{labels.retry}</Button>}
        />
      </Container>
    );
  }

  const cart = cartQuery.data;

  if (!cart || cart.isEmpty) {
    return (
      <Container className="sara-section">
        <CheckoutEmptyCart labels={labels} locale={locale} />
      </Container>
    );
  }

  const isSubmitting = checkoutMutation.isPending;
  const isSubmitDisabled =
    isSubmitting ||
    cart.isEmpty ||
    deliveryMethodsQuery.isLoading ||
    !values.deliveryMethodId ||
    !effectiveValues.deliveryMethodId ||
    activeDeliveryMethods.length === 0;

  return (
    <Container className="sara-section">
      <SectionTitle eyebrow="Sara Milan" title={labels.title} description={labels.subtitle} />

      <form className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem]" onSubmit={handleSubmit}>
        <div className="space-y-5">
          <CheckoutCustomerForm
            disabled={isSubmitting}
            errors={errors}
            labels={labels}
            onChange={updateField}
            values={effectiveValues}
          />
          <CheckoutAddressSection
            addresses={addresses}
            canUseSavedAddresses={canUseSavedAddresses}
            disabled={isSubmitting}
            errors={errors}
            labels={labels}
            onAddressIdChange={(addressId) => updateField('addressId', addressId)}
            onAddressModeChange={updateAddressMode}
            onManualAddressChange={updateManualAddress}
            values={effectiveValues}
          />
          <CheckoutDeliveryMethods
            disabled={isSubmitting}
            error={errors.deliveryMethodId}
            isLoading={deliveryMethodsQuery.isLoading}
            labels={labels}
            methods={activeDeliveryMethods}
            onSelect={(methodId) => updateField('deliveryMethodId', methodId)}
            selectedMethodId={effectiveValues.deliveryMethodId}
          />
          <CheckoutPaymentMethod
            disabled={isSubmitting}
            labels={labels}
            onChange={(paymentMethod) => updateField('paymentMethod', paymentMethod)}
            value={effectiveValues.paymentMethod}
          />
          <CheckoutComment
            disabled={isSubmitting}
            labels={labels}
            onChange={(comment) => updateField('comment', comment)}
            value={effectiveValues.comment}
          />
          {submitError ? <CheckoutSubmitError labels={labels} message={submitError} /> : null}
        </div>

        <div className="space-y-4">
          <CartSummary
            cart={cart}
            checkoutHref={localizedRoutes.checkout(locale)}
            footerSlot={
              <Button disabled={isSubmitDisabled} fullWidth loading={isSubmitting} type="submit">
                {isSubmitting ? labels.submitting : labels.submit}
              </Button>
            }
            labels={{
              summaryTitle: labels.summaryTitle,
              subtotal: labels.subtotal,
              discount: labels.discount,
              totalAfterDiscount: labels.totalAfterDiscount,
              total: labels.total,
              proceedToCheckout: labels.submit,
              promoCode: labels.promoCode,
            }}
            locale={locale}
            showCheckoutButton={false}
          />
          <Button asChild fullWidth variant="ghost">
            <a href={localizedRoutes.cart(locale)}>{labels.backToCart}</a>
          </Button>
        </div>
      </form>
    </Container>
  );
}
