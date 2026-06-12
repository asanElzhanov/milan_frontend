export const bannerKeys = {
  all: ['banners'] as const,
  lists: () => [...bannerKeys.all, 'list'] as const,
  list: (params?: { position?: string; active?: boolean }) =>
    [...bannerKeys.lists(), params] as const,
};
