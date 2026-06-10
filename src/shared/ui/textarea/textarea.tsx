import { forwardRef, useId, type ReactNode, type TextareaHTMLAttributes } from 'react';

import { cn } from '@/shared/lib';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: ReactNode;
  error?: ReactNode;
  hint?: ReactNode;
  fullWidth?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
};

const resizeClasses = {
  none: 'resize-none',
  vertical: 'resize-y',
  horizontal: 'resize-x',
  both: 'resize',
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      error,
      fullWidth = true,
      hint,
      id,
      label,
      required,
      resize = 'vertical',
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;
    const hintId = hint ? `${textareaId}-hint` : undefined;
    const errorId = error ? `${textareaId}-error` : undefined;

    return (
      <div className={cn('space-y-2', fullWidth && 'w-full')}>
        {label ? (
          <label className="text-caption font-medium text-sara-graphite" htmlFor={textareaId}>
            {label}
            {required ? <span className="text-sara-bronze"> *</span> : null}
          </label>
        ) : null}
        <textarea
          ref={ref}
          aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
          aria-invalid={Boolean(error)}
          className={cn(
            'sara-focus min-h-28 w-full border border-sara-beige-dark bg-sara-white px-3 py-3 text-sm leading-6 text-sara-graphite placeholder:text-sara-graphite/35',
            resizeClasses[resize],
            error && 'border-red-700',
            className,
          )}
          id={textareaId}
          required={required}
          {...props}
        />
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

Textarea.displayName = 'Textarea';
