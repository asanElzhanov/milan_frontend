import {
  getDeliveryMethodPrice,
  isManagerCalculationDelivery,
  type DeliveryMethod,
} from '@/entities/delivery-method';
import { Badge, Price, Skeleton } from '@/shared/ui';

import type { CheckoutDictionary } from './checkout.dictionary';

type CheckoutDeliveryMethodsProps = {
  disabled?: boolean;
  error?: string;
  isLoading?: boolean;
  labels: CheckoutDictionary;
  methods: DeliveryMethod[];
  selectedMethodId: string;
  onSelect: (methodId: string) => void;
};

export function CheckoutDeliveryMethods({
  disabled = false,
  error,
  isLoading = false,
  labels,
  methods,
  onSelect,
  selectedMethodId,
}: CheckoutDeliveryMethodsProps) {
  return (
    <section className="sara-card space-y-5 p-6">
      <h2 className="font-fashion text-3xl text-sara-black">{labels.deliveryMethodTitle}</h2>

      {isLoading ? (
        <div className="grid gap-3 md:grid-cols-2">
          <Skeleton className="h-28" variant="text" />
          <Skeleton className="h-28" variant="text" />
        </div>
      ) : null}

      {!isLoading && methods.length === 0 ? (
        <div className="border border-sara-beige-dark bg-sara-beige/35 p-4 text-sm text-sara-graphite/70">
          {labels.deliveryMethodsEmpty}
        </div>
      ) : null}

      {!isLoading && methods.length > 0 ? (
        <div className="grid gap-3 md:grid-cols-2">
          {methods.map((method) => {
            const methodId = String(method.id);
            const price = getDeliveryMethodPrice(method);
            const managerCalculation = isManagerCalculationDelivery(method);
            const isSelected = selectedMethodId === methodId;

            return (
              <label
                className="sara-focus flex cursor-pointer gap-3 border border-sara-beige-dark bg-sara-white p-4 transition-colors has-[:checked]:border-sara-graphite has-[:checked]:bg-sara-beige/35"
                key={methodId}
              >
                <input
                  checked={isSelected}
                  className="mt-1 h-4 w-4 accent-sara-graphite"
                  disabled={disabled}
                  name="delivery-method"
                  onChange={() => onSelect(methodId)}
                  type="radio"
                  value={methodId}
                />
                <span className="min-w-0 flex-1">
                  <span className="flex items-start justify-between gap-3">
                    <span className="font-medium text-sara-black">{method.name}</span>
                    {managerCalculation ? (
                      <Badge size="sm" variant="muted">
                        {labels.managerCalculation}
                      </Badge>
                    ) : price === 0 || method.isFree ? (
                      <Badge size="sm" variant="success">
                        {labels.freeDelivery}
                      </Badge>
                    ) : price !== null ? (
                      <Price size="sm" value={price} />
                    ) : null}
                  </span>
                  {method.description ? (
                    <span className="mt-2 block text-sm leading-6 text-sara-graphite/65">
                      {method.description}
                    </span>
                  ) : null}
                </span>
              </label>
            );
          })}
        </div>
      ) : null}

      {error ? <p className="text-sm text-red-700">{labels.requiredField}</p> : null}
    </section>
  );
}
