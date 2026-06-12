import { Container, SectionTitle, Skeleton } from '@/shared/ui';
import { ProductGridSkeleton } from '@/widgets/product-grid';

export default function CatalogLoading() {
  return (
    <Container className="sara-section space-y-10">
      <SectionTitle
        description={<Skeleton className="h-5 w-72" />}
        eyebrow={<Skeleton className="h-3 w-24" />}
        title={<Skeleton className="h-12 w-52" />}
      />
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <Skeleton className="hidden min-h-96 lg:block" />
        <ProductGridSkeleton />
      </div>
    </Container>
  );
}
