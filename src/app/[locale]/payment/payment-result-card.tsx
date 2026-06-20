import type { ReactNode } from 'react';

import { Alert, Badge } from '@/shared/ui';

export type PaymentResultCardProps = {
  title: string;
  description?: string;
  status: 'success' | 'fail' | 'pending' | 'info';
  actions?: ReactNode;
};

const statusConfig = {
  success: {
    badge: 'success',
    label: 'Success',
    alert: 'success',
  },
  fail: {
    badge: 'danger',
    label: 'Failed',
    alert: 'danger',
  },
  pending: {
    badge: 'warning',
    label: 'Pending',
    alert: 'warning',
  },
  info: {
    badge: 'outline',
    label: 'Info',
    alert: 'info',
  },
} as const;

export function PaymentResultCard({ actions, description, status, title }: PaymentResultCardProps) {
  const config = statusConfig[status];

  return (
    <section className="border border-sara-beige-dark bg-sara-white p-6 shadow-soft md:p-8">
      <div className="flex flex-col gap-5">
        <Badge variant={config.badge}>{config.label}</Badge>
        <Alert variant={config.alert} title={title}>
          {description}
        </Alert>
        {actions ? <div className="flex flex-col gap-3 sm:flex-row">{actions}</div> : null}
      </div>
    </section>
  );
}
