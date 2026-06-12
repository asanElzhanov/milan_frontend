export const sizeKeys = {
  all: ['sizes'] as const,
  lists: () => [...sizeKeys.all, 'list'] as const,
  list: (params?: { active?: boolean }) => [...sizeKeys.lists(), params] as const,
};
