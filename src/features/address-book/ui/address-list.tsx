import type { Address } from '@/entities/address';

import type { AddressBookDictionary } from '../address-book.dictionary';
import { AddressCard } from './address-card';

export function AddressList({
  addresses,
  isPending,
  labels,
  onDelete,
  onEdit,
  onSetDefault,
}: {
  addresses: Address[];
  labels: AddressBookDictionary;
  isPending?: boolean;
  onEdit: (address: Address) => void;
  onDelete: (address: Address) => void;
  onSetDefault: (address: Address) => void;
}) {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {addresses.map((address) => (
        <AddressCard
          address={address}
          isPending={isPending}
          key={address.id}
          labels={labels}
          onDelete={onDelete}
          onEdit={onEdit}
          onSetDefault={onSetDefault}
        />
      ))}
    </div>
  );
}
