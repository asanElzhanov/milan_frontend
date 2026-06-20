export const paymentKeys = {
  all: ['payment'] as const,
  status: (orderNumber: string | number) => [...paymentKeys.all, 'status', orderNumber] as const,
};
