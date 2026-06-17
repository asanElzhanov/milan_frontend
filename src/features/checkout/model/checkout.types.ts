import type { AddressPayload } from '@/entities/address';

export type CheckoutCustomerPayload = {
  full_name?: string;
  email?: string;
  phone?: string;
};

export type CheckoutAddressMode = 'saved' | 'manual';

export type CheckoutPaymentMethod = 'kaspi' | 'stripe' | 'cash' | string;

export type CheckoutPayload = {
  customer?: CheckoutCustomerPayload;
  address_id?: string | number;
  delivery_address?: AddressPayload;
  delivery_method_id?: string | number;
  delivery_method_code?: string;
  payment_method?: CheckoutPaymentMethod;
  comment?: string;
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
