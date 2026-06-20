export const orderKeys = {
  all: ['orders'] as const,
  lists: () => [...orderKeys.all, 'list'] as const,
  list: (params?: { page?: number }) => [...orderKeys.lists(), params] as const,
  detail: (orderNumber: string | number) => [...orderKeys.all, 'detail', orderNumber] as const,
};
