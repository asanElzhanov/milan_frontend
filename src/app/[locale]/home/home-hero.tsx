import Link from 'next/link';

import { withLocale, type AppLocale } from '@/shared/config';
import { Button, Container } from '@/shared/ui';

import type { HomeBanner, HomeDictionary } from './home.types';

type HomeHeroProps = {
  banners: HomeBanner[];
  dictionary: HomeDictionary;
  locale: AppLocale;
};

export function HomeHero({ banners, dictionary, locale }: HomeHeroProps) {
  const banner = banners[0];
  const title = banner?.title || dictionary.hero.title;
  const description = banner?.description || banner?.subtitle || dictionary.hero.description;
  const primaryHref = banner?.ctaUrl || withLocale(locale, '/catalog');
  const primaryLabel = banner?.ctaLabel || dictionary.hero.primaryCta;

  return (
    <section className="relative min-h-[calc(100svh-7rem)] overflow-hidden bg-sara-black text-sara-white">
      {banner?.imageUrl ? (
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{ backgroundImage: `url(${banner.imageUrl})` }}
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(135deg,#1a1a1a_0%,#3c332b_48%,#a37c56_100%)]"
        />
      )}
      <div aria-hidden className="absolute inset-0 bg-sara-black/42" />
      <Container className="relative flex min-h-[calc(100svh-7rem)] items-center py-16 md:py-20">
        <div className="max-w-3xl space-y-8">
          <p className="text-overline text-sara-beige-dark">{dictionary.hero.eyebrow}</p>
          <h1 className="text-display max-w-4xl text-sara-white">{title}</h1>
          <p className="text-body max-w-2xl text-sara-white/82">{description}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            {banner?.isExternal ? (
              <Button asChild variant="secondary">
                <a href={primaryHref} rel="noreferrer" target="_blank">
                  {primaryLabel}
                </a>
              </Button>
            ) : (
              <Button asChild variant="secondary">
                <Link href={primaryHref}>{primaryLabel}</Link>
              </Button>
            )}
            <Button
              asChild
              className="border-sara-white text-sara-white hover:bg-sara-white hover:text-sara-black"
              variant="outline"
            >
              <Link href={withLocale(locale, '/catalog?is_new=true')}>
                {dictionary.hero.secondaryCta}
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
