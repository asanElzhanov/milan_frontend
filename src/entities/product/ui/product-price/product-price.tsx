import { cn, formatPriceKzt } from '@/shared/lib';
import { Price } from '@/shared/ui';

export type ProductPriceProps = {
  price?: number | string | null;
  oldPrice?: number | string | null;
  minPrice?: number | string | null;
  discountPercent?: number | null;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

export function ProductPrice({
  className,
  discountPercent,
  minPrice,
  oldPrice,
  price,
  size = 'md',
}: ProductPriceProps) {
  if (price !== null && price !== undefined && price !== '') {
    return (
      <span className={cn('inline-flex flex-wrap items-center gap-2', className)}>
        <Price oldValue={oldPrice} size={size} value={price} />
        {discountPercent ? (
          <span className="text-xs font-medium text-sara-bronze">-{discountPercent}%</span>
        ) : null}
      </span>
    );
  }

  if (minPrice !== null && minPrice !== undefined && minPrice !== '') {
    return (
      <span className={cn('font-medium text-sara-graphite', className)}>
        от {formatPriceKzt(minPrice)}
      </span>
    );
  }

  return null;
}
