import { createAddressPayload } from '@/entities/address';

import type { CheckoutFormValues, CheckoutPayload } from '../model/checkout.types';

const cleanString = (value: string | undefined): string | undefined => {
  const trimmed = value?.trim();

  return trimmed ? trimmed : undefined;
};

export function checkoutFormValuesToPayload(values: CheckoutFormValues): CheckoutPayload {
  const payload: CheckoutPayload = {
    customer: {
      full_name: cleanString(values.customerFullName),
      email: cleanString(values.customerEmail),
      phone: cleanString(values.customerPhone),
    },
    delivery_method_id: cleanString(values.deliveryMethodId),
    payment_method: cleanString(values.paymentMethod),
    comment: cleanString(values.comment),
  };

  if (values.addressMode === 'saved') {
    payload.address_id = cleanString(values.addressId);
  } else {
    payload.delivery_address = createAddressPayload(values.manualAddress);
  }

  return payload;
}
