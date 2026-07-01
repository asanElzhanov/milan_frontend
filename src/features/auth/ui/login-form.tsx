'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';

import { getApiErrorMessage } from '@/shared/api';
import { getSafeCallbackUrl, withLocale } from '@/shared/config';
import { Alert, Button, Checkbox, Input } from '@/shared/ui';

import { useLoginMutation } from '../api/auth.queries';
import { mapIdentifierToLoginPayload } from '../lib/auth.adapters';
import { isValidEmail, validatePassword, validateRequired } from '../lib/auth-ui.validation';
import type { AuthFormProps } from '../model/auth-ui.types';
import { AuthDivider } from './auth-divider';

type LoginErrors = Partial<Record<'identifier' | 'password', string>>;

export function LoginForm({ dictionary, locale }: AuthFormProps) {
  const router = useRouter();
  const loginMutation = useLoginMutation();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setApiError(null);

    const nextErrors: LoginErrors = {};

    if (!validateRequired(identifier)) {
      nextErrors.identifier = dictionary.requiredField;
    } else if (!isValidEmail(identifier)) {
      nextErrors.identifier = dictionary.invalidEmailOrPhone;
    }

    if (!validateRequired(password)) {
      nextErrors.password = dictionary.requiredField;
    } else if (!validatePassword(password)) {
      nextErrors.password = dictionary.passwordTooShort;
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    loginMutation.mutate(mapIdentifierToLoginPayload({ identifier, password }), {
      onSuccess: () => {
        const params = new URLSearchParams(window.location.search);
        const fallback = withLocale(locale, '/catalog');

        router.push(getSafeCallbackUrl(params.get('callbackUrl'), fallback));
      },
      onError: (error) => setApiError(getApiErrorMessage(error)),
    });
  };

  const isPending = loginMutation.isPending;

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {apiError ? <Alert title={apiError} variant="danger" /> : null}

      <div className="space-y-4">
        <Input
          autoComplete="username"
          error={errors.identifier}
          disabled={isPending}
          label={dictionary.identifier}
          onChange={(event) => setIdentifier(event.target.value)}
          required
          type="text"
          value={identifier}
        />
        <Input
          autoComplete="current-password"
          error={errors.password}
          disabled={isPending}
          label={dictionary.password}
          onChange={(event) => setPassword(event.target.value)}
          required
          type="password"
          value={password}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Checkbox
          checked={rememberMe}
          disabled={isPending}
          label={dictionary.rememberMe}
          onCheckedChange={setRememberMe}
        />
        <Link
          className="sara-focus text-sm font-medium text-sara-graphite underline-offset-4 hover:text-sara-bronze hover:underline"
          href={withLocale(locale, '/forgot-password')}
        >
          {dictionary.forgotPassword}
        </Link>
      </div>

      <Button fullWidth loading={isPending} type="submit">
        {dictionary.loginButton}
      </Button>

      <AuthDivider />

      <div className="space-y-3 text-sm text-sara-graphite/75">
        <p>
          {dictionary.noAccount}{' '}
          <Link
            className="sara-focus font-medium text-sara-graphite underline-offset-4 hover:text-sara-bronze hover:underline"
            href={withLocale(locale, '/register')}
          >
            {dictionary.goToRegister}
          </Link>
        </p>
        <Link
          className="sara-focus inline-flex font-medium text-sara-graphite underline-offset-4 hover:text-sara-bronze hover:underline"
          href={withLocale(locale, '/catalog')}
        >
          {dictionary.continueAsGuest}
        </Link>
      </div>
    </form>
  );
}
