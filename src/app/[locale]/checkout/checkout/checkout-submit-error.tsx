import { Alert } from '@/shared/ui';

import type { CheckoutDictionary } from './checkout.dictionary';

type CheckoutSubmitErrorProps = {
  labels: CheckoutDictionary;
  message: string;
};

export function CheckoutSubmitError({ labels, message }: CheckoutSubmitErrorProps) {
  return (
    <Alert role="alert" title={labels.checkoutError} variant="danger">
      {message}
    </Alert>
  );
}
