export type DeliveryMethodPriceType =
  | 'fixed'
  | 'free'
  | 'manager_calculation'
  | 'calculated'
  | string;

export type DeliveryMethod = {
  id: string | number;
  code?: string | null;
  name: string;
  description?: string | null;
  price?: number | string | null;
  priceType?: DeliveryMethodPriceType | null;
  isFree?: boolean;
  isActive?: boolean;
  requiresManagerCalculation?: boolean;
  sortOrder?: number | null;
};
