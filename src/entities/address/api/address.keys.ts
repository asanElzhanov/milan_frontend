export const addressKeys = {
  all: ['addresses'] as const,
  lists: () => [...addressKeys.all, 'list'] as const,
  list: () => [...addressKeys.lists()] as const,
  detail: (id: string | number) => [...addressKeys.all, 'detail', id] as const,
};
