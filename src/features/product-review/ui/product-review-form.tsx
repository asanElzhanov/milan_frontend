'use client';

import { useState, type FormEvent } from 'react';

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
  title: '',
  text: '',
  advantages: '',
  disadvantages: '',
};

export function ProductReviewForm({
  disabled = false,
  labels,
  locale,
  productSlug,
}: ProductReviewFormProps) {
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState<{ rating?: string; text?: string }>({});
  const [success, setSuccess] = useState(false);
  const mutation = useCreateProductReviewMutation(productSlug);
  const authenticated = Boolean(getAccessToken());
  const endpointAvailable = reviewEndpointConfig.productCreateConfigured && isRealApiMode;
  const formDisabled = disabled || !endpointAvailable || mutation.isPending;

  if (!authenticated)
    return <ReviewAuthRequired labels={labels} locale={locale} productSlug={productSlug} />;

  const update = (field: keyof ProductReviewFormValues, value: string | number) => {
    setValues((current) => ({ ...current, [field]: value }));
    setSuccess(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateProductReviewForm(values);
    setErrors(validation);
    if (hasProductReviewFormErrors(validation) || formDisabled) return;
    mutation.mutate(createReviewPayload(values), {
      onSuccess: () => {
        setValues(emptyValues);
        setErrors({});
        setSuccess(true);
      },
    });
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
        label={labels.title}
        onChange={(e) => update('title', e.target.value)}
        value={values.title}
      />
      <Textarea
        disabled={formDisabled}
        error={errors.text ? labels.textRequired : undefined}
        label={labels.text}
        onChange={(e) => update('text', e.target.value)}
        required
        value={values.text}
      />
      <div className="grid gap-5 md:grid-cols-2">
        <Textarea
          disabled={formDisabled}
          label={labels.advantages}
          onChange={(e) => update('advantages', e.target.value)}
          value={values.advantages}
        />
        <Textarea
          disabled={formDisabled}
          label={labels.disadvantages}
          onChange={(e) => update('disadvantages', e.target.value)}
          value={values.disadvantages}
        />
      </div>
      <Button disabled={formDisabled} loading={mutation.isPending} type="submit">
        {mutation.isPending ? labels.submitting : labels.submit}
      </Button>
    </form>
  );
}
