import { Badge } from '@/shared/ui';

import type { PaymentStatus } from '../model/order.types';

export type PaymentStatusBadgeProps = {
  status?: PaymentStatus | null;
  labels?: Partial<Record<string, string>>;
};

const statusVariants = {
  paid: 'success',
  success: 'success',
  completed: 'success',
  failed: 'danger',
  error: 'danger',
  cancelled: 'danger',
  canceled: 'danger',
  expired: 'danger',
  refunded: 'outline',
  not_required: 'muted',
  pending: 'warning',
  payment_pending: 'warning',
  unpaid: 'warning',
  waiting: 'warning',
  processing: 'warning',
  created: 'warning',
  requires_action: 'warning',
} as const;

export function PaymentStatusBadge({ labels, status }: PaymentStatusBadgeProps) {
  const key = String(status ?? 'pending').toLowerCase();
  const variant = statusVariants[key as keyof typeof statusVariants] ?? 'outline';

  return <Badge variant={variant}>{labels?.[key] ?? status ?? 'pending'}</Badge>;
}
