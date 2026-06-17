import { Badge } from '@/shared/ui';

import type { AccountUserProps } from './account.types';

const getRoleLabel = (role: string | null | undefined, labels: AccountUserProps['labels']) => {
  switch (role) {
    case 'customer':
      return labels.customer;
    case 'manager':
      return labels.manager;
    case 'admin':
      return labels.admin;
    default:
      return labels.unknownRole;
  }
};

const getDisplayName = (user: AccountUserProps['user']) =>
  user.fullName ||
  [user.firstName, user.lastName].filter(Boolean).join(' ') ||
  user.email ||
  user.phone ||
  String(user.id);

function VerificationBadge({ label, verified }: { label: string; verified?: boolean }) {
  return (
    <Badge variant={verified ? 'success' : 'muted'}>
      {label}: {verified ? 'OK' : '-'}
    </Badge>
  );
}

export function AccountProfileCard({ labels, user }: AccountUserProps) {
  const displayName = getDisplayName(user);

  return (
    <section className="border border-sara-beige-dark bg-sara-white p-5 md:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <p className="text-caption">{labels.profile}</p>
          <h2 className="font-serif text-3xl text-sara-graphite">{displayName}</h2>
          <p className="text-sm text-sara-graphite/65">
            {labels.role}: {getRoleLabel(user.role, labels)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <VerificationBadge label={labels.email} verified={user.isEmailVerified} />
          <VerificationBadge label={labels.phone} verified={user.isPhoneVerified} />
        </div>
      </div>

      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-caption">{labels.email}</dt>
          <dd className="mt-1 text-sm font-medium text-sara-graphite">{user.email || '-'}</dd>
        </div>
        <div>
          <dt className="text-caption">{labels.phone}</dt>
          <dd className="mt-1 text-sm font-medium text-sara-graphite">{user.phone || '-'}</dd>
        </div>
        <div>
          <dt className="text-caption">{labels.name}</dt>
          <dd className="mt-1 text-sm font-medium text-sara-graphite">{user.firstName || '-'}</dd>
        </div>
        <div>
          <dt className="text-caption">{labels.lastName}</dt>
          <dd className="mt-1 text-sm font-medium text-sara-graphite">{user.lastName || '-'}</dd>
        </div>
      </dl>
    </section>
  );
}
