import { formatPhoneInput } from '@/shared/lib';

import type { CheckoutFormValues, CheckoutPaymentMethod } from '../model/checkout.types';

const toFormString = (value: string | number | null | undefined): string =>
  value === null || value === undefined ? '' : String(value);

export function createInitialCheckoutFormValues(args?: {
  userFullName?: string | null;
  userEmail?: string | null;
  userPhone?: string | null;
  defaultAddressId?: string | number | null;
  defaultPaymentMethod?: CheckoutPaymentMethod;
}): CheckoutFormValues {
  return {
    customerFullName: args?.userFullName ?? '',
    customerEmail: args?.userEmail ?? '',
    customerPhone: formatPhoneInput(args?.userPhone ?? ''),
    addressMode: args?.defaultAddressId ? 'saved' : 'manual',
    addressId: toFormString(args?.defaultAddressId),
    manualAddress: {
      title: '',
      recipientName: '',
      phone: '',
      country: '',
      region: '',
      city: '',
      district: '',
      street: '',
      house: '',
      apartment: '',
      postalCode: '',
      addressLine1: '',
      addressLine2: '',
      comment: '',
      isDefault: false,
    },
    deliveryMethodId: '',
    paymentMethod: args?.defaultPaymentMethod ?? 'kaspi',
    comment: '',
  };
}
