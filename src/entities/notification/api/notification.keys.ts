export const notificationKeys = {
  all: ['notifications'] as const,
  lists: () => [...notificationKeys.all, 'list'] as const,
  list: (params?: { page?: number }) => [...notificationKeys.lists(), params] as const,
};
