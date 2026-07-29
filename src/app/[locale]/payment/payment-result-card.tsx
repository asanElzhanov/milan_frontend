import type { ReactNode } from 'react';

import { Alert, Badge } from '@/shared/ui';

export type PaymentResultCardProps = {
  title: string;
  description?: string;
  status: 'success' | 'fail' | 'pending' | 'info';
  statusLabel: string;
  actions?: ReactNode;
};

const statusConfig = {
  success: {
    badge: 'success',
    alert: 'success',
  },
  fail: {
    badge: 'danger',
    alert: 'danger',
  },
  pending: {
    badge: 'warning',
    alert: 'warning',
  },
  info: {
    badge: 'outline',
    alert: 'info',
  },
} as const;

export function PaymentResultCard({
  actions,
  description,
  status,
  statusLabel,
  title,
}: PaymentResultCardProps) {
  const config = statusConfig[status];

  return (
    <section className="border border-sara-beige-dark bg-sara-white p-6 shadow-soft md:p-8">
      <div className="flex flex-col gap-5">
        <Badge variant={config.badge}>{statusLabel}</Badge>
        <Alert variant={config.alert} title={title}>
          {description}
        </Alert>
        {actions ? <div className="flex flex-col gap-3 sm:flex-row">{actions}</div> : null}
      </div>
    </section>
  );
}
