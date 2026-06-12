export const reviewKeys = {
  all: ['reviews'] as const,
  product: (slug: string) => [...reviewKeys.all, 'product', slug] as const,
};
