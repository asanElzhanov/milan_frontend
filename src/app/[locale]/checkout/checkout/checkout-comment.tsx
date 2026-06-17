import { Textarea } from '@/shared/ui';

import type { CheckoutDictionary } from './checkout.dictionary';

type CheckoutCommentProps = {
  disabled?: boolean;
  labels: CheckoutDictionary;
  value: string;
  onChange: (value: string) => void;
};

export function CheckoutComment({
  disabled = false,
  labels,
  onChange,
  value,
}: CheckoutCommentProps) {
  return (
    <section className="sara-card space-y-5 p-6">
      <h2 className="font-fashion text-3xl text-sara-black">{labels.commentTitle}</h2>
      <Textarea
        disabled={disabled}
        label={labels.comment}
        onChange={(event) => onChange(event.target.value)}
        placeholder={labels.orderCommentPlaceholder}
        value={value}
      />
    </section>
  );
}
