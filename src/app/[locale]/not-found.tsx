'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import {
  DEFAULT_LOCALE,
  isSupportedLocale,
  localizedRoutes,
  type AppLocale,
} from '@/shared/config';
import { Button, Container } from '@/shared/ui';

const dictionary: Record<
  AppLocale,
  {
    title: string;
    description: string;
    home: string;
    catalog: string;
  }
> = {
  ru: {
    title: 'Страница не найдена',
    description: 'Возможно, ссылка устарела или страница была перемещена.',
    home: 'На главную',
    catalog: 'В каталог',
  },
  kk: {
    title: 'Бет табылмады',
    description: 'Сілтеме ескірген немесе бет басқа жерге ауыстырылған болуы мүмкін.',
    home: 'Басты бетке',
    catalog: 'Каталогқа',
  },
  en: {
    title: 'Page not found',
    description: 'The link may be outdated or the page may have moved.',
    home: 'Back to home',
    catalog: 'Browse catalog',
  },
};

export default function LocaleNotFound() {
  const params = useParams<{ locale?: string }>();
  const locale = params.locale && isSupportedLocale(params.locale) ? params.locale : DEFAULT_LOCALE;
  const labels = dictionary[locale];

  return (
    <main className="bg-sara-beige/30">
      <Container className="flex min-h-[70vh] items-center justify-center py-16">
        <section className="max-w-2xl space-y-6 text-center">
          <p className="text-overline text-sara-bronze">404</p>
          <h1 className="font-serif text-4xl text-sara-graphite md:text-6xl">{labels.title}</h1>
          <p className="text-body text-sara-graphite/70">{labels.description}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href={localizedRoutes.home(locale)}>{labels.home}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={localizedRoutes.catalog(locale)}>{labels.catalog}</Link>
            </Button>
          </div>
        </section>
      </Container>
    </main>
  );
}
