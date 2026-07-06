import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';

import { cn } from '@/shared/lib';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label?: ReactNode;
  error?: ReactNode;
  hint?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      error,
      fullWidth = true,
      hint,
      id,
      label,
      leftIcon,
      required,
      rightIcon,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const hintId = hint ? `${inputId}-hint` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    return (
      <div className={cn('space-y-2', fullWidth && 'w-full')}>
        {label ? (
          <label className="text-caption font-medium text-sara-graphite" htmlFor={inputId}>
            {label}
            {required ? <span className="text-sara-bronze"> *</span> : null}
          </label>
        ) : null}
        <div className="relative">
          {leftIcon ? (
            <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sara-graphite/45">
              {leftIcon}
            </span>
          ) : null}
          <input
            ref={ref}
            aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
            aria-invalid={Boolean(error)}
            className={cn(
              'sara-focus h-11 w-full border border-sara-beige-dark bg-sara-white px-3 text-sm text-sara-graphite placeholder:text-sara-graphite/35',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-red-700',
              className,
            )}
            id={inputId}
            required={required}
            {...props}
          />
          {rightIcon ? (
            <span className="absolute top-1/2 right-3 -translate-y-1/2 text-sara-graphite/45">
              {rightIcon}
            </span>
          ) : null}
        </div>
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
  },
);

Input.displayName = 'Input';
