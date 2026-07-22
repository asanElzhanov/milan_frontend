export type CheckoutAddressMode = 'saved' | 'manual';

export type CheckoutPaymentMethod = 'freedom' | string;

export type CheckoutPayload = {
  customer_name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  city?: string;
  delivery_address?: string;
  delivery_method?: string;
  delivery_method_id?: string | number;
  delivery_method_code?: string;
  comment?: string;
  cart_token?: string;
  promo_code?: string;
};

export type CheckoutFormValues = {
  customerFullName: string;
  customerEmail: string;
  customerPhone: string;
  addressMode: CheckoutAddressMode;
  addressId: string;
  manualAddress: {
    title?: string;
    recipientName: string;
    phone: string;
    country: string;
    region: string;
    city: string;
    district: string;
    street: string;
    house: string;
    apartment: string;
    postalCode: string;
    addressLine1: string;
    addressLine2: string;
    comment: string;
    isDefault: boolean;
  };
  deliveryMethodId: string;
  paymentMethod: CheckoutPaymentMethod;
  comment: string;
};
