'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';

import { withLocale } from '@/shared/config';
import { Alert, Button, Checkbox, Input } from '@/shared/ui';

import {
  isValidEmail,
  isValidPhone,
  validatePassword,
  validateRequired,
} from '../lib/auth-ui.validation';
import type { AuthFormProps } from '../model/auth-ui.types';
import { AuthDivider } from './auth-divider';
import { AuthLegalNote } from './auth-legal-note';

type RegisterErrors = Partial<
  Record<
    'firstName' | 'lastName' | 'email' | 'phone' | 'password' | 'confirmPassword' | 'terms',
    string
  >
>;

export function RegisterForm({ dictionary, locale }: AuthFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: RegisterErrors = {};

    if (!validateRequired(firstName)) {
      nextErrors.firstName = dictionary.requiredField;
    }

    if (!validateRequired(lastName)) {
      nextErrors.lastName = dictionary.requiredField;
    }

    if (!validateRequired(email)) {
      nextErrors.email = dictionary.requiredField;
    } else if (!isValidEmail(email)) {
      nextErrors.email = dictionary.invalidEmailOrPhone;
    }

    if (!validateRequired(phone)) {
      nextErrors.phone = dictionary.requiredField;
    } else if (!isValidPhone(phone)) {
      nextErrors.phone = dictionary.invalidEmailOrPhone;
    }

    if (!validateRequired(password)) {
      nextErrors.password = dictionary.requiredField;
    } else if (!validatePassword(password)) {
      nextErrors.password = dictionary.passwordTooShort;
    }

    if (!validateRequired(confirmPassword)) {
      nextErrors.confirmPassword = dictionary.requiredField;
    } else if (password !== confirmPassword) {
      nextErrors.confirmPassword = dictionary.passwordsDoNotMatch;
    }

    if (!termsAccepted) {
      nextErrors.terms = dictionary.requiredField;
    }

    setErrors(nextErrors);
    setMessage(Object.keys(nextErrors).length === 0 ? dictionary.authComingSoon : null);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {message ? <Alert title={message} variant="info" /> : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          autoComplete="given-name"
          error={errors.firstName}
          label={dictionary.firstName}
          onChange={(event) => setFirstName(event.target.value)}
          required
          value={firstName}
        />
        <Input
          autoComplete="family-name"
          error={errors.lastName}
          label={dictionary.lastName}
          onChange={(event) => setLastName(event.target.value)}
          required
          value={lastName}
        />
      </div>

      <div className="space-y-4">
        <Input
          autoComplete="email"
          error={errors.email}
          label={dictionary.email}
          onChange={(event) => setEmail(event.target.value)}
          required
          type="email"
          value={email}
        />
        <Input
          autoComplete="tel"
          error={errors.phone}
          label={dictionary.phone}
          onChange={(event) => setPhone(event.target.value)}
          required
          type="tel"
          value={phone}
        />
        <Input
          autoComplete="new-password"
          error={errors.password}
          label={dictionary.password}
          onChange={(event) => setPassword(event.target.value)}
          required
          type="password"
          value={password}
        />
        <Input
          autoComplete="new-password"
          error={errors.confirmPassword}
          label={dictionary.confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
          type="password"
          value={confirmPassword}
        />
      </div>

      <Checkbox
        checked={termsAccepted}
        error={errors.terms}
        label={<AuthLegalNote dictionary={dictionary} locale={locale} />}
        onCheckedChange={setTermsAccepted}
      />

      <Button fullWidth type="submit">
        {dictionary.registerButton}
      </Button>

      <AuthDivider />

      <p className="text-sm text-sara-graphite/75">
        {dictionary.haveAccount}{' '}
        <Link
          className="sara-focus font-medium text-sara-graphite underline-offset-4 hover:text-sara-bronze hover:underline"
          href={withLocale(locale, '/login')}
        >
          {dictionary.goToLogin}
        </Link>
      </p>
    </form>
  );
}
