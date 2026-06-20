import { Badge } from '@/shared/ui';

import type { PaymentStatus } from '../model/order.types';

export type PaymentStatusBadgeProps = {
  status?: PaymentStatus | null;
  labels?: Partial<Record<string, string>>;
};

const statusVariants = {
  paid: 'success',
  failed: 'danger',
  cancelled: 'danger',
  refunded: 'outline',
  not_required: 'muted',
  pending: 'warning',
  payment_pending: 'warning',
} as const;

export function PaymentStatusBadge({ labels, status }: PaymentStatusBadgeProps) {
  const key = String(status ?? 'pending').toLowerCase();
  const variant = statusVariants[key as keyof typeof statusVariants] ?? 'outline';

  return <Badge variant={variant}>{labels?.[key] ?? status ?? 'pending'}</Badge>;
}
