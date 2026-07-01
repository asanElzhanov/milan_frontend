'use client';

import { useState, type FormEvent } from 'react';

import { useUpdateProfileMutation } from '@/features/auth';
import { getApiErrorMessage } from '@/shared/api';
import { Alert, Button, Input } from '@/shared/ui';

import type { AccountUserProps } from './account.types';

export function AccountSettings({ labels, user }: AccountUserProps) {
  const updateProfileMutation = useUpdateProfileMutation();
  const [firstName, setFirstName] = useState(user.firstName ?? '');
  const [lastName, setLastName] = useState(user.lastName ?? '');
  const [phone, setPhone] = useState(user.phone ?? '');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleProfileSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    setError(null);

    updateProfileMutation.mutate(
      {
        first_name: firstName.trim() || undefined,
        last_name: lastName.trim() || undefined,
        phone: phone.trim() || undefined,
      },
      {
        onSuccess: () => setMessage(labels.profile),
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
            onChange={(event) => setPhone(event.target.value)}
            value={phone}
          />
        </div>
        <Button className="mt-5" loading={updateProfileMutation.isPending} type="submit">
          {labels.settings}
        </Button>
      </form>

      <section className="border border-sara-beige-dark bg-sara-white p-5 md:p-6">
        <div className="space-y-2">
          <p className="text-caption">{labels.security}</p>
          <h2 className="font-serif text-3xl text-sara-graphite">{labels.security}</h2>
        </div>
        <Alert className="mt-5" title={labels.changePasswordPending} variant="info" />
        <Button className="mt-5" disabled variant="outline">
          {labels.security}
        </Button>
      </section>
    </div>
  );
}
