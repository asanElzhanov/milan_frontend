import { MapPin, Pencil, Star, Trash2 } from 'lucide-react';

import type { Address } from '@/entities/address';
import { formatAddressLine, formatAddressRecipient } from '@/entities/address';
import { Badge, Button } from '@/shared/ui';

import type { AddressBookDictionary } from '../address-book.dictionary';

export type AddressCardProps = {
  address: Address;
  labels: AddressBookDictionary;
  isPending?: boolean;
  onEdit: (address: Address) => void;
  onDelete: (address: Address) => void;
  onSetDefault: (address: Address) => void;
};

export function AddressCard({
  address,
  isPending = false,
  labels,
  onDelete,
  onEdit,
  onSetDefault,
}: AddressCardProps) {
  return (
    <article className="border border-sara-beige-dark bg-sara-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-medium text-sara-graphite">
              {address.title || labels.addressTitle}
            </h3>
            {address.isDefault ? <Badge variant="bronze">{labels.defaultAddress}</Badge> : null}
          </div>
          <p className="text-sm text-sara-graphite/70">{formatAddressRecipient(address)}</p>
        </div>
        <MapPin aria-hidden className="h-5 w-5 shrink-0 text-sara-bronze" />
      </div>

      <div className="mt-4 space-y-2 text-sm leading-6 text-sara-graphite/70">
        <p>{address.phone || '-'}</p>
        <p>{formatAddressLine(address) || address.addressLine2 || '-'}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Button
          disabled={isPending}
          onClick={() => onEdit(address)}
          size="sm"
          type="button"
          variant="outline"
        >
          <Pencil aria-hidden className="h-4 w-4" />
          {labels.editAddress}
        </Button>
        {!address.isDefault ? (
          <Button
            disabled={isPending}
            onClick={() => onSetDefault(address)}
            size="sm"
            type="button"
            variant="ghost"
          >
            <Star aria-hidden className="h-4 w-4" />
            {labels.setDefault}
          </Button>
        ) : null}
        <Button
          disabled={isPending}
          onClick={() => onDelete(address)}
          size="sm"
          type="button"
          variant="danger"
        >
          <Trash2 aria-hidden className="h-4 w-4" />
          {labels.deleteAddress}
        </Button>
      </div>
    </article>
  );
}
