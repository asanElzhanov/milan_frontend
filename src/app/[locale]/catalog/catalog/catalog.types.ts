import type { Brand } from '@/entities/brand';
import type { Category } from '@/entities/category';
import type { ProductColor } from '@/entities/color';
import type { ProductListItem } from '@/entities/product';
import type { ProductSize } from '@/entities/size';
import type { AppLocale } from '@/shared/config';

export type CatalogSearchParams = {
  search?: string;
  brand_slug?: string;
  color?: string;
  size?: string;
  material?: string;
  season?: string;
  in_stock?: string;
  is_sale?: string;
  is_new?: string;
  price_min?: string;
  price_max?: string;
  ordering?: string;
  page?: string;
};

export type CatalogPageProps = {
  locale: AppLocale;
  categorySlug?: string;
  searchParams: CatalogSearchParams;
};

export type CatalogData = {
  products: ProductListItem[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  categories: Category[];
  brands: Brand[];
  colors: ProductColor[];
  sizes: ProductSize[];
  hasError: boolean;
};

export type CatalogDictionary = {
  metadata: {
    title: string;
  };
  title: string;
  categoryTitle: string;
  filters: string;
  sort: string;
  searchPlaceholder: string;
  brands: string;
  categories: string;
  colors: string;
  sizes: string;
  price: string;
  priceFrom: string;
  priceTo: string;
  season: string;
  material: string;
  inStock: string;
  sale: string;
  new: string;
  apply: string;
  reset: string;
  emptyTitle: string;
  emptyDescription: string;
  errorTitle: string;
  errorDescription: string;
  found: string;
  products: string;
  viewProduct: string;
  allCategories: string;
  activeFilters: string;
  openFilters: string;
  closeFilters: string;
  allSort: string;
  priceAsc: string;
  priceDesc: string;
  newest: string;
  rating: string;
  popular: string;
  selectedCategory: string;
};
