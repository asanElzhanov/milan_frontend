import { ApiError, apiClient, isMockApiMode } from '@/shared/api';

import { adaptNotificationList, createEmptyNotificationList } from '../lib/notification.adapters';
import type { NotificationFilters, NotificationListResponse } from '../model/notification.types';

const NOTIFICATIONS_ENDPOINT = '/api/v1/notifications/';
const NOTIFICATIONS_MARK_ALL_READ_ENDPOINT = '/api/v1/notifications/mark-all-read/';
const NOTIFICATIONS_READ_ALL_ENDPOINT = '/api/v1/notifications/read-all/';
const NOTIFICATIONS_MUTATION_DISABLED = 'Notification changes are disabled in the current API mode';

export const notificationEndpointConfig = {
  list: NOTIFICATIONS_ENDPOINT,
  markAllRead: NOTIFICATIONS_MARK_ALL_READ_ENDPOINT,
  readAll: NOTIFICATIONS_READ_ALL_ENDPOINT,
} as const;

export const notificationApi = {
  async getNotifications(params?: NotificationFilters): Promise<NotificationListResponse> {
    const page = params?.page && params.page > 0 ? params.page : 1;

    if (isMockApiMode) {
      return createEmptyNotificationList(page);
    }

    const response = await apiClient.get<unknown>(notificationEndpointConfig.list, {
      cartToken: false,
      query: {
        ...(page > 1 ? { page } : {}),
        ...(params?.is_read !== undefined ? { is_read: params.is_read } : {}),
        ...(params?.event_type ? { event_type: params.event_type } : {}),
      },
    });

    return adaptNotificationList(response);
  },

  async markAsRead(id: string | number): Promise<NotificationListResponse | null> {
    if (isMockApiMode) {
      throw new ApiError({
        status: 503,
        message: NOTIFICATIONS_MUTATION_DISABLED,
        code: 'notifications_mock_mode',
      });
    }

    const response = await apiClient.post<unknown>(
      `/api/v1/notifications/${encodeURIComponent(String(id))}/mark-read/`,
      undefined,
      {
        cartToken: false,
      },
    );

    return response === undefined || response === null ? null : adaptNotificationList(response);
  },

  async markAllAsRead(): Promise<NotificationListResponse | null> {
    if (isMockApiMode) {
      throw new ApiError({
        status: 503,
        message: NOTIFICATIONS_MUTATION_DISABLED,
        code: 'notifications_mock_mode',
      });
    }

    let response: unknown;

    try {
      response = await apiClient.post<unknown>(notificationEndpointConfig.markAllRead, undefined, {
        cartToken: false,
      });
    } catch {
      response = await apiClient.post<unknown>(notificationEndpointConfig.readAll, undefined, {
        cartToken: false,
      });
    }

    return response === undefined || response === null ? null : adaptNotificationList(response);
  },
};
