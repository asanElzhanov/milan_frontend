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
  return (
    <section className="sara-card space-y-5 p-6">
      <h2 className="font-fashion text-3xl text-sara-black">{labels.paymentTitle}</h2>
      <label className="sara-focus flex cursor-pointer gap-3 border border-sara-graphite bg-sara-beige/35 p-4">
        <input
          checked={value === 'freedom'}
          className="mt-1 h-4 w-4 accent-sara-graphite"
          disabled={disabled}
          name="payment-method"
          onChange={() => onChange('freedom')}
          type="radio"
          value="freedom"
        />
        <span className="font-medium text-sara-black">{labels.freedom}</span>
      </label>
      <Alert variant="info">{labels.paymentComingNext}</Alert>
    </section>
  );
}
