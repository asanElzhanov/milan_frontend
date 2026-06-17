import { Container, Skeleton } from '@/shared/ui';

export default function CartLoading() {
  return (
    <Container className="sara-section">
      <div className="mb-10 space-y-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-14 max-w-lg" />
        <Skeleton className="h-5 max-w-xl" />
      </div>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              className="sara-card grid gap-5 p-4 sm:grid-cols-[120px_minmax(0,1fr)]"
              key={index}
            >
              <Skeleton className="aspect-[3/4] h-auto" />
              <div className="space-y-4">
                <Skeleton className="h-6 max-w-sm" />
                <Skeleton className="h-4 max-w-xs" />
                <Skeleton className="h-11 w-36" />
              </div>
            </div>
          ))}
        </div>
        <div className="sara-card h-fit space-y-5 p-6">
          <Skeleton className="h-8 max-w-40" />
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
          <Skeleton className="h-12" />
        </div>
      </div>
    </Container>
  );
}
