'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';

import { withLocale } from '@/shared/config';
import { Alert, Button, Input } from '@/shared/ui';

import { isValidOtpCode } from '../lib/otp.validation';
import type { OtpFormProps } from '../model/otp.types';

export function OtpForm({ dictionary, locale }: OtpFormProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [message, setMessage] = useState<string | null>(null);

  const showComingSoon = () => {
    setError(undefined);
    setMessage(dictionary.otpComingSoon);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!code.trim()) {
      setError(dictionary.requiredField);
      setMessage(null);
      return;
    }

    if (!isValidOtpCode(code)) {
      setError(dictionary.invalidOtp);
      setMessage(null);
      return;
    }

    showComingSoon();
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {message ? <Alert title={message} variant="info" /> : null}

      <Input
        autoComplete="one-time-code"
        error={error}
        inputMode="numeric"
        label={dictionary.otpCode}
        maxLength={6}
        onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))}
        placeholder="000000"
        required
        value={code}
      />

      <Button fullWidth type="submit">
        {dictionary.verifyCode}
      </Button>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <button
          className="sara-focus font-medium text-sara-graphite underline-offset-4 hover:text-sara-bronze hover:underline"
          onClick={showComingSoon}
          type="button"
        >
          {dictionary.resendCode}
        </button>
        <Link
          className="sara-focus font-medium text-sara-graphite underline-offset-4 hover:text-sara-bronze hover:underline"
          href={withLocale(locale, '/login')}
        >
          {dictionary.changeContact}
        </Link>
      </div>
    </form>
  );
}
