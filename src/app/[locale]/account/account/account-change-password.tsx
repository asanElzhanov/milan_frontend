'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useState, type FormEvent } from 'react';

import { useChangePasswordMutation } from '@/features/auth';
import { getApiErrorMessage } from '@/shared/api';
import { Alert, Button, Input } from '@/shared/ui';

import type { AccountUserProps } from './account.types';

const MIN_PASSWORD_LENGTH = 8;

type ChangePasswordErrors = Partial<
  Record<'oldPassword' | 'newPassword' | 'confirmPassword', string>
>;

function computeNextChangeDate(
  passwordChangedAt?: string | null,
  intervalDays?: number | null,
): Date | null {
  if (!passwordChangedAt || !intervalDays || intervalDays <= 0) {
    return null;
  }

  const changedAt = new Date(passwordChangedAt);

  if (Number.isNaN(changedAt.getTime())) {
    return null;
  }

  const nextDate = new Date(changedAt);
  nextDate.setDate(nextDate.getDate() + intervalDays);

  return nextDate;
}

export function AccountChangePassword({ labels, user }: AccountUserProps) {
  const changePasswordMutation = useChangePasswordMutation();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<ChangePasswordErrors>({});
  const [message, setMessage] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  // Captured once on mount so the render stays pure (no Date.now() during render).
  const [mountedAt] = useState(() => Date.now());

  const intervalDays = user.passwordChangeIntervalDays ?? 0;
  const nextChangeDate = computeNextChangeDate(user.passwordChangedAt, intervalDays);
  const isLocked = nextChangeDate !== null && nextChangeDate.getTime() > mountedAt;

  const lockedHint =
    isLocked && nextChangeDate
      ? labels.passwordChangeLockedHint
          .replace('{days}', String(intervalDays))
          .replace(
            '{date}',
            nextChangeDate.toLocaleString(undefined, {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }),
          )
      : null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    setApiError(null);

    if (isLocked) {
      return;
    }

    const nextErrors: ChangePasswordErrors = {};

    if (!oldPassword) {
      nextErrors.oldPassword = labels.requiredField;
    }

    if (!newPassword) {
      nextErrors.newPassword = labels.requiredField;
    } else if (newPassword.length < MIN_PASSWORD_LENGTH) {
      nextErrors.newPassword = labels.passwordTooShort;
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = labels.requiredField;
    } else if (newPassword !== confirmPassword) {
      nextErrors.confirmPassword = labels.passwordMismatch;
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    changePasswordMutation.mutate(
      {
        old_password: oldPassword,
        new_password: newPassword,
        new_password2: confirmPassword,
      },
      {
        onSuccess: () => {
          setMessage(labels.changePasswordSuccess);
          setOldPassword('');
          setNewPassword('');
          setConfirmPassword('');
        },
        onError: (mutationError) => setApiError(getApiErrorMessage(mutationError)),
      },
    );
  };

  const isPending = changePasswordMutation.isPending;

  return (
    <div className="space-y-5">
      <form
        className="border border-sara-beige-dark bg-sara-white p-5 md:p-6"
        onSubmit={handleSubmit}
      >
        <div className="space-y-2">
          <p className="text-caption">{labels.security}</p>
          <h2 className="font-serif text-3xl text-sara-graphite">{labels.changePasswordTitle}</h2>
        </div>

        {lockedHint ? <Alert className="mt-5" title={lockedHint} variant="info" /> : null}
        {message ? <Alert className="mt-5" title={message} variant="success" /> : null}
        {apiError ? <Alert className="mt-5" title={apiError} variant="danger" /> : null}

        <div className="mt-6 grid max-w-md gap-4">
          <Input
            autoComplete="current-password"
            disabled={isPending || isLocked}
            error={errors.oldPassword}
            label={labels.oldPassword}
            onChange={(event) => setOldPassword(event.target.value)}
            required
            rightIcon={
              <button
                aria-label={showPassword ? labels.hidePassword : labels.showPassword}
                className="sara-focus inline-flex h-7 w-7 items-center justify-center text-sara-graphite/55 hover:text-sara-graphite"
                disabled={isPending || isLocked}
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
            value={oldPassword}
          />
          <Input
            autoComplete="new-password"
            disabled={isPending || isLocked}
            error={errors.newPassword}
            label={labels.newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            required
            type={showPassword ? 'text' : 'password'}
            value={newPassword}
          />
          <Input
            autoComplete="new-password"
            disabled={isPending || isLocked}
            error={errors.confirmPassword}
            label={labels.confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
          />
        </div>

        <Button className="mt-5" disabled={isLocked} loading={isPending} type="submit">
          {labels.changePasswordSubmit}
        </Button>
      </form>
    </div>
  );
}
