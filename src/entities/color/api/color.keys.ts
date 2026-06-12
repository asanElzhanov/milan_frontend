export const colorKeys = {
  all: ['colors'] as const,
  lists: () => [...colorKeys.all, 'list'] as const,
  list: (params?: { active?: boolean }) => [...colorKeys.lists(), params] as const,
};
