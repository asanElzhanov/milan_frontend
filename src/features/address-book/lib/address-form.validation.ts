import type { AddressFormValues } from '../model/address-form.types';

export type AddressFormErrors = Partial<Record<keyof AddressFormValues, string>>;

const hasValue = (value: string): boolean => value.trim().length > 0;

const isValidPhone = (value: string): boolean => {
  const normalized = value.replace(/[^\d+]/g, '');
  const digits = normalized.replace(/\D/g, '');

  if (normalized.startsWith('+7') || normalized.startsWith('8')) {
    return digits.length === 11;
  }

  return digits.length >= 10 && digits.length <= 12;
};

export function validateAddressForm(
  values: AddressFormValues,
  labels: {
    requiredField: string;
    invalidPhone: string;
  },
): AddressFormErrors {
  const errors: AddressFormErrors = {};

  if (!hasValue(values.recipientName)) {
    errors.recipientName = labels.requiredField;
  }

  if (!hasValue(values.phone)) {
    errors.phone = labels.requiredField;
  } else if (!isValidPhone(values.phone)) {
    errors.phone = labels.invalidPhone;
  }

  if (!hasValue(values.city)) {
    errors.city = labels.requiredField;
  }

  if (!hasValue(values.street) && !hasValue(values.addressLine1)) {
    errors.street = labels.requiredField;
    errors.addressLine1 = labels.requiredField;
  }

  return errors;
}

export function hasAddressFormErrors(errors: AddressFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
