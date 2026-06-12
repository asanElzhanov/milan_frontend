import { bannerApi } from '@/entities/banner';
import { categoryApi } from '@/entities/category';
import { productApi, type ProductListItem } from '@/entities/product';
import type { AppLocale } from '@/shared/config';

import { adaptHomeBanners, adaptHomeCategories, extractProducts } from './home.adapters';
import type { HomeBanner, HomeCategory, HomeData } from './home.types';

const settleArray = <T>(result: PromiseSettledResult<T[]>): T[] =>
  result.status === 'fulfilled' ? result.value : [];

export const getHomeHeroBanners = async (
  locale: AppLocale,
  fallbackLabel: string,
): Promise<HomeBanner[]> => {
  try {
    const banners = await bannerApi.getBanners({ position: 'hero', active: true });

    return adaptHomeBanners(banners, locale, fallbackLabel);
  } catch {
    return [];
  }
};

export const getHomeMidBanners = async (
  locale: AppLocale,
  fallbackLabel: string,
): Promise<HomeBanner[]> => {
  try {
    const banners = await bannerApi.getBanners({ position: 'mid', active: true });

    return adaptHomeBanners(banners, locale, fallbackLabel);
  } catch {
    return [];
  }
};

export const getHomeCategories = async (locale: AppLocale): Promise<HomeCategory[]> => {
  try {
    const categories = await categoryApi.getCategoryTree({ active: true });

    return adaptHomeCategories(categories, locale);
  } catch {
    return [];
  }
};

export const getHomeNewProducts = async (): Promise<ProductListItem[]> => {
  try {
    const response = await productApi.getProducts({ is_new: true });

    return extractProducts(response);
  } catch {
    return [];
  }
};

export const getHomeSaleProducts = async (): Promise<ProductListItem[]> => {
  try {
    const response = await productApi.getProducts({ is_sale: true });

    return extractProducts(response);
  } catch {
    return [];
  }
};

export const getHomeData = async (
  locale: AppLocale,
  copy: { heroCta: string; promoCta: string },
): Promise<HomeData> => {
  const [heroBanners, midBanners, categories, newProducts, saleProducts] = await Promise.allSettled(
    [
      getHomeHeroBanners(locale, copy.heroCta),
      getHomeMidBanners(locale, copy.promoCta),
      getHomeCategories(locale),
      getHomeNewProducts(),
      getHomeSaleProducts(),
    ],
  );

  return {
    heroBanners: settleArray(heroBanners),
    midBanners: settleArray(midBanners),
    categories: settleArray(categories),
    newProducts: settleArray(newProducts),
    saleProducts: settleArray(saleProducts),
  };
};
