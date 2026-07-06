import type { Address } from '../model/address.types';

export function getDefaultAddress(addresses: Address[]): Address | null {
  return addresses.find((address) => address.isDefault) ?? addresses[0] ?? null;
}

export function formatAddressLine(address: Address): string {
  return [
    address.city,
    address.district,
    address.street || address.addressLine1,
    address.house,
    address.apartment,
    address.postalCode,
  ]
    .filter(Boolean)
    .join(', ');
}

export function formatAddressRecipient(address: Address): string {
  return address.recipientName || address.fullName || address.phone || '';
}

export function isAddressComplete(address: Address): boolean {
  return Boolean(address.city && (address.street || address.addressLine1));
}
