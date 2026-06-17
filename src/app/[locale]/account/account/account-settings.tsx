import { Alert, Button, Input } from '@/shared/ui';

import type { AccountUserProps } from './account.types';

export function AccountSettings({ labels, user }: AccountUserProps) {
  return (
    <div className="space-y-5">
      <section className="border border-sara-beige-dark bg-sara-white p-5 md:p-6">
        <div className="space-y-2">
          <p className="text-caption">{labels.profileInfo}</p>
          <h2 className="font-serif text-3xl text-sara-graphite">{labels.settings}</h2>
        </div>

        <Alert className="mt-5" title={labels.profileUpdatePending} variant="info" />

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Input disabled label={labels.name} value={user.firstName ?? ''} />
          <Input disabled label={labels.lastName} value={user.lastName ?? ''} />
          <Input disabled label={labels.fullName} value={user.fullName ?? ''} />
          <Input disabled label={labels.email} value={user.email ?? ''} />
          <Input disabled label={labels.phone} value={user.phone ?? ''} />
        </div>
      </section>

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
