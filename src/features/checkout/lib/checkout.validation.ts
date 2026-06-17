import type { CheckoutFormValues } from '../model/checkout.types';

export type CheckoutFormErrors = Partial<Record<string, string>>;

const isBlank = (value: string | undefined): boolean => !value?.trim();

export function validateCheckoutForm(values: CheckoutFormValues): CheckoutFormErrors {
  const errors: CheckoutFormErrors = {};

  if (isBlank(values.customerFullName)) {
    errors.customerFullName = 'required';
  }

  if (isBlank(values.customerPhone)) {
    errors.customerPhone = 'required';
  }

  if (values.addressMode === 'saved') {
    if (isBlank(values.addressId)) {
      errors.addressId = 'required';
    }
  } else {
    if (isBlank(values.manualAddress.recipientName)) {
      errors['manualAddress.recipientName'] = 'required';
    }

    if (isBlank(values.manualAddress.phone)) {
      errors['manualAddress.phone'] = 'required';
    }

    if (isBlank(values.manualAddress.city)) {
      errors['manualAddress.city'] = 'required';
    }

    if (isBlank(values.manualAddress.street) && isBlank(values.manualAddress.addressLine1)) {
      errors['manualAddress.street'] = 'required';
    }
  }

  if (isBlank(values.deliveryMethodId)) {
    errors.deliveryMethodId = 'required';
  }

  return errors;
}

export function hasCheckoutFormErrors(errors: CheckoutFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
