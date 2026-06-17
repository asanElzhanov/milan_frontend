'use client';

import type { Address } from '@/entities/address';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui';

import type { AddressBookDictionary } from '../address-book.dictionary';

export function AddressDeleteDialog({
  address,
  isDeleting,
  labels,
  onConfirm,
  onOpenChange,
}: {
  address: Address | null;
  labels: AddressBookDictionary;
  isDeleting?: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={Boolean(address)} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{labels.deleteTitle}</DialogTitle>
          <DialogDescription>{labels.deleteDescription}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={isDeleting}
            onClick={() => onOpenChange(false)}
            type="button"
            variant="ghost"
          >
            {labels.cancel}
          </Button>
          <Button loading={isDeleting} onClick={onConfirm} type="button" variant="danger">
            {labels.deleteAddress}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
