import type { Address, AddressPayload } from '../model/address.types';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const readString = (...values: unknown[]): string | null => {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) {
      return value;
    }

    if (typeof value === 'number' && Number.isFinite(value)) {
      return String(value);
    }
  }

  return null;
};

const readBoolean = (...values: unknown[]): boolean | undefined => {
  for (const value of values) {
    if (typeof value === 'boolean') {
      return value;
    }
  }

  return undefined;
};

const unwrapAddress = (raw: unknown): unknown => {
  if (!isRecord(raw)) {
    return raw;
  }

  if (raw.address !== undefined) {
    return raw.address;
  }

  if (isRecord(raw.data)) {
    if (raw.data.address !== undefined) {
      return raw.data.address;
    }

    return raw.data;
  }

  return raw;
};

const unwrapList = (raw: unknown): unknown[] => {
  if (Array.isArray(raw)) {
    return raw;
  }

  if (!isRecord(raw)) {
    return [];
  }

  if (Array.isArray(raw.results)) {
    return raw.results;
  }

  if (Array.isArray(raw.data)) {
    return raw.data;
  }

  if (isRecord(raw.data) && Array.isArray(raw.data.results)) {
    return raw.data.results;
  }

  return [];
};

export function adaptAddress(raw: unknown): Address | null {
  const record = unwrapAddress(raw);

  if (!isRecord(record)) {
    return null;
  }

  const id = readString(record.id, record.pk);

  if (!id) {
    return null;
  }

  return {
    id,
    title: readString(record.title, record.name),
    recipientName: readString(record.recipient_name, record.receiver_name, record.contact_name),
    fullName: readString(record.full_name, record.fullName),
    phone: readString(record.phone, record.phone_number),
    country: readString(record.country),
    region: readString(record.region),
    city: readString(record.city),
    district: readString(record.district),
    street: readString(record.street),
    house: readString(record.house),
    apartment: readString(record.apartment),
    postalCode: readString(record.postal_code, record.zip, record.zip_code, record.postcode),
    addressLine1: readString(record.address_line_1, record.addressLine1),
    addressLine2: readString(record.address_line_2, record.addressLine2),
    comment: readString(record.comment),
    isDefault: readBoolean(record.is_default, record.default),
    createdAt: readString(record.created_at),
    updatedAt: readString(record.updated_at),
  };
}

export function adaptAddressList(raw: unknown): Address[] {
  return unwrapList(raw)
    .map(adaptAddress)
    .filter((address): address is Address => Boolean(address));
}

const cleanString = (value: string | undefined): string | undefined => {
  const trimmed = value?.trim();

  return trimmed ? trimmed : undefined;
};

export function createAddressPayload(input: {
  title?: string;
  recipientName?: string;
  fullName?: string;
  phone?: string;
  country?: string;
  region?: string;
  city?: string;
  district?: string;
  street?: string;
  house?: string;
  apartment?: string;
  postalCode?: string;
  addressLine1?: string;
  addressLine2?: string;
  comment?: string;
  isDefault?: boolean;
}): AddressPayload {
  return {
    title: cleanString(input.title),
    recipient_name: cleanString(input.recipientName),
    full_name: cleanString(input.fullName),
    phone: cleanString(input.phone),
    country: cleanString(input.country),
    region: cleanString(input.region),
    city: cleanString(input.city),
    district: cleanString(input.district),
    street: cleanString(input.street),
    house: cleanString(input.house),
    apartment: cleanString(input.apartment),
    postal_code: cleanString(input.postalCode),
    address_line_1: cleanString(input.addressLine1),
    address_line_2: cleanString(input.addressLine2),
    comment: cleanString(input.comment),
    is_default: input.isDefault,
  };
}
