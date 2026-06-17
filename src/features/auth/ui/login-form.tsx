'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';

import { withLocale } from '@/shared/config';
import { Alert, Button, Checkbox, Input } from '@/shared/ui';

import { isValidEmailOrPhone, validatePassword, validateRequired } from '../lib/auth-ui.validation';
import type { AuthFormProps } from '../model/auth-ui.types';
import { AuthDivider } from './auth-divider';

type LoginErrors = Partial<Record<'identifier' | 'password', string>>;

export function LoginForm({ dictionary, locale }: AuthFormProps) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: LoginErrors = {};

    if (!validateRequired(identifier)) {
      nextErrors.identifier = dictionary.requiredField;
    } else if (!isValidEmailOrPhone(identifier)) {
      nextErrors.identifier = dictionary.invalidEmailOrPhone;
    }

    if (!validateRequired(password)) {
      nextErrors.password = dictionary.requiredField;
    } else if (!validatePassword(password)) {
      nextErrors.password = dictionary.passwordTooShort;
    }

    setErrors(nextErrors);
    setMessage(Object.keys(nextErrors).length === 0 ? dictionary.authComingSoon : null);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {message ? <Alert title={message} variant="info" /> : null}

      <div className="space-y-4">
        <Input
          autoComplete="username"
          error={errors.identifier}
          label={dictionary.identifier}
          onChange={(event) => setIdentifier(event.target.value)}
          required
          type="text"
          value={identifier}
        />
        <Input
          autoComplete="current-password"
          error={errors.password}
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

      <Button fullWidth type="submit">
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
