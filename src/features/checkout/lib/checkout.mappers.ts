import type { Address } from '@/entities/address';
import type { Cart } from '@/entities/cart';
import type { DeliveryMethod } from '@/entities/delivery-method';
import { getCartToken } from '@/shared/api';

import type { CheckoutFormValues, CheckoutPayload } from '../model/checkout.types';

const cleanString = (value: string | undefined): string | undefined => {
  const trimmed = value?.trim();

  return trimmed ? trimmed : undefined;
};

export function checkoutFormValuesToPayload(values: CheckoutFormValues): CheckoutPayload {
  return checkoutFormValuesToPayloadWithContext(values);
}

const compactAddress = (parts: Array<string | null | undefined>): string | undefined => {
  const address = parts
    .map((part) => part?.trim())
    .filter((part): part is string => Boolean(part))
    .join(', ');

  return address || undefined;
};

const splitFullName = (fullName: string): { firstName?: string; lastName?: string } => {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const [firstName, ...lastNameParts] = parts;

  return {
    firstName,
    lastName: lastNameParts.join(' ') || undefined,
  };
};

const addressToString = (address: Address): string | undefined =>
  compactAddress([
    address.addressLine1,
    address.addressLine2,
    address.country,
    address.region,
    address.city,
    address.district,
    address.street,
    address.house,
    address.apartment ? `apt. ${address.apartment}` : undefined,
    address.postalCode,
  ]);

const manualAddressToString = (address: CheckoutFormValues['manualAddress']): string | undefined =>
  compactAddress([
    cleanString(address.addressLine1),
    cleanString(address.addressLine2),
    cleanString(address.country),
    cleanString(address.region),
    cleanString(address.city),
    cleanString(address.district),
    cleanString(address.street),
    cleanString(address.house),
    cleanString(address.apartment) ? `apt. ${cleanString(address.apartment)}` : undefined,
    cleanString(address.postalCode),
  ]);

export function checkoutFormValuesToPayloadWithContext(
  values: CheckoutFormValues,
  context: {
    addresses?: Address[];
    deliveryMethods?: DeliveryMethod[];
    cart?: Cart | null;
  } = {},
): CheckoutPayload {
  const customerName = cleanString(values.customerFullName);
  const nameParts = splitFullName(customerName ?? '');
  const selectedAddress = context.addresses?.find(
    (address) => String(address.id) === values.addressId,
  );
  const selectedDeliveryMethod = context.deliveryMethods?.find(
    (method) => String(method.id) === values.deliveryMethodId,
  );
  const payload: CheckoutPayload = {
    customer_name: customerName,
    first_name: nameParts.firstName,
    last_name: nameParts.lastName,
    email: cleanString(values.customerEmail),
    phone: cleanString(values.customerPhone),
    city:
      values.addressMode === 'saved'
        ? (selectedAddress?.city ?? undefined)
        : cleanString(values.manualAddress.city),
    delivery_method_id: cleanString(values.deliveryMethodId),
    delivery_method:
      selectedDeliveryMethod?.deliveryType ?? selectedDeliveryMethod?.code ?? undefined,
    delivery_method_code: selectedDeliveryMethod?.code ?? undefined,
    comment: cleanString(values.comment),
    cart_token: context.cart?.cartToken ?? getCartToken() ?? undefined,
    promo_code: context.cart?.promoCode ?? undefined,
  };

  if (values.addressMode === 'saved') {
    payload.delivery_address = selectedAddress ? addressToString(selectedAddress) : undefined;
  } else {
    payload.delivery_address = manualAddressToString(values.manualAddress);
  }

  return payload;
}
