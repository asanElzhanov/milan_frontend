'use client';

import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, type FormEvent } from 'react';

import { getApiErrorMessage } from '@/shared/api';
import { withLocale } from '@/shared/config';
import { Alert, Button, Input } from '@/shared/ui';

import { useConfirmPasswordResetMutation } from '../api/auth.queries';
import { validatePassword, validateRequired } from '../lib/auth-ui.validation';
import type { AuthFormProps } from '../model/auth-ui.types';

type ResetErrors = Partial<Record<'newPassword' | 'confirmPassword', string>>;

const REDIRECT_DELAY_MS = 2000;

export function ResetPasswordForm({ dictionary, locale }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid') ?? '';
  const token = searchParams.get('token') ?? '';
  const hasValidLink = Boolean(uid && token);

  const confirmResetMutation = useConfirmPasswordResetMutation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<ResetErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!success) {
      return;
    }

    const timeout = window.setTimeout(() => {
      router.push(withLocale(locale, '/login'));
    }, REDIRECT_DELAY_MS);

    return () => window.clearTimeout(timeout);
  }, [success, router, locale]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setApiError(null);

    const nextErrors: ResetErrors = {};

    if (!validateRequired(newPassword)) {
      nextErrors.newPassword = dictionary.requiredField;
    } else if (!validatePassword(newPassword)) {
      nextErrors.newPassword = dictionary.passwordTooShort;
    }

    if (!validateRequired(confirmPassword)) {
      nextErrors.confirmPassword = dictionary.requiredField;
    } else if (newPassword !== confirmPassword) {
      nextErrors.confirmPassword = dictionary.passwordsDoNotMatch;
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    confirmResetMutation.mutate(
      {
        uid,
        token,
        new_password: newPassword,
        new_password2: confirmPassword,
      },
      {
        onSuccess: () => setSuccess(true),
        onError: (mutationError) => setApiError(getApiErrorMessage(mutationError)),
      },
    );
  };

  if (!hasValidLink) {
    return (
      <div className="space-y-6">
        <Alert title={dictionary.resetInvalidLink} variant="danger" />
        <Link
          className="sara-focus inline-flex text-sm font-medium text-sara-graphite underline-offset-4 hover:text-sara-bronze hover:underline"
          href={withLocale(locale, '/forgot-password')}
        >
          {dictionary.forgotPassword}
        </Link>
      </div>
    );
  }

  const isPending = confirmResetMutation.isPending;

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {success ? <Alert title={dictionary.resetSuccess} variant="success" /> : null}
      {apiError ? <Alert title={apiError} variant="danger" /> : null}

      <div className="space-y-4">
        <Input
          autoComplete="new-password"
          disabled={isPending || success}
          error={errors.newPassword}
          label={dictionary.newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          required
          rightIcon={
            <button
              aria-label={showPassword ? dictionary.hidePassword : dictionary.showPassword}
              className="sara-focus inline-flex h-7 w-7 items-center justify-center text-sara-graphite/55 hover:text-sara-graphite"
              disabled={isPending || success}
              onClick={() => setShowPassword((current) => !current)}
              type="button"
            >
              {showPassword ? (
                <EyeOff aria-hidden className="h-4 w-4" />
              ) : (
                <Eye aria-hidden className="h-4 w-4" />
              )}
            </button>
          }
          type={showPassword ? 'text' : 'password'}
          value={newPassword}
        />
        <Input
          autoComplete="new-password"
          disabled={isPending || success}
          error={errors.confirmPassword}
          label={dictionary.confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
          type={showPassword ? 'text' : 'password'}
          value={confirmPassword}
        />
      </div>

      <Button disabled={success} fullWidth loading={isPending} type="submit">
        {dictionary.resetButton}
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
