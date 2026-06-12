import Link from 'next/link';
import { notFound } from 'next/navigation';

import { isSupportedLocale, type AppLocale, withLocale } from '@/shared/config';
import { Button, Container, EmptyState, SectionTitle } from '@/shared/ui';

type LocaleHomePageProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

const homePlaceholder = {
  ru: {
    title: 'Sara Milan',
    description: 'Главная страница будет реализована после Catalog API layer и ProductGrid.',
    emptyTitle: 'Витрина готовится',
    emptyDescription:
      'Сейчас доступен production layout shell: header, footer, навигация, поиск и placeholder-разделы.',
    cta: 'Открыть каталог',
  },
  kk: {
    title: 'Sara Milan',
    description: 'Басты бет Catalog API layer және ProductGrid кейін іске асырылады.',
    emptyTitle: 'Витрина дайындалып жатыр',
    emptyDescription:
      'Қазір production layout shell қолжетімді: header, footer, навигация, іздеу және placeholder бөлімдер.',
    cta: 'Каталогты ашу',
  },
} as const satisfies Record<AppLocale, Record<string, string>>;

export default async function LocaleHomePage({ params }: LocaleHomePageProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const copy = homePlaceholder[locale];

  return (
    <Container className="sara-section">
      <div className="mx-auto max-w-3xl">
        <SectionTitle eyebrow="Sara Milan" title={copy.title} description={copy.description} />
        <EmptyState
          title={copy.emptyTitle}
          description={copy.emptyDescription}
          action={
            <Button asChild>
              <Link href={withLocale(locale, '/catalog')}>{copy.cta}</Link>
            </Button>
          }
          className="mt-10"
        />
      </div>
    </Container>
  );
}
