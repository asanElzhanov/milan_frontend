export const categoryKeys = {
  all: ['categories'] as const,
  lists: () => [...categoryKeys.all, 'list'] as const,
  list: (params?: { active?: boolean }) => [...categoryKeys.lists(), params] as const,
  tree: (params?: { active?: boolean }) => [...categoryKeys.all, 'tree', params] as const,
  detail: (slug: string) => [...categoryKeys.all, 'detail', slug] as const,
};
