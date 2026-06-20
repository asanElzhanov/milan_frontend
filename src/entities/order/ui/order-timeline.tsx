import { Check } from 'lucide-react';

import { cn } from '@/shared/lib';

import type { OrderStatus } from '../model/order.types';

export type OrderTimelineProps = {
  status?: OrderStatus | null;
  labels: {
    created: string;
    processing: string;
    shipped: string;
    delivered: string;
    cancelled: string;
  };
};

const steps = ['created', 'processing', 'shipped', 'delivered'] as const;

const statusStepIndex = (status?: OrderStatus | null): number => {
  const normalized = String(status ?? '').toLowerCase();

  if (['draft', 'pending', 'created', 'confirmed'].includes(normalized)) {
    return 0;
  }

  if (['processing', 'packed'].includes(normalized)) {
    return 1;
  }

  if (normalized === 'shipped') {
    return 2;
  }

  if (['delivered', 'completed'].includes(normalized)) {
    return 3;
  }

  return 0;
};

export function OrderTimeline({ labels, status }: OrderTimelineProps) {
  const normalized = String(status ?? '').toLowerCase();
  const isCancelled = ['cancelled', 'failed'].includes(normalized);
  const activeIndex = statusStepIndex(status);

  if (isCancelled) {
    return (
      <div className="border border-red-700/25 bg-red-50 p-4 text-sm text-red-900">
        {labels.cancelled}
      </div>
    );
  }

  return (
    <ol className="grid gap-3 sm:grid-cols-4">
      {steps.map((step, index) => {
        const isComplete = index <= activeIndex;

        return (
          <li
            className={cn(
              'flex items-center gap-3 border p-3 text-sm',
              isComplete
                ? 'border-sara-bronze bg-sara-beige text-sara-graphite'
                : 'border-sara-beige-dark bg-white text-sara-graphite/55',
            )}
            key={step}
          >
            <span
              className={cn(
                'flex h-7 w-7 shrink-0 items-center justify-center border',
                isComplete
                  ? 'border-sara-bronze bg-sara-bronze text-white'
                  : 'border-sara-beige-dark bg-white',
              )}
            >
              {isComplete ? <Check aria-hidden className="h-4 w-4" /> : index + 1}
            </span>
            <span>{labels[step]}</span>
          </li>
        );
      })}
    </ol>
  );
}
