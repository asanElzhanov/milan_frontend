import { Badge } from '@/shared/ui';

import type { NotificationType } from '../model/notification.types';

export type NotificationTypeBadgeProps = {
  type?: NotificationType | null;
  label?: string;
};

const knownTypes = new Set(['order', 'payment', 'delivery', 'review', 'promo', 'system']);

export function NotificationTypeBadge({ label, type }: NotificationTypeBadgeProps) {
  const normalizedType = typeof type === 'string' ? type.trim().toLowerCase() : '';
  const isKnown = knownTypes.has(normalizedType);

  return (
    <Badge
      size="sm"
      variant={isKnown && normalizedType === 'promo' ? 'bronze' : isKnown ? 'outline' : 'muted'}
    >
      {label ?? (normalizedType || 'system')}
    </Badge>
  );
}
