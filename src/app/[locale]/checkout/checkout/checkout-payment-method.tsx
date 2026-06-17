import type { CheckoutPaymentMethod } from '@/features/checkout';
import { Alert } from '@/shared/ui';

import type { CheckoutDictionary } from './checkout.dictionary';

type CheckoutPaymentMethodProps = {
  disabled?: boolean;
  labels: CheckoutDictionary;
  value: CheckoutPaymentMethod;
  onChange: (value: CheckoutPaymentMethod) => void;
};

export function CheckoutPaymentMethod({
  disabled = false,
  labels,
  onChange,
  value,
}: CheckoutPaymentMethodProps) {
  const options: Array<{ value: CheckoutPaymentMethod; label: string }> = [
    { value: 'kaspi', label: labels.kaspi },
    { value: 'stripe', label: labels.stripe },
    { value: 'cash', label: labels.cash },
  ];

  return (
    <section className="sara-card space-y-5 p-6">
      <h2 className="font-fashion text-3xl text-sara-black">{labels.paymentTitle}</h2>
      <div className="grid gap-3 md:grid-cols-3">
        {options.map((option) => (
          <label
            className="sara-focus flex cursor-pointer gap-3 border border-sara-beige-dark bg-sara-white p-4 transition-colors has-[:checked]:border-sara-graphite has-[:checked]:bg-sara-beige/35"
            key={option.value}
          >
            <input
              checked={value === option.value}
              className="mt-1 h-4 w-4 accent-sara-graphite"
              disabled={disabled}
              name="payment-method"
              onChange={() => onChange(option.value)}
              type="radio"
              value={option.value}
            />
            <span className="font-medium text-sara-black">{option.label}</span>
          </label>
        ))}
      </div>
      <Alert variant="info">{labels.paymentComingNext}</Alert>
    </section>
  );
}
