import { Input } from '@/shared/ui';
import { formatPhoneInput } from '@/shared/lib';

import type { CheckoutDictionary } from './checkout.dictionary';

type CheckoutCustomerValues = {
  customerFullName: string;
  customerEmail: string;
  customerPhone: string;
};

type CheckoutCustomerFormProps = {
  disabled?: boolean;
  errors: Partial<Record<string, string>>;
  labels: CheckoutDictionary;
  values: CheckoutCustomerValues;
  onChange: <Key extends keyof CheckoutCustomerValues>(
    key: Key,
    value: CheckoutCustomerValues[Key],
  ) => void;
};

const fieldError = (
  errors: Partial<Record<string, string>>,
  key: string,
  labels: CheckoutDictionary,
) => (errors[key] ? labels.requiredField : undefined);

export function CheckoutCustomerForm({
  disabled = false,
  errors,
  labels,
  onChange,
  values,
}: CheckoutCustomerFormProps) {
  return (
    <section className="sara-card space-y-5 p-6">
      <h2 className="font-fashion text-3xl text-sara-black">{labels.contactTitle}</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <Input
          disabled={disabled}
          error={fieldError(errors, 'customerFullName', labels)}
          label={labels.fullName}
          onChange={(event) => onChange('customerFullName', event.target.value)}
          required
          value={values.customerFullName}
        />
        <Input
          disabled={disabled}
          label={labels.email}
          onChange={(event) => onChange('customerEmail', event.target.value)}
          type="email"
          value={values.customerEmail}
        />
        <Input
          disabled={disabled}
          error={fieldError(errors, 'customerPhone', labels)}
          label={labels.phone}
          onChange={(event) => onChange('customerPhone', formatPhoneInput(event.target.value))}
          required
          type="tel"
          value={values.customerPhone}
        />
      </div>
    </section>
  );
}
