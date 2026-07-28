'use client';

import { useState, type FormEvent } from 'react';

import { useUpdateProfileMutation } from '@/features/auth';
import { getApiErrorMessage } from '@/shared/api';
import { formatPhoneInput } from '@/shared/lib';
import { Alert, Button, Input } from '@/shared/ui';

import type { AccountUserProps } from './account.types';

export function AccountSettings({ labels, user }: AccountUserProps) {
  const updateProfileMutation = useUpdateProfileMutation();
  const [firstName, setFirstName] = useState(user.firstName ?? '');
  const [lastName, setLastName] = useState(user.lastName ?? '');
  const [phone, setPhone] = useState(formatPhoneInput(user.phone ?? ''));
  const [savedProfile, setSavedProfile] = useState(() => ({
    firstName: (user.firstName ?? '').trim(),
    lastName: (user.lastName ?? '').trim(),
    phone: formatPhoneInput(user.phone ?? '').trim(),
  }));
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const currentProfile = {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    phone: phone.trim(),
  };
  const hasProfileChanges =
    currentProfile.firstName !== savedProfile.firstName ||
    currentProfile.lastName !== savedProfile.lastName ||
    currentProfile.phone !== savedProfile.phone;

  const handleProfileSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!hasProfileChanges) {
      return;
    }

    setMessage(null);
    setError(null);

    updateProfileMutation.mutate(
      {
        first_name: firstName.trim() || undefined,
        last_name: lastName.trim() || undefined,
        phone: phone.trim() || undefined,
      },
      {
        onSuccess: () => {
          setSavedProfile(currentProfile);
          setMessage(labels.profile);
        },
        onError: (mutationError) => setError(getApiErrorMessage(mutationError)),
      },
    );
  };

  return (
    <div className="space-y-5">
      <form
        className="border border-sara-beige-dark bg-sara-white p-5 md:p-6"
        onSubmit={handleProfileSubmit}
      >
        <div className="space-y-2">
          <p className="text-caption">{labels.profileInfo}</p>
          <h2 className="font-serif text-3xl text-sara-graphite">{labels.settings}</h2>
        </div>

        {message ? <Alert className="mt-5" title={message} variant="success" /> : null}
        {error ? <Alert className="mt-5" title={error} variant="danger" /> : null}

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Input
            disabled={updateProfileMutation.isPending}
            label={labels.name}
            onChange={(event) => setFirstName(event.target.value)}
            value={firstName}
          />
          <Input
            disabled={updateProfileMutation.isPending}
            label={labels.lastName}
            onChange={(event) => setLastName(event.target.value)}
            value={lastName}
          />
          <Input disabled label={labels.fullName} value={user.fullName ?? ''} />
          <Input disabled label={labels.email} value={user.email ?? ''} />
          <Input
            disabled={updateProfileMutation.isPending}
            label={labels.phone}
            onChange={(event) => setPhone(formatPhoneInput(event.target.value))}
            type="tel"
            value={phone}
          />
        </div>
        <Button
          className="mt-5"
          disabled={!hasProfileChanges}
          loading={updateProfileMutation.isPending}
          type="submit"
        >
          {labels.apply}
        </Button>
      </form>
    </div>
  );
}
