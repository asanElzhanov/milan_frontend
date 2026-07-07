'use client';

import { useState, type FormEvent } from 'react';

import type { Address } from '@/entities/address';
import { formatPhoneInput } from '@/shared/lib';
import { Alert, Button, Checkbox, Input, Textarea } from '@/shared/ui';

import type { AddressBookDictionary } from '../address-book.dictionary';
import {
  hasAddressFormErrors,
  validateAddressForm,
  type AddressFormErrors,
} from '../lib/address-form.validation';
import { getInitialAddressFormValues, type AddressFormValues } from '../model/address-form.types';

export type AddressFormProps = {
  initialAddress?: Address | null;
  labels: AddressBookDictionary;
  isSubmitting?: boolean;
  submitLabel: string;
  onSubmit: (values: AddressFormValues) => void | Promise<void>;
  onCancel?: () => void;
};

export function AddressForm({
  initialAddress,
  isSubmitting = false,
  labels,
  onCancel,
  onSubmit,
  submitLabel,
}: AddressFormProps) {
  const [values, setValues] = useState(() => {
    const initialValues = getInitialAddressFormValues(initialAddress);

    return {
      ...initialValues,
      phone: formatPhoneInput(initialValues.phone),
    };
  });
  const [errors, setErrors] = useState<AddressFormErrors>({});

  const updateField = <Key extends keyof AddressFormValues>(
    key: Key,
    value: AddressFormValues[Key],
  ) => setValues((current) => ({ ...current, [key]: value }));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateAddressForm(values, labels);

    setErrors(nextErrors);

    if (hasAddressFormErrors(nextErrors)) {
      return;
    }

    void onSubmit(values);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <Alert title={labels.checkoutUsageNote} variant="info" />

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          disabled={isSubmitting}
          label={labels.addressTitle}
          onChange={(event) => updateField('title', event.target.value)}
          value={values.title}
        />
        <Input
          disabled={isSubmitting}
          error={errors.recipientName}
          label={labels.recipientName}
          onChange={(event) => updateField('recipientName', event.target.value)}
          required
          value={values.recipientName}
        />
        <Input
          disabled={isSubmitting}
          error={errors.phone}
          label={labels.phone}
          onChange={(event) => updateField('phone', formatPhoneInput(event.target.value))}
          required
          type="tel"
          value={values.phone}
        />
        <Input
          disabled={isSubmitting}
          label={labels.country}
          onChange={(event) => updateField('country', event.target.value)}
          value={values.country}
        />
        <Input
          disabled={isSubmitting}
          label={labels.region}
          onChange={(event) => updateField('region', event.target.value)}
          value={values.region}
        />
        <Input
          disabled={isSubmitting}
          error={errors.city}
          label={labels.city}
          onChange={(event) => updateField('city', event.target.value)}
          required
          value={values.city}
        />
        <Input
          disabled={isSubmitting}
          label={labels.district}
          onChange={(event) => updateField('district', event.target.value)}
          value={values.district}
        />
        <Input
          disabled={isSubmitting}
          error={errors.street}
          label={labels.street}
          onChange={(event) => updateField('street', event.target.value)}
          value={values.street}
        />
        <Input
          disabled={isSubmitting}
          label={labels.house}
          onChange={(event) => updateField('house', event.target.value)}
          value={values.house}
        />
        <Input
          disabled={isSubmitting}
          label={labels.apartment}
          onChange={(event) => updateField('apartment', event.target.value)}
          value={values.apartment}
        />
        <Input
          disabled={isSubmitting}
          label={labels.postalCode}
          onChange={(event) => updateField('postalCode', event.target.value)}
          value={values.postalCode}
        />
      </div>

      <Textarea
        disabled={isSubmitting}
        error={errors.addressLine1}
        label={labels.addressLine1}
        onChange={(event) => updateField('addressLine1', event.target.value)}
        value={values.addressLine1}
      />
      <Textarea
        disabled={isSubmitting}
        label={labels.addressLine2}
        onChange={(event) => updateField('addressLine2', event.target.value)}
        value={values.addressLine2}
      />
      <Textarea
        disabled={isSubmitting}
        label={labels.comment}
        onChange={(event) => updateField('comment', event.target.value)}
        value={values.comment}
      />

      <Checkbox
        checked={values.isDefault}
        disabled={isSubmitting}
        label={labels.isDefault}
        onCheckedChange={(checked) => updateField('isDefault', checked)}
      />

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        {onCancel ? (
          <Button disabled={isSubmitting} onClick={onCancel} type="button" variant="ghost">
            {labels.cancel}
          </Button>
        ) : null}
        <Button loading={isSubmitting} type="submit">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
