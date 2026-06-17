import type { Address } from '@/entities/address';

export type AddressFormValues = {
  title: string;
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

export function getInitialAddressFormValues(address?: Address | null): AddressFormValues {
  return {
    title: address?.title ?? '',
    recipientName: address?.recipientName ?? address?.fullName ?? '',
    phone: address?.phone ?? '',
    country: address?.country ?? '',
    region: address?.region ?? '',
    city: address?.city ?? '',
    district: address?.district ?? '',
    street: address?.street ?? '',
    house: address?.house ?? '',
    apartment: address?.apartment ?? '',
    postalCode: address?.postalCode ?? '',
    addressLine1: address?.addressLine1 ?? '',
    addressLine2: address?.addressLine2 ?? '',
    comment: address?.comment ?? '',
    isDefault: Boolean(address?.isDefault),
  };
}
