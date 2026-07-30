import Link from 'next/link';

import { withLocale, type AppLocale } from '@/shared/config';
import { Button, Container, EmptyState, SectionTitle } from '@/shared/ui';

import type { HomeCategory, HomeDictionary } from './home.types';

type HomeCategoriesProps = {
  categories: HomeCategory[];
  dictionary: HomeDictionary;
  locale: AppLocale;
};

export function HomeCategories({ categories, dictionary, locale }: HomeCategoriesProps) {
  return (
    <section className="sara-section bg-sara-white">
      <Container>
        <SectionTitle
          action={
            <Button asChild variant="ghost">
              <Link href={withLocale(locale, '/catalog')}>{dictionary.categories.cta}</Link>
            </Button>
          }
          description={dictionary.categories.description}
          eyebrow={dictionary.categories.eyebrow}
          title={dictionary.categories.title}
        />

        {categories.length > 0 ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                className="group relative flex min-h-56 flex-col justify-end overflow-hidden rounded-sara-lg bg-sara-beige p-6 text-sara-white lg:min-h-64"
                href={category.href}
              >
                {category.imageUrl ? (
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${category.imageUrl})` }}
                  />
                ) : (
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(135deg,#2b2b2b,#a37c56)]"
                  />
                )}
                <div aria-hidden className="absolute inset-0 bg-sara-black/42" />
                <div className="relative">
                  <h3 className="font-fashion text-3xl font-medium">{category.name}</h3>
                  {category.description ? (
                    <p className="mt-3 max-w-md text-sm leading-6 text-sara-white/80">
                      {category.description}
                    </p>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            className="mt-10"
            description={dictionary.categories.emptyDescription}
            title={dictionary.categories.emptyTitle}
          />
        )}
      </Container>
    </section>
  );
}
