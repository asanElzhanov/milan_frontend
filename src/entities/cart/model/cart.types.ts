export type CartProductSnapshot = {
  id?: string | number | null;
  name: string;
  slug?: string | null;
  sku?: string | null;
  imageUrl?: string | null;
  brandName?: string | null;
  categoryName?: string | null;
};

export type CartVariantSnapshot = {
  id: string | number;
  sku?: string | null;
  color?: string | null;
  size?: string | null;
  price?: number | string | null;
  oldPrice?: number | string | null;
  availableStock?: number | null;
  inStock?: boolean;
};

export type CartItem = {
  id: string | number;
  product: CartProductSnapshot;
  variant: CartVariantSnapshot;
  quantity: number;
  unitPrice?: number | string | null;
  totalPrice?: number | string | null;
  availableStock?: number | null;
  inStock?: boolean;
};

export type Cart = {
  id?: string | number | null;
  cartToken?: string | null;
  items: CartItem[];
  itemsCount: number;
  totalQuantity?: number;
  subtotal?: number | string | null;
  discountAmount?: number | string | null;
  totalAfterDiscount?: number | string | null;
  total?: number | string | null;
  promoCode?: string | null;
  promoCodeLabel?: string | null;
  currency?: string | null;
  isEmpty: boolean;
};

export type AddCartItemPayload = {
  variant_id: number | string;
  quantity: number;
};

export type CreateCartItemPayload = {
  variant_id: number | string;
  quantity: number;
};

export type UpdateCartItemPayload = {
  quantity: number;
};

export type CartMergePayload = {
  guest_cart_token: string;
};

export type ApplyPromoCodePayload = {
  code: string;
};

export type RemovePromoCodePayload = void;
