export type DeliveryMethodPriceType =
  | 'fixed'
  | 'free'
  | 'manager_calculation'
  | 'calculated'
  | string;

export type DeliveryMethod = {
  id: string | number;
  code?: string | null;
  slug?: string | null;
  name: string;
  deliveryType?: string | null;
  description?: string | null;
  price?: number | string | null;
  basePrice?: number | string | null;
  priceType?: DeliveryMethodPriceType | null;
  freeFromAmount?: number | string | null;
  isFree?: boolean;
  isActive?: boolean;
  requiresManagerCalculation?: boolean;
  sortOrder?: number | null;
};
