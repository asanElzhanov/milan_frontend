export const notificationKeys = {
  all: ['notifications'] as const,
  lists: () => [...notificationKeys.all, 'list'] as const,
  list: (params?: { is_read?: boolean; event_type?: string; page?: number }) =>
    [...notificationKeys.lists(), params] as const,
};
