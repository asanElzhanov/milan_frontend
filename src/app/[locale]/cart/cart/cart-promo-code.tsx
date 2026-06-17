'use client';

import { useRouter } from 'next/navigation';
import { type FormEvent, useState } from 'react';

import { type Cart, useApplyPromoCodeMutation, useRemovePromoCodeMutation } from '@/entities/cart';
import { getApiErrorMessage, isApiError } from '@/shared/api';
import { Alert, Button, Input } from '@/shared/ui';

export type CartPromoCodeProps = {
  cart: Cart;
  labels: {
    promoTitle: string;
    promoPlaceholder: string;
    applyPromo: string;
    removePromo: string;
    promoApplied: string;
    promoInvalid: string;
    promoApplyError: string;
    promoRemoveError: string;
  };
};

const getPromoErrorMessage = (error: unknown, fallback: string): string => {
  if (isApiError(error)) {
    const codeError = error.validationErrors?.code?.at(0);

    if (codeError) {
      return codeError;
    }
  }

  const message = getApiErrorMessage(error);

  return message === 'Unexpected error' ? fallback : message;
};

export function CartPromoCode({ cart, labels }: CartPromoCodeProps) {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const applyPromoMutation = useApplyPromoCodeMutation();
  const removePromoMutation = useRemovePromoCodeMutation();
  const isPending = applyPromoMutation.isPending || removePromoMutation.isPending;

  const handleApply = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedCode = code.trim();

    if (!normalizedCode) {
      setError(labels.promoInvalid);
      return;
    }

    setError(null);
    applyPromoMutation.mutate(
      { code: normalizedCode },
      {
        onSuccess: () => {
          setCode('');
          router.refresh();
        },
        onError: (mutationError) => {
          setError(getPromoErrorMessage(mutationError, labels.promoApplyError));
        },
      },
    );
  };

  const handleRemove = () => {
    setError(null);
    removePromoMutation.mutate(undefined, {
      onSuccess: () => {
        router.refresh();
      },
      onError: (mutationError) => {
        setError(getPromoErrorMessage(mutationError, labels.promoRemoveError));
      },
    });
  };

  return (
    <section className="sara-card space-y-4 p-6">
      <div>
        <h2 className="font-fashion text-2xl text-sara-black">{labels.promoTitle}</h2>
        {cart.promoCode ? (
          <p className="mt-2 text-sm text-sara-graphite/65">
            {labels.promoApplied}: <span className="font-medium">{cart.promoCode}</span>
          </p>
        ) : null}
      </div>

      {cart.promoCode ? (
        <Button
          disabled={isPending}
          loading={removePromoMutation.isPending}
          onClick={handleRemove}
          variant="outline"
        >
          {labels.removePromo}
        </Button>
      ) : (
        <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleApply}>
          <Input
            disabled={isPending}
            onChange={(event) => setCode(event.target.value)}
            placeholder={labels.promoPlaceholder}
            value={code}
          />
          <Button disabled={isPending} loading={applyPromoMutation.isPending} type="submit">
            {labels.applyPromo}
          </Button>
        </form>
      )}

      {error ? (
        <Alert role="alert" title={error} variant="danger">
          {cart.promoCode ? labels.promoRemoveError : labels.promoInvalid}
        </Alert>
      ) : null}
    </section>
  );
}
