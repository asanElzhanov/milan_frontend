'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { useId, type ReactNode } from 'react';

import { cn } from '@/shared/lib';

export type CheckboxProps = {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  disabled?: boolean;
  className?: string;
};

export function Checkbox({
  checked,
  className,
  description,
  disabled,
  error,
  label,
  onCheckedChange,
}: CheckboxProps) {
  const id = useId();

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-start gap-3">
        <CheckboxPrimitive.Root
          aria-invalid={Boolean(error)}
          checked={checked}
          className="sara-focus mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-sara-beige-dark bg-sara-white text-sara-white data-[state=checked]:border-sara-graphite data-[state=checked]:bg-sara-graphite disabled:opacity-45"
          disabled={disabled}
          id={id}
          onCheckedChange={(value) => onCheckedChange?.(value === true)}
        >
          <CheckboxPrimitive.Indicator>
            <Check aria-hidden className="h-4 w-4" />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        <div>
          {label ? (
            <label className="text-sm font-medium text-sara-graphite" htmlFor={id}>
              {label}
            </label>
          ) : null}
          {description ? <p className="text-caption">{description}</p> : null}
        </div>
      </div>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
    </div>
  );
}
