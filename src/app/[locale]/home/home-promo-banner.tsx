import Link from 'next/link';

import { withLocale, type AppLocale } from '@/shared/config';
import { Button, Container } from '@/shared/ui';

import type { HomeBanner, HomeDictionary } from './home.types';

type HomePromoBannerProps = {
  banners: HomeBanner[];
  dictionary: HomeDictionary;
  locale: AppLocale;
};

export function HomePromoBanner({ banners, dictionary, locale }: HomePromoBannerProps) {
  const banner = banners[0];
  const title = banner?.title || dictionary.promo.title;
  const description = banner?.description || banner?.subtitle || dictionary.promo.description;
  const href = banner?.ctaUrl || withLocale(locale, '/catalog');
  const label = banner?.ctaLabel || dictionary.promo.cta;

  return (
    <section className="bg-sara-beige py-10">
      <Container>
        <div className="relative overflow-hidden rounded-sara-lg bg-sara-black px-6 py-14 text-sara-white md:px-12 md:py-18">
          {banner?.imageUrl ? (
            <div
              aria-hidden
              className="absolute inset-0 bg-cover bg-center opacity-55"
              style={{ backgroundImage: `url(${banner.imageUrl})` }}
            />
          ) : null}
          <div aria-hidden className="absolute inset-0 bg-sara-black/48" />
          <div className="relative max-w-2xl space-y-5">
            <p className="text-overline text-sara-beige-dark">{dictionary.promo.eyebrow}</p>
            <h2 className="font-fashion text-4xl font-medium leading-tight md:text-5xl">{title}</h2>
            <p className="text-body text-sara-white/78">{description}</p>
            {banner?.isExternal ? (
              <Button asChild variant="secondary">
                <a href={href} rel="noreferrer" target="_blank">
                  {label}
                </a>
              </Button>
            ) : (
              <Button asChild variant="secondary">
                <Link href={href}>{label}</Link>
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
