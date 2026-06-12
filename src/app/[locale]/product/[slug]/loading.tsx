import { Container, Skeleton } from '@/shared/ui';
import { ProductGridSkeleton } from '@/widgets/product-grid';

export default function ProductDetailLoading() {
  return (
    <Container className="sara-section space-y-14">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
        <div className="space-y-4">
          <Skeleton className="aspect-square w-full" variant="card" />
          <div className="grid grid-cols-4 gap-3">
            <Skeleton className="aspect-square" />
            <Skeleton className="aspect-square" />
            <Skeleton className="aspect-square" />
            <Skeleton className="aspect-square" />
          </div>
        </div>
        <div className="space-y-6">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
      <ProductGridSkeleton />
    </Container>
  );
}
