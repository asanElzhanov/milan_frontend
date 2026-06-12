import type { AppLocale } from '@/shared/config';

import { getHomeData } from './home.api';
import { HomeBenefits } from './home-benefits';
import { HomeBrandStory } from './home-brand-story';
import { HomeCategories } from './home-categories';
import { getHomeDictionary } from './home.dictionary';
import { HomeHero } from './home-hero';
import { HomeProductsSection } from './home-products-section';
import { HomePromoBanner } from './home-promo-banner';

type HomePageProps = {
  locale: AppLocale;
};

export async function HomePage({ locale }: HomePageProps) {
  const dictionary = getHomeDictionary(locale);
  const data = await getHomeData(locale, {
    heroCta: dictionary.hero.primaryCta,
    promoCta: dictionary.promo.cta,
  });

  return (
    <>
      <HomeHero banners={data.heroBanners} dictionary={dictionary} locale={locale} />
      <HomeCategories categories={data.categories} dictionary={dictionary} locale={locale} />
      <HomeProductsSection
        dictionary={dictionary}
        locale={locale}
        products={data.newProducts}
        type="new"
      />
      <HomePromoBanner banners={data.midBanners} dictionary={dictionary} locale={locale} />
      <HomeProductsSection
        dictionary={dictionary}
        locale={locale}
        products={data.saleProducts}
        type="sale"
      />
      <HomeBrandStory dictionary={dictionary} locale={locale} />
      <HomeBenefits dictionary={dictionary} locale={locale} />
    </>
  );
}
