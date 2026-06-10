'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import { useId, type ReactNode } from 'react';

import { cn } from '@/shared/lib';

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectProps = {
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  label?: ReactNode;
  placeholder?: string;
  error?: ReactNode;
  hint?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  className?: string;
};

export function Select({
  className,
  disabled,
  error,
  fullWidth = true,
  hint,
  label,
  onValueChange,
  options,
  placeholder = 'Select',
  required,
  value,
}: SelectProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={cn('space-y-2', fullWidth && 'w-full', className)}>
      {label ? (
        <label className="text-caption font-medium text-sara-graphite" id={`${id}-label`}>
          {label}
          {required ? <span className="text-sara-bronze"> *</span> : null}
        </label>
      ) : null}
      <SelectPrimitive.Root disabled={disabled} onValueChange={onValueChange} value={value}>
        <SelectPrimitive.Trigger
          aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
          aria-invalid={Boolean(error)}
          aria-labelledby={label ? `${id}-label` : undefined}
          className={cn(
            'sara-focus flex h-11 w-full items-center justify-between border border-sara-beige-dark bg-sara-white px-3 text-left text-sm text-sara-graphite data-[placeholder]:text-sara-graphite/45',
            error && 'border-red-700',
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon>
            <ChevronDown aria-hidden className="h-4 w-4" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content className="z-50 max-h-72 min-w-[var(--radix-select-trigger-width)] overflow-hidden border border-sara-beige-dark bg-sara-white shadow-lg">
            <SelectPrimitive.Viewport className="p-1">
              {options.map((option) => (
                <SelectPrimitive.Item
                  className="sara-focus relative flex cursor-pointer items-center px-8 py-2 text-sm text-sara-graphite outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-sara-beige data-[disabled]:opacity-40"
                  disabled={option.disabled}
                  key={option.value}
                  value={option.value}
                >
                  <SelectPrimitive.ItemIndicator className="absolute left-2">
                    <Check aria-hidden className="h-4 w-4" />
                  </SelectPrimitive.ItemIndicator>
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      {hint ? (
        <p className="text-caption" id={hintId}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className="text-sm text-red-700" id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
