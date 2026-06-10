import Link from 'next/link';

import { Badge, Container, EmptyState, SectionTitle } from '@/shared/ui';

type PlaceholderPageProps = Readonly<{
  title: string;
  description: string;
  note: string;
}>;

export function PlaceholderPage({ title, description, note }: PlaceholderPageProps) {
  return (
    <Container className="sara-section">
      <div className="mx-auto max-w-3xl">
        <Badge variant="bronze">Временный раздел</Badge>
        <SectionTitle
          eyebrow="Sara Milan"
          title={title}
          description={description}
          className="mt-6"
        />
        <EmptyState
          title="Раздел готов к подключению следующего слоя"
          description={note}
          action={
            <Link
              className="sara-focus inline-flex h-11 items-center justify-center bg-sara-graphite px-6 text-xs font-medium uppercase tracking-[0.16em] text-sara-white transition-colors hover:bg-sara-black"
              href="/ui-kit"
            >
              Открыть UI Kit
            </Link>
          }
          className="mt-10"
        />
      </div>
    </Container>
  );
}
