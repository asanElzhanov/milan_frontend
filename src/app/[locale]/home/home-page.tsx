import type { AppLocale } from '@/shared/config';

import { getHomeCategories, getHomeHeroBanners, getHomeNewProducts } from './home.api';
import { HomeBanners } from './home-banners';
import { HomeBenefits } from './home-benefits';
import { HomeBrandStory } from './home-brand-story';
import { HomeCategories } from './home-categories';
import { homeDictionary } from './home.dictionary';
import { HomeHero } from './home-hero';
import { HomeNewArrivals } from './home-new-arrivals';

export async function HomePage({ locale }: { locale: AppLocale }) {
  const [bannersResult, categoriesResult, productsResult] = await Promise.allSettled([
    getHomeHeroBanners(locale),
    getHomeCategories(locale),
    getHomeNewProducts(locale),
  ]);

  const banners = bannersResult.status === 'fulfilled' ? bannersResult.value : [];
  const categories = categoriesResult.status === 'fulfilled' ? categoriesResult.value : [];
  const products = productsResult.status === 'fulfilled' ? productsResult.value : [];
  const dictionary = homeDictionary[locale];

  return (
    <>
      <HomeHero banner={banners[0]} dictionary={dictionary} locale={locale} />
      <HomeCategories categories={categories.slice(0, 6)} dictionary={dictionary} locale={locale} />
      <HomeNewArrivals dictionary={dictionary} locale={locale} products={products.slice(0, 4)} />
      <HomeBrandStory dictionary={dictionary} locale={locale} />
      <HomeBenefits dictionary={dictionary} />
      <HomeBanners banner={banners[1]} dictionary={dictionary} locale={locale} />
    </>
  );
}
