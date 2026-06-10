import type { HTMLAttributes } from 'react';

import { cn, formatPriceKzt } from '@/shared/lib';

export type PriceProps = HTMLAttributes<HTMLSpanElement> & {
  value: number | string;
  oldValue?: number | string | null;
  size?: 'sm' | 'md' | 'lg';
  showCurrency?: boolean;
};

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl',
};

const stripCurrency = (value: string): string => value.replace(/\s?₸/g, '');

export function Price({
  className,
  oldValue,
  showCurrency = true,
  size = 'md',
  value,
  ...props
}: PriceProps) {
  const formattedValue = formatPriceKzt(value);
  const formattedOldValue = oldValue ? formatPriceKzt(oldValue) : null;

  return (
    <span
      className={cn('inline-flex items-baseline gap-2 font-medium text-sara-graphite', className)}
      {...props}
    >
      <span className={sizeClasses[size]}>
        {showCurrency ? formattedValue : stripCurrency(formattedValue)}
      </span>
      {formattedOldValue ? (
        <span className="text-sm text-sara-graphite/45 line-through">
          {showCurrency ? formattedOldValue : stripCurrency(formattedOldValue)}
        </span>
      ) : null}
    </span>
  );
}
