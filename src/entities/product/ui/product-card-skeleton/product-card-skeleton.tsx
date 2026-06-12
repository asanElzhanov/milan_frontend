import { cn } from '@/shared/lib';
import { Skeleton } from '@/shared/ui';

export function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-4', className)}>
      <Skeleton className="aspect-[3/4] rounded-none" variant="card" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  );
}
