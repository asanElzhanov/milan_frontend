import { Badge } from '@/shared/ui';

import type { OrderStatus } from '../model/order.types';

export type OrderStatusBadgeProps = {
  status?: OrderStatus | null;
  labels?: Partial<Record<string, string>>;
};

const statusVariants = {
  delivered: 'success',
  completed: 'success',
  cancelled: 'danger',
  failed: 'danger',
  shipped: 'bronze',
  packed: 'bronze',
  confirmed: 'warning',
  processing: 'warning',
  pending: 'warning',
  created: 'muted',
  draft: 'muted',
} as const;

export function OrderStatusBadge({ labels, status }: OrderStatusBadgeProps) {
  const key = String(status ?? 'pending').toLowerCase();
  const variant = statusVariants[key as keyof typeof statusVariants] ?? 'outline';

  return <Badge variant={variant}>{labels?.[key] ?? status ?? 'pending'}</Badge>;
}
