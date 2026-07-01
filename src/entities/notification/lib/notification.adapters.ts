import { isRecord, toBooleanOrUndefined, toNumberOrNull, toStringOrNull } from '@/shared/lib';

import type { Notification, NotificationListResponse } from '../model/notification.types';

const readId = (...values: unknown[]): string | number | null => {
  for (const value of values) {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }

  return null;
};

const readString = (...values: unknown[]): string | null => {
  for (const value of values) {
    const stringValue = toStringOrNull(value);

    if (stringValue) {
      return stringValue;
    }
  }

  return null;
};

const readBoolean = (...values: unknown[]): boolean | undefined => {
  for (const value of values) {
    const booleanValue = toBooleanOrUndefined(value);

    if (booleanValue !== undefined) {
      return booleanValue;
    }
  }

  return undefined;
};

const readTitleFromMessage = (message: string | null): string | null => {
  if (!message) {
    return null;
  }

  const [firstSentence] = message.split(/[.!?\n]/);
  const fallback = firstSentence?.trim() || message.trim();

  return fallback ? fallback.slice(0, 96) : null;
};

const unwrapList = (raw: unknown): unknown => {
  if (!isRecord(raw)) {
    return raw;
  }

  if (Array.isArray(raw.results) || Array.isArray(raw.notifications)) {
    return raw;
  }

  if (Array.isArray(raw.data)) {
    return raw.data;
  }

  if (isRecord(raw.data)) {
    return raw.data;
  }

  return raw;
};

const readRawNotifications = (source: unknown, record: Record<string, unknown>): unknown[] => {
  if (Array.isArray(source)) {
    return source;
  }

  if (Array.isArray(record.results)) {
    return record.results;
  }

  if (Array.isArray(record.notifications)) {
    return record.notifications;
  }

  if (isRecord(record.data) && Array.isArray(record.data.results)) {
    return record.data.results;
  }

  if (isRecord(record.data) && Array.isArray(record.data.notifications)) {
    return record.data.notifications;
  }

  return [];
};

export const createEmptyNotificationList = (page = 1): NotificationListResponse => ({
  notifications: [],
  count: 0,
  unreadCount: 0,
  currentPage: page,
  totalPages: 1,
});

export function adaptNotification(raw: unknown): Notification | null {
  if (!isRecord(raw)) {
    return null;
  }

  const id = readId(raw.id, raw.pk, raw.uuid, raw.notification_id, raw.notificationId);

  if (id === null) {
    return null;
  }

  const message = readString(raw.message, raw.text, raw.body, raw.description);
  const title =
    readString(raw.title, raw.subject) ?? readTitleFromMessage(message) ?? 'Notification';
  const isRead = readBoolean(raw.is_read, raw.isRead, raw.read) ?? false;

  return {
    id,
    type: readString(
      raw.event_type,
      raw.eventType,
      raw.notification_type,
      raw.notificationType,
      raw.type,
    ),
    title,
    message,
    isRead,
    link: readString(
      raw.link,
      raw.url,
      raw.action_url,
      raw.actionUrl,
      raw.target_url,
      raw.targetUrl,
    ),
    createdAt: readString(raw.created_at, raw.createdAt),
    updatedAt: readString(raw.updated_at, raw.updatedAt),
  };
}

export function adaptNotificationList(raw: unknown): NotificationListResponse {
  const source = unwrapList(raw);
  const record = isRecord(source) ? source : {};
  const rawNotifications = readRawNotifications(source, record);
  const notifications = rawNotifications
    .map(adaptNotification)
    .filter((notification): notification is Notification => Boolean(notification));
  const count = toNumberOrNull(record.count) ?? notifications.length;
  const pageSize = Math.max(notifications.length, 1);
  const unreadCount =
    toNumberOrNull(record.unread_count ?? record.unreadCount) ??
    notifications.filter((notification) => !notification.isRead).length;
  const currentPage = toNumberOrNull(record.current_page ?? record.currentPage ?? record.page) ?? 1;
  const totalPages =
    toNumberOrNull(record.total_pages ?? record.totalPages) ??
    Math.max(Math.ceil(count / pageSize), 1);

  return {
    notifications,
    count,
    unreadCount,
    currentPage,
    totalPages,
  };
}
