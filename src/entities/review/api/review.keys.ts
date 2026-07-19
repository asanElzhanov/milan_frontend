export const reviewKeys = {
  all: ['reviews'] as const,
  product: (slug: string, page = 1) => [...reviewKeys.all, 'product', slug, page] as const,
  account: (params?: { page?: number }) => [...reviewKeys.all, 'account', params] as const,
};
