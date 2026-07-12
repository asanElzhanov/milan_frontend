'use client';

import { useQuery } from '@tanstack/react-query';
import { useState, type FormEvent } from 'react';

import { orderApi, orderKeys, type Order } from '@/entities/order';
import {
  createReviewPayload,
  reviewEndpointConfig,
  useCreateProductReviewMutation,
} from '@/entities/review';
import { getAccessToken, getApiErrorMessage, isRealApiMode } from '@/shared/api';
import type { AppLocale } from '@/shared/config';
import { cn } from '@/shared/lib';
import { Alert, Button, Input, Textarea } from '@/shared/ui';

import {
  hasProductReviewFormErrors,
  validateProductReviewForm,
} from '../lib/product-review.validation';
import type { ProductReviewFormValues } from '../model/product-review-form.types';
import type { ProductReviewDictionary } from '../product-review.dictionary';
import { ReviewAuthRequired } from './review-auth-required';

export type ProductReviewFormProps = {
  productSlug: string;
  locale: AppLocale;
  labels: ProductReviewDictionary;
  disabled?: boolean;
};

const emptyValues: ProductReviewFormValues = {
  rating: 0,
  orderNumber: '',
  text: '',
};

const inactiveOrderStatuses = new Set(['draft', 'cancelled', 'canceled', 'failed']);

const normalizeOrderNumber = (value: string) => value.trim().toLowerCase();

const isReviewCandidateOrder = (order: Order): boolean => {
  const status = order.status?.toLowerCase();

  return !status || !inactiveOrderStatuses.has(status);
};

const orderContainsProduct = (order: Order, productSlug: string): boolean =>
  order.items.some((item) => item.productSlug === productSlug);

const loadOrdersForReviewCheck = async (): Promise<Order[]> => {
  const firstPage = await orderApi.getOrders({ page: 1 });
  const orders = [...firstPage.orders];

  for (let page = 2; page <= firstPage.totalPages; page += 1) {
    const nextPage = await orderApi.getOrders({ page });
    orders.push(...nextPage.orders);
  }

  return orders;
};

export function ProductReviewForm({
  disabled = false,
  labels,
  locale,
  productSlug,
}: ProductReviewFormProps) {
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState<{ rating?: string; orderNumber?: string; text?: string }>(
    {},
  );
  const [success, setSuccess] = useState(false);
  const mutation = useCreateProductReviewMutation(productSlug);
  const authenticated = Boolean(getAccessToken());
  const endpointAvailable = reviewEndpointConfig.productCreateConfigured && isRealApiMode;
  const ordersQuery = useQuery({
    queryKey: [...orderKeys.lists(), 'review-eligibility'],
    queryFn: loadOrdersForReviewCheck,
    enabled: authenticated,
    retry: 1,
  });
  const matchingOrders =
    ordersQuery.data?.filter(
      (order) => isReviewCandidateOrder(order) && orderContainsProduct(order, productSlug),
    ) ?? [];
  const canReview = matchingOrders.length > 0;
  const formDisabled =
    disabled || !endpointAvailable || mutation.isPending || ordersQuery.isLoading || !canReview;

  if (!authenticated)
    return <ReviewAuthRequired labels={labels} locale={locale} productSlug={productSlug} />;

  if (ordersQuery.isLoading) {
    return (
      <div className="sara-card p-6">
        <p className="text-caption text-sara-graphite">{labels.checkingPurchase}</p>
      </div>
    );
  }

  if (ordersQuery.isError) {
    return (
      <Alert title={labels.purchaseCheckErrorTitle} variant="danger">
        {getApiErrorMessage(ordersQuery.error)}
      </Alert>
    );
  }

  if (!canReview) {
    return (
      <Alert title={labels.purchaseRequiredTitle} variant="warning">
        {labels.purchaseRequiredDescription}
      </Alert>
    );
  }

  const update = (field: keyof ProductReviewFormValues, value: string | number) => {
    setValues((current) => ({ ...current, [field]: value }));
    setSuccess(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateProductReviewForm(values);
    const normalizedOrderNumber = normalizeOrderNumber(values.orderNumber);
    const orderMatchesProduct = matchingOrders.some(
      (order) => normalizeOrderNumber(order.orderNumber) === normalizedOrderNumber,
    );

    if (!validation.orderNumber && !orderMatchesProduct) {
      validation.orderNumber = labels.orderMustContainProduct;
    }

    setErrors(validation);
    if (hasProductReviewFormErrors(validation) || formDisabled) return;
    mutation.mutate(
      createReviewPayload({
        rating: values.rating,
        text: values.text,
        orderNumber: values.orderNumber,
      }),
      {
        onSuccess: () => {
          setValues(emptyValues);
          setErrors({});
          setSuccess(true);
        },
      },
    );
  };

  return (
    <form className="sara-card space-y-5 p-6" onSubmit={submit}>
      <h3 className="font-fashion text-2xl text-sara-black">{labels.writeReview}</h3>
      {!endpointAvailable ? <Alert variant="warning">{labels.endpointPending}</Alert> : null}
      {success ? (
        <Alert title={labels.reviewCreated} variant="success">
          {labels.reviewModeration}
        </Alert>
      ) : null}
      {mutation.isError ? (
        <Alert title={labels.createError} variant="danger">
          {getApiErrorMessage(mutation.error)}
        </Alert>
      ) : null}
      <fieldset disabled={formDisabled}>
        <legend className="text-caption font-medium text-sara-graphite">{labels.rating} *</legend>
        <div className="mt-2 flex gap-1" role="radiogroup" aria-label={labels.rating}>
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              aria-checked={values.rating === rating}
              aria-label={`${rating} / 5`}
              className={cn(
                'sara-focus text-3xl text-sara-beige-dark transition-colors',
                rating <= values.rating && 'text-sara-bronze',
              )}
              key={rating}
              onClick={() => update('rating', rating)}
              role="radio"
              type="button"
            >
              ★
            </button>
          ))}
        </div>
        {errors.rating ? (
          <p className="mt-1 text-sm text-red-700">{labels.ratingRequired}</p>
        ) : null}
      </fieldset>
      <Input
        disabled={formDisabled}
        error={
          errors.orderNumber === 'orderNumber'
            ? labels.orderNumberRequired
            : errors.orderNumber
        }
        label={labels.orderNumber}
        onChange={(e) => update('orderNumber', e.target.value)}
        required
        value={values.orderNumber}
      />
      <Textarea
        disabled={formDisabled}
        error={errors.text ? labels.textRequired : undefined}
        label={labels.text}
        onChange={(e) => update('text', e.target.value)}
        required
        value={values.text}
      />
      <Button disabled={formDisabled} loading={mutation.isPending} type="submit">
        {mutation.isPending ? labels.submitting : labels.submit}
      </Button>
    </form>
  );
}
