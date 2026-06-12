import Link from 'next/link';

import type { AppLocale } from '@/shared/config';
import { withLocale } from '@/shared/lib';
import { Button, Container, SectionTitle } from '@/shared/ui';

import type { homeDictionary } from './home.dictionary';
import type { HomeCategory } from './home.types';

const fallbackPaths = ['/catalog', '/catalog?filter=new', '/delivery', '/contacts'];

export function HomeCategories({
  categories,
  dictionary,
  locale,
}: {
  categories: HomeCategory[];
  dictionary: (typeof homeDictionary)[AppLocale];
  locale: AppLocale;
}) {
  const copy = dictionary.categories;
  const links =
    categories.length > 0
      ? categories
      : copy.fallbackLinks.map((name, index) => ({
          id: name,
          name,
          slug: name,
          href: withLocale(locale, fallbackPaths[index] ?? '/catalog'),
          imageUrl: null,
        }));

  return (
    <section className="sara-section bg-sara-white">
      <Container>
        <SectionTitle
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
          action={
            <Button asChild variant="outline">
              <Link href={withLocale(locale, '/catalog')}>{dictionary.newArrivals.cta}</Link>
            </Button>
          }
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {links.slice(0, 6).map((category, index) => (
            <Link
              className="sara-focus group min-h-48 border border-sara-beige-dark bg-sara-beige p-6 transition-colors hover:border-sara-bronze"
              href={category.href}
              key={`${category.id}-${category.href}`}
            >
              <div
                className="mb-8 h-28 bg-sara-white bg-cover bg-center"
                style={
                  category.imageUrl
                    ? { backgroundImage: `url("${category.imageUrl}")` }
                    : {
                        background:
                          index % 2 === 0
                            ? 'linear-gradient(135deg, #fcfbf9, #d8cbbc)'
                            : 'linear-gradient(135deg, #f4eee6, #a37c56)',
                      }
                }
              />
              <span className="text-overline text-sara-bronze">0{index + 1}</span>
              <h3 className="mt-3 font-fashion text-2xl text-sara-black group-hover:text-sara-bronze">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
