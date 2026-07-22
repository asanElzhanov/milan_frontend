export type ProductListItem = {
  id: string | number;
  name: string;
  name_ru?: string | null;
  name_kz?: string | null;
  name_en?: string | null;
  slug: string;
  sku?: string | null;
  brandName?: string | null;
  categoryName?: string | null;
  price?: number | string | null;
  oldPrice?: number | string | null;
  discount?: number | string | null;
  discountPercent?: number | null;
  isNew?: boolean;
  isSale?: boolean;
  mainImage?: string | null;
  minPrice?: number | string | null;
  inStock?: boolean;
  availableColors?: string[];
  availableSizes?: string[];
  averageRating?: number | null;
  reviewsCount?: number;
};

export type ProductMedia = {
  id?: string | number;
  url: string;
  type: 'image' | 'video';
  alt?: string | null;
  isPrimary?: boolean;
};

export type ProductVariant = {
  id: string | number;
  sku?: string | null;
  color?: string | null;
  size?: string | null;
  price?: number | string | null;
  oldPrice?: number | string | null;
  stockQuantity?: number | null;
  inStock?: boolean;
};

export type ProductDetail = ProductListItem & {
  description?: string | null;
  description_ru?: string | null;
  description_kz?: string | null;
  description_en?: string | null;
  composition?: string | null;
  composition_ru?: string | null;
  composition_kz?: string | null;
  composition_en?: string | null;
  material?: string | null;
  material_ru?: string | null;
  material_kz?: string | null;
  material_en?: string | null;
  season?: string | null;
  images?: ProductMedia[];
  media?: ProductMedia[];
  videos?: ProductMedia[];
  variants?: ProductVariant[];
  availableSizes?: string[];
  availableColors?: string[];
  rating?: number | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
};
