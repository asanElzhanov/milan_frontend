export const checkoutKeys = {
  all: ['checkout'] as const,
  mutation: () => [...checkoutKeys.all, 'mutation'] as const,
};
