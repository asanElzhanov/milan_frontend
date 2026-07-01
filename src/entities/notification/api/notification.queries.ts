'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getAccessToken } from '@/shared/api';

import type { NotificationFilters, NotificationListResponse } from '../model/notification.types';
import { notificationApi } from './notification.api';
import { notificationKeys } from './notification.keys';

export function useNotificationsQuery(
  params?: NotificationFilters,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: notificationKeys.list(params),
    queryFn: () => notificationApi.getNotifications(params),
    enabled: options?.enabled ?? Boolean(getAccessToken()),
    retry: 1,
  });
}

export function useMarkNotificationReadMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => notificationApi.markAsRead(id),
    retry: false,
    onSuccess: async (_response, id) => {
      queryClient.setQueriesData<NotificationListResponse>(
        { queryKey: notificationKeys.lists() },
        (current) =>
          current
            ? {
                ...current,
                unreadCount: Math.max(current.unreadCount - 1, 0),
                notifications: current.notifications.map((notification) =>
                  notification.id === id ? { ...notification, isRead: true } : notification,
                ),
              }
            : current,
      );

      await queryClient.invalidateQueries({ queryKey: notificationKeys.lists() });
    },
  });
}

export function useMarkAllNotificationsReadMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationApi.markAllAsRead(),
    retry: false,
    onSuccess: async (response) => {
      queryClient.setQueriesData<NotificationListResponse>(
        { queryKey: notificationKeys.lists() },
        (current) =>
          current
            ? {
                ...current,
                unreadCount: 0,
                notifications: current.notifications.map((notification) => ({
                  ...notification,
                  isRead: true,
                })),
              }
            : current,
      );

      if (response) {
        queryClient.setQueryData(notificationKeys.list(), response);
      }

      await queryClient.invalidateQueries({ queryKey: notificationKeys.lists() });
    },
  });
}
