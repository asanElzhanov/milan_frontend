import { Plus } from 'lucide-react';

import { Button, EmptyState } from '@/shared/ui';

import type { AddressBookDictionary } from '../address-book.dictionary';

export function AddressEmptyState({
  labels,
  onAdd,
}: {
  labels: AddressBookDictionary;
  onAdd: () => void;
}) {
  return (
    <EmptyState
      action={
        <Button onClick={onAdd} type="button">
          <Plus aria-hidden className="h-4 w-4" />
          {labels.addAddress}
        </Button>
      }
      description={labels.emptyDescription}
      title={labels.emptyTitle}
    />
  );
}
