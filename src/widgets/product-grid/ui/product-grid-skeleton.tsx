import { ProductCardSkeleton } from '@/entities/product';
import { cn } from '@/shared/lib';

export function ProductGridSkeleton({
  className,
  count = 8,
}: {
  className?: string;
  count?: number;
}) {
  return (
    <div className={cn('grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {Array.from({ length: count }, (_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
