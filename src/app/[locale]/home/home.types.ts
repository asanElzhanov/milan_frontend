export type HomeBanner = {
  id: string | number;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string | null;
  ctaLabel?: string;
  ctaHref?: string;
};

export type HomeCategory = {
  id: string | number;
  name: string;
  slug: string;
  href: string;
  imageUrl?: string | null;
};

export type HomeProductPreview = {
  id: string | number;
  slug: string;
  name: string;
  href: string;
  price: number | string;
  oldPrice?: number | string | null;
  imageUrl?: string | null;
  isNew?: boolean;
  hasDiscount?: boolean;
};
