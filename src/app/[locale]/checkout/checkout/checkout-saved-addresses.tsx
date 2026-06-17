import type { Address } from '@/entities/address';
import { formatAddressLine, formatAddressRecipient } from '@/entities/address';
import { Badge, Button, EmptyState } from '@/shared/ui';

import type { CheckoutDictionary } from './checkout.dictionary';

type CheckoutSavedAddressesProps = {
  addresses: Address[];
  disabled?: boolean;
  labels: CheckoutDictionary;
  selectedAddressId: string;
  onSelect: (addressId: string) => void;
  onUseManualAddress: () => void;
};

export function CheckoutSavedAddresses({
  addresses,
  disabled = false,
  labels,
  onSelect,
  onUseManualAddress,
  selectedAddressId,
}: CheckoutSavedAddressesProps) {
  if (addresses.length === 0) {
    return (
      <EmptyState
        className="py-8"
        title={labels.addressesEmpty}
        action={
          <Button onClick={onUseManualAddress} type="button" variant="outline">
            {labels.useManualAddress}
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-3">
      {addresses.map((address) => {
        const addressId = String(address.id);
        const isSelected = selectedAddressId === addressId;

        return (
          <label
            className="sara-focus flex cursor-pointer gap-3 border border-sara-beige-dark bg-sara-white p-4 transition-colors has-[:checked]:border-sara-graphite has-[:checked]:bg-sara-beige/35"
            key={addressId}
          >
            <input
              checked={isSelected}
              className="mt-1 h-4 w-4 accent-sara-graphite"
              disabled={disabled}
              name="checkout-address"
              onChange={() => onSelect(addressId)}
              type="radio"
              value={addressId}
            />
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-center gap-2">
                <span className="font-medium text-sara-black">
                  {formatAddressRecipient(address)}
                </span>
                {address.isDefault ? (
                  <Badge size="sm" variant="muted">
                    {labels.defaultAddress}
                  </Badge>
                ) : null}
                {isSelected ? (
                  <Badge size="sm" variant="outline">
                    {labels.selected}
                  </Badge>
                ) : null}
              </span>
              <span className="mt-2 block text-sm leading-6 text-sara-graphite/70">
                {formatAddressLine(address) || labels.address}
              </span>
              {address.phone ? (
                <span className="mt-1 block text-caption text-sara-graphite/60">
                  {address.phone}
                </span>
              ) : null}
            </span>
          </label>
        );
      })}

      <Button disabled={disabled} onClick={onUseManualAddress} type="button" variant="ghost">
        {labels.useManualAddress}
      </Button>
    </div>
  );
}
