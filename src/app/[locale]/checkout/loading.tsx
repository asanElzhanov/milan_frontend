import { Container, Skeleton } from '@/shared/ui';

export default function CheckoutLoading() {
  return (
    <Container className="sara-section">
      <div className="max-w-3xl space-y-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-12 w-80 max-w-full" />
        <Skeleton className="h-5 w-full max-w-2xl" />
      </div>
      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="space-y-5">
          <Skeleton className="h-48" variant="text" />
          <Skeleton className="h-80" variant="text" />
          <Skeleton className="h-48" variant="text" />
        </div>
        <Skeleton className="h-96" variant="text" />
      </div>
    </Container>
  );
}
