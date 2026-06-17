import { Button, ErrorState } from '@/shared/ui';

import type { CartDictionary } from './cart.dictionary';

type CartErrorStateProps = {
  labels: CartDictionary;
  onRetry: () => void;
};

export function CartErrorState({ labels, onRetry }: CartErrorStateProps) {
  return (
    <ErrorState
      action={<Button onClick={onRetry}>{labels.retry}</Button>}
      description={labels.updateError}
      title={labels.title}
    />
  );
}
