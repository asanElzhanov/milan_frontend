import Link from 'next/link';

import type { AppLocale } from '@/shared/config';
import { withLocale } from '@/shared/lib';
import { Button, Container } from '@/shared/ui';

import type { homeDictionary } from './home.dictionary';
import type { HomeBanner } from './home.types';

type HomeHeroProps = {
  banner?: HomeBanner;
  dictionary: (typeof homeDictionary)[AppLocale];
  locale: AppLocale;
};

export function HomeHero({ banner, dictionary, locale }: HomeHeroProps) {
  const hero = dictionary.hero;
  const title = banner?.title ?? hero.fallbackTitle;
  const subtitle = banner?.subtitle ?? hero.fallbackSubtitle;
  const description = banner?.description ?? hero.fallbackDescription;
  const ctaHref = banner?.ctaHref ?? withLocale(locale, '/catalog');
  const ctaLabel = banner?.ctaLabel ?? hero.cta;

  return (
    <section className="overflow-hidden bg-sara-beige">
      <Container className="grid min-h-[680px] items-stretch gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-0">
        <div className="flex flex-col justify-center py-10">
          <p className="text-overline mb-6 text-sara-bronze">
            {banner?.subtitle ? hero.eyebrow : hero.eyebrow}
          </p>
          <h1 className="fashion-hero-title max-w-4xl text-sara-black">{title}</h1>
          <p className="mt-6 max-w-xl font-fashion text-2xl leading-snug text-sara-graphite">
            {subtitle}
          </p>
          <p className="mt-5 max-w-lg text-base leading-8 text-sara-graphite/70">{description}</p>
          <Button asChild className="mt-9 w-fit">
            <Link href={ctaHref}>{ctaLabel}</Link>
          </Button>
        </div>

        <div className="relative min-h-[420px] border border-sara-beige-dark bg-sara-white lg:min-h-[680px]">
          {banner?.imageUrl ? (
            <div
              aria-label={title}
              className="h-full min-h-[420px] bg-cover bg-center"
              role="img"
              style={{ backgroundImage: `url("${banner.imageUrl}")` }}
            />
          ) : (
            <div className="flex h-full min-h-[420px] items-center justify-center bg-[linear-gradient(135deg,#fcfbf9_0%,#f4eee6_48%,#d8cbbc_100%)] p-10">
              <div className="aspect-[3/4] w-full max-w-sm border border-sara-bronze/35 bg-sara-white/45 p-8">
                <div className="flex h-full flex-col justify-between border border-sara-bronze/25 p-8 text-center">
                  <span className="text-overline text-sara-bronze">Sara Milan</span>
                  <span className="font-fashion text-5xl text-sara-black">SM</span>
                  <span className="text-xs uppercase tracking-[0.18em] text-sara-graphite/60">
                    Premium edit
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
