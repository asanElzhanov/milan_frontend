import { NotificationCard, type Notification } from '@/entities/notification';
import type { AppLocale } from '@/shared/config';

import type { NotificationsDictionary } from './notifications.dictionary';

type NotificationsListProps = {
  labels: NotificationsDictionary;
  notifications: Notification[];
  locale: AppLocale;
};

export function NotificationsList({ labels, locale, notifications }: NotificationsListProps) {
  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <NotificationCard
          key={String(notification.id)}
          locale={locale}
          labels={{
            open: labels.open,
            read: labels.read,
            unread: labels.unread,
            order: labels.order,
            payment: labels.payment,
            delivery: labels.delivery,
            review: labels.review,
            promo: labels.promo,
            system: labels.system,
          }}
          notification={notification}
        />
      ))}
    </div>
  );
}
