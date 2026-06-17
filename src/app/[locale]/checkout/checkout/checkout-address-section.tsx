import type { Address } from '@/entities/address';
import type { CheckoutAddressMode, CheckoutFormValues } from '@/features/checkout';
import { Button } from '@/shared/ui';

import { CheckoutManualAddress } from './checkout-manual-address';
import { CheckoutSavedAddresses } from './checkout-saved-addresses';
import type { CheckoutDictionary } from './checkout.dictionary';

type CheckoutAddressSectionProps = {
  addresses: Address[];
  canUseSavedAddresses: boolean;
  disabled?: boolean;
  errors: Partial<Record<string, string>>;
  labels: CheckoutDictionary;
  values: CheckoutFormValues;
  onAddressModeChange: (mode: CheckoutAddressMode) => void;
  onAddressIdChange: (addressId: string) => void;
  onManualAddressChange: <Key extends keyof CheckoutFormValues['manualAddress']>(
    key: Key,
    value: CheckoutFormValues['manualAddress'][Key],
  ) => void;
};

export function CheckoutAddressSection({
  addresses,
  canUseSavedAddresses,
  disabled = false,
  errors,
  labels,
  onAddressIdChange,
  onAddressModeChange,
  onManualAddressChange,
  values,
}: CheckoutAddressSectionProps) {
  const showSavedAddresses = canUseSavedAddresses && values.addressMode === 'saved';

  return (
    <section className="sara-card space-y-5 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-fashion text-3xl text-sara-black">{labels.addressTitle}</h2>
        <div className="flex flex-wrap gap-2">
          {canUseSavedAddresses ? (
            <Button
              disabled={disabled}
              onClick={() => onAddressModeChange('saved')}
              size="sm"
              type="button"
              variant={values.addressMode === 'saved' ? 'primary' : 'outline'}
            >
              {labels.savedAddress}
            </Button>
          ) : null}
          <Button
            disabled={disabled}
            onClick={() => onAddressModeChange('manual')}
            size="sm"
            type="button"
            variant={values.addressMode === 'manual' ? 'primary' : 'outline'}
          >
            {labels.manualAddress}
          </Button>
        </div>
      </div>

      {showSavedAddresses ? (
        <CheckoutSavedAddresses
          addresses={addresses}
          disabled={disabled}
          labels={labels}
          onSelect={onAddressIdChange}
          onUseManualAddress={() => onAddressModeChange('manual')}
          selectedAddressId={values.addressId}
        />
      ) : (
        <CheckoutManualAddress
          disabled={disabled}
          errors={errors}
          labels={labels}
          onChange={onManualAddressChange}
          values={values.manualAddress}
        />
      )}

      {errors.addressId ? <p className="text-sm text-red-700">{labels.requiredField}</p> : null}
    </section>
  );
}
