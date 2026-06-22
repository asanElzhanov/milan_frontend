export const reviewKeys = {
  all: ['reviews'] as const,
  product: (slug: string) => [...reviewKeys.all, 'product', slug] as const,
  account: (params?: { page?: number }) => [...reviewKeys.all, 'account', params] as const,
};
