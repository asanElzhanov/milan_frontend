import type { CheckoutFormValues } from '@/features/checkout';
import { Input, Textarea } from '@/shared/ui';

import type { CheckoutDictionary } from './checkout.dictionary';

type ManualAddressValues = CheckoutFormValues['manualAddress'];

type CheckoutManualAddressProps = {
  disabled?: boolean;
  errors: Partial<Record<string, string>>;
  labels: CheckoutDictionary;
  values: ManualAddressValues;
  onChange: <Key extends keyof ManualAddressValues>(
    key: Key,
    value: ManualAddressValues[Key],
  ) => void;
};

const fieldError = (
  errors: Partial<Record<string, string>>,
  key: string,
  labels: CheckoutDictionary,
) => (errors[key] ? labels.requiredField : undefined);

export function CheckoutManualAddress({
  disabled = false,
  errors,
  labels,
  onChange,
  values,
}: CheckoutManualAddressProps) {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          disabled={disabled}
          error={fieldError(errors, 'manualAddress.recipientName', labels)}
          label={labels.recipientName}
          onChange={(event) => onChange('recipientName', event.target.value)}
          required
          value={values.recipientName}
        />
        <Input
          disabled={disabled}
          error={fieldError(errors, 'manualAddress.phone', labels)}
          label={labels.phone}
          onChange={(event) => onChange('phone', event.target.value)}
          required
          type="tel"
          value={values.phone}
        />
        <Input
          disabled={disabled}
          label={labels.country}
          onChange={(event) => onChange('country', event.target.value)}
          value={values.country}
        />
        <Input
          disabled={disabled}
          label={labels.region}
          onChange={(event) => onChange('region', event.target.value)}
          value={values.region}
        />
        <Input
          disabled={disabled}
          error={fieldError(errors, 'manualAddress.city', labels)}
          label={labels.city}
          onChange={(event) => onChange('city', event.target.value)}
          required
          value={values.city}
        />
        <Input
          disabled={disabled}
          label={labels.district}
          onChange={(event) => onChange('district', event.target.value)}
          value={values.district}
        />
        <Input
          disabled={disabled}
          error={fieldError(errors, 'manualAddress.street', labels)}
          label={labels.street}
          onChange={(event) => onChange('street', event.target.value)}
          value={values.street}
        />
        <Input
          disabled={disabled}
          label={labels.house}
          onChange={(event) => onChange('house', event.target.value)}
          value={values.house}
        />
        <Input
          disabled={disabled}
          label={labels.apartment}
          onChange={(event) => onChange('apartment', event.target.value)}
          value={values.apartment}
        />
        <Input
          disabled={disabled}
          label={labels.postalCode}
          onChange={(event) => onChange('postalCode', event.target.value)}
          value={values.postalCode}
        />
      </div>
      <Textarea
        disabled={disabled}
        error={fieldError(errors, 'manualAddress.addressLine1', labels)}
        label={labels.addressLine1}
        onChange={(event) => onChange('addressLine1', event.target.value)}
        value={values.addressLine1}
      />
      <Textarea
        disabled={disabled}
        label={labels.addressLine2}
        onChange={(event) => onChange('addressLine2', event.target.value)}
        value={values.addressLine2}
      />
      <Textarea
        disabled={disabled}
        label={labels.comment}
        onChange={(event) => onChange('comment', event.target.value)}
        value={values.comment}
      />
    </div>
  );
}
