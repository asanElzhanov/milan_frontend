import type { Banner } from '@/entities/banner';
import type { Category } from '@/entities/category';
import type { ProductListItem } from '@/entities/product';
import type { AppLocale } from '@/shared/config';

export type HomeBanner = {
  id: Banner['id'];
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  ctaLabel?: string;
  ctaUrl: string;
  isExternal: boolean;
};

export type HomeCategory = {
  id: Category['id'];
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  href: string;
};

export type HomeData = {
  heroBanners: HomeBanner[];
  midBanners: HomeBanner[];
  categories: HomeCategory[];
  newProducts: ProductListItem[];
  saleProducts: ProductListItem[];
};

export type HomeSectionProps = {
  locale: AppLocale;
  dictionary: HomeDictionary;
};

export type HomeDictionary = {
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  categories: {
    eyebrow: string;
    title: string;
    description: string;
    emptyTitle: string;
    emptyDescription: string;
    cta: string;
  };
  newProducts: ProductSectionDictionary;
  saleProducts: ProductSectionDictionary;
  promo: {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
  };
  story: {
    eyebrow: string;
    title: string;
    lead: string;
    body: string;
    cta: string;
  };
  benefits: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
};

type ProductSectionDictionary = {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  emptyTitle: string;
  emptyDescription: string;
};
