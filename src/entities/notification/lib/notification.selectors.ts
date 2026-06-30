import type { Notification, NotificationListResponse } from '../model/notification.types';

export function getUnreadNotificationsCount(response?: NotificationListResponse | null): number {
  return response?.unreadCount ?? 0;
}

export function getUnreadNotifications(notifications: Notification[]): Notification[] {
  return notifications.filter((notification) => !notification.isRead);
}

export function getReadNotifications(notifications: Notification[]): Notification[] {
  return notifications.filter((notification) => notification.isRead);
}

export function isNotificationUnread(notification?: Notification | null): boolean {
  return Boolean(notification && !notification.isRead);
}

export function getNotificationHref(notification: Notification): string | null {
  return notification.link?.trim() || null;
}
