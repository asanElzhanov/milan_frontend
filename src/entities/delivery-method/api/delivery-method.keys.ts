export const deliveryMethodKeys = {
  all: ['delivery-methods'] as const,
  list: () => [...deliveryMethodKeys.all, 'list'] as const,
};
