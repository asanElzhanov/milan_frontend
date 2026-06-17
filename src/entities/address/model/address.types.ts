export type Address = {
  id: string | number;
  title?: string | null;
  recipientName?: string | null;
  fullName?: string | null;
  phone?: string | null;
  country?: string | null;
  region?: string | null;
  city?: string | null;
  district?: string | null;
  street?: string | null;
  house?: string | null;
  apartment?: string | null;
  postalCode?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
  comment?: string | null;
  isDefault?: boolean;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type AddressPayload = {
  title?: string;
  recipient_name?: string;
  full_name?: string;
  phone?: string;
  country?: string;
  region?: string;
  city?: string;
  district?: string;
  street?: string;
  house?: string;
  apartment?: string;
  postal_code?: string;
  address_line_1?: string;
  address_line_2?: string;
  comment?: string;
  is_default?: boolean;
};

export type CreateAddressPayload = AddressPayload;

export type UpdateAddressPayload = Partial<AddressPayload>;
