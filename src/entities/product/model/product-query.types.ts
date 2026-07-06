export type ProductOrdering =
  | 'price'
  | '-price'
  | 'created_at'
  | '-created_at'
  | 'rating'
  | '-rating'
  | 'orders_count'
  | '-orders_count';

export type ProductListQuery = {
  category_slug?: string;
  brand?: string | string[];
  color?: string | string[];
  size?: string;
  material?: string;
  season?: string;
  in_stock?: boolean;
  has_discount?: boolean;
  is_sale?: boolean;
  is_new?: boolean;
  price_min?: number | string;
  price_max?: number | string;
  search?: string;
  ordering?: ProductOrdering;
  page?: number;
};
