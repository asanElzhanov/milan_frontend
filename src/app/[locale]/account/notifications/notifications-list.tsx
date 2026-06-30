import { NotificationCard, type Notification } from '@/entities/notification';

import type { NotificationsDictionary } from './notifications.dictionary';

type NotificationsListProps = {
  labels: NotificationsDictionary;
  notifications: Notification[];
};

export function NotificationsList({ labels, notifications }: NotificationsListProps) {
  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <NotificationCard
          key={String(notification.id)}
          labels={{
            open: labels.open,
            read: labels.read,
            unread: labels.unread,
          }}
          notification={notification}
        />
      ))}
    </div>
  );
}
