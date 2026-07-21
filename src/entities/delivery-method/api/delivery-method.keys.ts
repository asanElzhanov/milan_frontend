export const deliveryMethodKeys = {
  all: ['delivery-methods'] as const,
  list: (locale: string) => [...deliveryMethodKeys.all, 'list', locale] as const,
};
