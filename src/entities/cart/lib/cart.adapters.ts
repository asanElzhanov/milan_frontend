import {
  getMediaUrl,
  isRecord,
  toBooleanOrUndefined,
  toNumberOrNull,
  toStringOrNull,
} from '@/shared/lib';

import type { Cart, CartItem, CartProductSnapshot, CartVariantSnapshot } from '../model/cart.types';

type PriceValue = number | string | null;

const readId = (value: unknown): string | number | null =>
  typeof value === 'string' || typeof value === 'number' ? value : null;

const readPrice = (value: unknown): PriceValue =>
  typeof value === 'number' || typeof value === 'string' ? value : null;

const readPromoCode = (...values: unknown[]): string | null => {
  for (const value of values) {
    if (isRecord(value)) {
      const code =
        toStringOrNull(value.code) ??
        toStringOrNull(value.name) ??
        toStringOrNull(value.label) ??
        toStringOrNull(value.title);

      if (code) {
        return code;
      }
    }

    const code = toStringOrNull(value);

    if (code) {
      return code;
    }
  }

  return null;
};

const readNestedLabel = (value: unknown): string | null => {
  if (isRecord(value)) {
    return (
      toStringOrNull(value.name) ??
      toStringOrNull(value.value) ??
      toStringOrNull(value.title) ??
      toStringOrNull(value.slug)
    );
  }

  return toStringOrNull(value);
};

const unwrapCartRecord = (raw: unknown): unknown => {
  if (!isRecord(raw)) {
    return raw;
  }

  if (isRecord(raw.cart)) {
    return raw.cart;
  }

  if (
    isRecord(raw.data) &&
    (Array.isArray(raw.data.items) ||
      Array.isArray(raw.data.cart_items) ||
      Array.isArray(raw.data.results))
  ) {
    return raw.data;
  }

  return raw;
};

const readItemsArray = (raw: unknown): unknown[] => {
  const source = unwrapCartRecord(raw);

  if (Array.isArray(source)) {
    return source;
  }

  if (!isRecord(source)) {
    return [];
  }

  if (Array.isArray(source.items)) {
    return source.items;
  }

  if (Array.isArray(source.cart_items)) {
    return source.cart_items;
  }

  if (Array.isArray(source.results)) {
    return source.results;
  }

  return [];
};

const adaptProductSnapshot = (raw: unknown): CartProductSnapshot => {
  if (!isRecord(raw)) {
    return {
      name: toStringOrNull(raw) ?? 'Product',
    };
  }

  return {
    id: readId(raw.id ?? raw.pk),
    name: toStringOrNull(raw.name ?? raw.title) ?? 'Product',
    name_ru: toStringOrNull(raw.name_ru),
    name_kz: toStringOrNull(raw.name_kz),
    name_en: toStringOrNull(raw.name_en),
    slug: toStringOrNull(raw.slug),
    sku: toStringOrNull(raw.sku),
    imageUrl: getMediaUrl(
      toStringOrNull(raw.image_url ?? raw.imageUrl ?? raw.image ?? raw.main_image),
    ),
    brandName: toStringOrNull(raw.brand_name ?? raw.brandName) ?? readNestedLabel(raw.brand),
    categoryName:
      toStringOrNull(raw.category_name ?? raw.categoryName) ?? readNestedLabel(raw.category),
  };
};

const adaptVariantSnapshot = (raw: unknown, fallbackId: string | number): CartVariantSnapshot => {
  if (!isRecord(raw)) {
    return {
      id: readId(raw) ?? fallbackId,
    };
  }

  const availableStock = toNumberOrNull(raw.available_stock ?? raw.stock_quantity ?? raw.stock);

  return {
    id: readId(raw.id ?? raw.pk ?? raw.variant_id) ?? fallbackId,
    sku: toStringOrNull(raw.sku),
    color: readNestedLabel(raw.color),
    size: readNestedLabel(raw.size),
    price: readPrice(raw.price),
    oldPrice: readPrice(raw.old_price ?? raw.oldPrice),
    availableStock,
    inStock: toBooleanOrUndefined(raw.in_stock ?? raw.inStock),
  };
};

const readQuantity = (value: unknown): number => {
  const quantity = toNumberOrNull(value);

  return quantity && quantity > 0 ? quantity : 1;
};

const sumItemQuantities = (items: CartItem[]): number =>
  items.reduce((total, item) => total + item.quantity, 0);

export function extractCartItems(raw: unknown): CartItem[] {
  return readItemsArray(raw)
    .map(adaptCartItem)
    .filter((item): item is CartItem => Boolean(item));
}

export function adaptCartItem(raw: unknown): CartItem | null {
  if (!isRecord(raw)) {
    return null;
  }

  const id = readId(raw.id ?? raw.pk);
  const variantId = readId(raw.variant_id ?? raw.variantId);
  const variantSource = isRecord(raw.variant) ? raw.variant : raw.variant_id;
  const fallbackVariantId = variantId ?? id;

  if (!id && !fallbackVariantId) {
    return null;
  }

  const variant = adaptVariantSnapshot(variantSource, fallbackVariantId ?? 'variant');
  const productSource = isRecord(raw.product) ? raw.product : raw.product_name;
  const availableStock = toNumberOrNull(raw.available_stock ?? raw.stock_quantity);
  const inStock = toBooleanOrUndefined(raw.in_stock ?? raw.inStock);

  return {
    id: id ?? variant.id,
    product: adaptProductSnapshot(productSource),
    variant,
    quantity: readQuantity(raw.quantity),
    unitPrice: readPrice(raw.unit_price ?? raw.unitPrice ?? raw.price),
    totalPrice: readPrice(raw.line_total ?? raw.total_price ?? raw.totalPrice),
    availableStock: availableStock ?? variant.availableStock,
    inStock: inStock ?? variant.inStock,
  };
}

export function createEmptyCart(): Cart {
  return {
    items: [],
    itemsCount: 0,
    isEmpty: true,
  };
}

export function adaptCart(raw: unknown): Cart {
  const source = unwrapCartRecord(raw);

  if (!isRecord(source) && !Array.isArray(source)) {
    return createEmptyCart();
  }

  const root = isRecord(raw) ? raw : {};
  const record = isRecord(source) ? source : {};
  const items = extractCartItems(source);
  const backendItemsCount = toNumberOrNull(
    record.total_quantity ??
      record.totalQuantity ??
      root.total_quantity ??
      record.items_count ??
      record.count ??
      record.total_items ??
      root.items_count ??
      root.count,
  );
  const itemsCount = backendItemsCount ?? sumItemQuantities(items);

  return {
    id: readId(record.id ?? record.pk ?? root.id ?? root.pk),
    cartToken:
      toStringOrNull(record.cart_token ?? record.cartToken) ??
      toStringOrNull(root.cart_token ?? root.cartToken),
    items,
    itemsCount,
    totalQuantity:
      toNumberOrNull(record.total_quantity ?? record.totalQuantity ?? root.total_quantity) ??
      sumItemQuantities(items),
    subtotal: readPrice(record.subtotal ?? root.subtotal),
    discountAmount: readPrice(
      record.discount_amount ??
        record.discountAmount ??
        record.discount ??
        record.discount_total ??
        root.discount_amount ??
        root.discount ??
        root.discount_total,
    ),
    totalAfterDiscount: readPrice(
      record.total_after_discount ??
        record.totalAfterDiscount ??
        record.total_with_discount ??
        root.total_after_discount ??
        root.total_with_discount,
    ),
    total: readPrice(record.total ?? root.total),
    promoCode: readPromoCode(
      record.promo_code,
      record.promoCode,
      record.promo,
      record.coupon,
      root.promo_code,
      root.promoCode,
      root.promo,
      root.coupon,
    ),
    promoCodeLabel: readPromoCode(
      record.promo_label,
      record.promoCodeLabel,
      isRecord(record.promo) ? record.promo.label : null,
      isRecord(record.coupon) ? record.coupon.label : null,
      root.promo_label,
      root.promoCodeLabel,
    ),
    currency: toStringOrNull(record.currency ?? root.currency),
    isEmpty: items.length === 0,
  };
}
