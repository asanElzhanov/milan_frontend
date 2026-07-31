export const infoDocKeys = {
  all: ['info-docs'] as const,
  list: (locale: string) => [...infoDocKeys.all, locale] as const,
};
