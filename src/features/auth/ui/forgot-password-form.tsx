'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';

import { getApiErrorMessage } from '@/shared/api';
import { withLocale } from '@/shared/config';
import { Alert, Button, Input } from '@/shared/ui';

import { useRequestPasswordResetMutation } from '../api/auth.queries';
import { isValidEmailOrPhone, validateRequired } from '../lib/auth-ui.validation';
import type { AuthFormProps } from '../model/auth-ui.types';

export function ForgotPasswordForm({ dictionary, locale }: AuthFormProps) {
  const requestResetMutation = useRequestPasswordResetMutation();
  const [identifier, setIdentifier] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [message, setMessage] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setApiError(null);

    if (!validateRequired(identifier)) {
      setError(dictionary.requiredField);
      setMessage(null);
      return;
    }

    if (!isValidEmailOrPhone(identifier)) {
      setError(dictionary.invalidEmailOrPhone);
      setMessage(null);
      return;
    }

    setError(undefined);
    setMessage(null);

    requestResetMutation.mutate(
      { identifier: identifier.trim(), locale },
      {
        onSuccess: () => setMessage(dictionary.passwordResetRequestSuccess),
        onError: (mutationError) => setApiError(getApiErrorMessage(mutationError)),
      },
    );
  };

  const isPending = requestResetMutation.isPending;

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {message ? <Alert title={message} variant="success" /> : null}
      {apiError ? <Alert title={apiError} variant="danger" /> : null}

      <Input
        autoComplete="username"
        disabled={isPending}
        error={error}
        label={dictionary.identifier}
        onChange={(event) => setIdentifier(event.target.value)}
        required
        type="text"
        value={identifier}
      />

      <Button fullWidth loading={isPending} type="submit">
        {dictionary.sendInstructions}
      </Button>

      <Link
        className="sara-focus inline-flex text-sm font-medium text-sara-graphite underline-offset-4 hover:text-sara-bronze hover:underline"
        href={withLocale(locale, '/login')}
      >
        {dictionary.goToLogin}
      </Link>
    </form>
  );
}
