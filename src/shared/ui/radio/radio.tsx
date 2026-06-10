'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { useId, type ReactNode } from 'react';

import { cn } from '@/shared/lib';

export type RadioOption = {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
};

export type RadioProps = {
  options: RadioOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  label?: ReactNode;
  error?: ReactNode;
  hint?: ReactNode;
  disabled?: boolean;
  orientation?: 'vertical' | 'horizontal';
  className?: string;
};

export function Radio({
  className,
  disabled,
  error,
  hint,
  label,
  onValueChange,
  options,
  orientation = 'vertical',
  value,
}: RadioProps) {
  const id = useId();

  return (
    <div className={cn('space-y-3', className)}>
      {label ? (
        <p className="text-caption font-medium text-sara-graphite" id={`${id}-label`}>
          {label}
        </p>
      ) : null}
      <RadioGroupPrimitive.Root
        aria-labelledby={label ? `${id}-label` : undefined}
        className={cn('flex gap-4', orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap')}
        disabled={disabled}
        onValueChange={onValueChange}
        value={value}
      >
        {options.map((option) => {
          const itemId = `${id}-${option.value}`;

          return (
            <div className="flex items-start gap-3" key={option.value}>
              <RadioGroupPrimitive.Item
                className="sara-focus mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-sara-beige-dark bg-sara-white data-[state=checked]:border-sara-graphite disabled:opacity-45"
                disabled={option.disabled}
                id={itemId}
                value={option.value}
              >
                <RadioGroupPrimitive.Indicator className="h-2.5 w-2.5 rounded-full bg-sara-graphite" />
              </RadioGroupPrimitive.Item>
              <div>
                <label className="text-sm font-medium text-sara-graphite" htmlFor={itemId}>
                  {option.label}
                </label>
                {option.description ? <p className="text-caption">{option.description}</p> : null}
              </div>
            </div>
          );
        })}
      </RadioGroupPrimitive.Root>
      {hint ? <p className="text-caption">{hint}</p> : null}
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
    </div>
  );
}
