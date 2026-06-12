import { Star } from 'lucide-react';

import { cn } from '@/shared/lib';

export type RatingStarsProps = {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  reviewsCount?: number;
  className?: string;
};

const sizeClasses = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

export function RatingStars({
  className,
  max = 5,
  reviewsCount,
  showValue = false,
  size = 'md',
  value,
}: RatingStarsProps) {
  const safeMax = Math.max(1, Math.floor(max));
  const safeValue = clamp(value, 0, safeMax);
  const roundedValue = Math.round(safeValue);

  return (
    <div className={cn('inline-flex items-center gap-2 text-sara-graphite', className)}>
      <span
        className="inline-flex items-center gap-0.5"
        aria-label={`Рейтинг ${safeValue} из ${safeMax}`}
      >
        {Array.from({ length: safeMax }, (_, index) => {
          const filled = index < roundedValue;

          return (
            <Star
              aria-hidden
              className={cn(
                sizeClasses[size],
                filled
                  ? 'fill-sara-bronze text-sara-bronze'
                  : 'fill-transparent text-sara-beige-dark',
              )}
              key={index}
            />
          );
        })}
      </span>
      {showValue ? <span className="text-sm font-medium">{safeValue.toFixed(1)}</span> : null}
      {reviewsCount !== undefined ? (
        <span className="text-sm text-sara-graphite/55">({reviewsCount})</span>
      ) : null}
    </div>
  );
}
