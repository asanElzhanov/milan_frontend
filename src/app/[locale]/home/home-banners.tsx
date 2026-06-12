import Link from 'next/link';

import type { AppLocale } from '@/shared/config';
import { withLocale } from '@/shared/lib';
import { Button, Container } from '@/shared/ui';

import type { homeDictionary } from './home.dictionary';
import type { HomeBanner } from './home.types';

export function HomeBanners({
  banner,
  dictionary,
  locale,
}: {
  banner?: HomeBanner;
  dictionary: (typeof homeDictionary)[AppLocale];
  locale: AppLocale;
}) {
  const copy = dictionary.editorial;
  const title = banner?.title ?? copy.title;
  const description = banner?.description ?? copy.description;
  const href = banner?.ctaHref ?? withLocale(locale, '/catalog');
  const label = banner?.ctaLabel ?? copy.cta;

  return (
    <section className="sara-section bg-sara-white">
      <Container>
        <div className="grid overflow-hidden border border-sara-beige-dark bg-sara-graphite text-sara-white lg:grid-cols-[1fr_0.8fr]">
          <div className="p-8 md:p-12">
            <p className="text-overline text-sara-beige">Sara Milan</p>
            <h2 className="mt-4 max-w-3xl font-fashion text-4xl leading-tight md:text-6xl">
              {title}
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-sara-beige/75">{description}</p>
            <Button asChild className="mt-8 bg-sara-white text-sara-graphite hover:bg-sara-beige">
              <Link href={href}>{label}</Link>
            </Button>
          </div>
          <div
            className="min-h-[280px] bg-sara-beige bg-cover bg-center"
            style={
              banner?.imageUrl
                ? { backgroundImage: `url("${banner.imageUrl}")` }
                : { background: 'linear-gradient(135deg, #f4eee6, #a37c56)' }
            }
          />
        </div>
      </Container>
    </section>
  );
}
