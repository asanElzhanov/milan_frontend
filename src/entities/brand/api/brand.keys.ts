export const brandKeys = {
  all: ['brands'] as const,
  lists: () => [...brandKeys.all, 'list'] as const,
  list: (params?: { active?: boolean }) => [...brandKeys.lists(), params] as const,
  detail: (slug: string) => [...brandKeys.all, 'detail', slug] as const,
};
