'use client';

import { Minus, Plus } from 'lucide-react';

import { cn } from '@/shared/lib';
import { DEFAULT_LOCALE, type AppLocale } from '@/shared/config';

export type QuantitySelectorProps = {
  value: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  onChange: (value: number) => void;
  className?: string;
  locale?: AppLocale;
};

const quantityLabels: Record<AppLocale, { decrease: string; quantity: string; increase: string }> =
  {
    ru: {
      decrease: 'Уменьшить количество',
      quantity: 'Количество',
      increase: 'Увеличить количество',
    },
    kk: { decrease: 'Санын азайту', quantity: 'Саны', increase: 'Санын көбейту' },
    en: { decrease: 'Decrease quantity', quantity: 'Quantity', increase: 'Increase quantity' },
  };

const normalize = (value: number, min: number, max?: number): number => {
  const roundedValue = Number.isFinite(value) ? Math.round(value) : min;
  const upperBoundedValue = max === undefined ? roundedValue : Math.min(roundedValue, max);

  return Math.max(upperBoundedValue, min);
};

export function QuantitySelector({
  className,
  disabled = false,
  max,
  min = 1,
  onChange,
  value,
  locale = DEFAULT_LOCALE,
}: QuantitySelectorProps) {
  const labels = quantityLabels[locale];
  const safeMin = Math.max(0, Math.round(min));
  const safeMax = max === undefined ? undefined : Math.max(safeMin, Math.round(max));
  const safeValue = normalize(value, safeMin, safeMax);
  const canDecrease = !disabled && safeValue > safeMin;
  const canIncrease = !disabled && (safeMax === undefined || safeValue < safeMax);

  return (
    <div
      className={cn(
        'inline-flex h-11 items-center border border-sara-beige-dark bg-sara-white text-sara-graphite',
        disabled && 'opacity-50',
        className,
      )}
    >
      <button
        aria-label={labels.decrease}
        className="sara-focus flex h-11 w-11 items-center justify-center disabled:cursor-not-allowed"
        disabled={!canDecrease}
        onClick={() => onChange(normalize(safeValue - 1, safeMin, safeMax))}
        type="button"
      >
        <Minus aria-hidden className="h-4 w-4" />
      </button>
      <input
        aria-label={labels.quantity}
        className="h-11 w-14 border-x border-sara-beige-dark bg-transparent text-center text-sm font-medium outline-none"
        disabled={disabled}
        inputMode="numeric"
        max={safeMax}
        min={safeMin}
        onChange={(event) => onChange(normalize(Number(event.target.value), safeMin, safeMax))}
        type="number"
        value={safeValue}
      />
      <button
        aria-label={labels.increase}
        className="sara-focus flex h-11 w-11 items-center justify-center disabled:cursor-not-allowed"
        disabled={!canIncrease}
        onClick={() => onChange(normalize(safeValue + 1, safeMin, safeMax))}
        type="button"
      >
        <Plus aria-hidden className="h-4 w-4" />
      </button>
    </div>
  );
}
