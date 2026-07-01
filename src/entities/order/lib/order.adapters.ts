import { getMediaUrl, isRecord, toNumberOrNull, toStringOrNull } from '@/shared/lib';

import type {
  CheckoutOrder,
  CheckoutResult,
  Order,
  OrderAddressSnapshot,
  OrderDeliverySnapshot,
  OrderItem,
  OrderListResponse,
} from '../model/order.types';

const readId = (...values: unknown[]): string | number | null => {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) {
      return value;
    }

    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }
  }

  return null;
};

const readString = (...values: unknown[]): string | null => {
  for (const value of values) {
    const stringValue = toStringOrNull(value);

    if (stringValue) {
      return stringValue;
    }
  }

  return null;
};

const readPrice = (...values: unknown[]): number | string | null => {
  for (const value of values) {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === 'string' && value.trim()) {
      return value;
    }
  }

  return null;
};

const readBoolean = (...values: unknown[]): boolean | undefined => {
  for (const value of values) {
    if (typeof value === 'boolean') {
      return value;
    }
  }

  return undefined;
};

const readNestedLabel = (value: unknown): string | null => {
  if (isRecord(value)) {
    return readString(value.name, value.value, value.title, value.label, value.slug);
  }

  return readString(value);
};

const unwrapOrder = (raw: unknown): unknown => {
  if (!isRecord(raw)) {
    return raw;
  }

  if (raw.order !== undefined) {
    return raw.order;
  }

  if (isRecord(raw.data) && raw.data.order !== undefined) {
    return raw.data.order;
  }

  if (isRecord(raw.data) && (raw.data.id !== undefined || raw.data.order_number !== undefined)) {
    return raw.data;
  }

  return raw;
};

const readItemsArray = (record: Record<string, unknown>): unknown[] => {
  if (Array.isArray(record.items)) {
    return record.items;
  }

  if (Array.isArray(record.order_items)) {
    return record.order_items;
  }

  if (Array.isArray(record.lines)) {
    return record.lines;
  }

  if (Array.isArray(record.products)) {
    return record.products;
  }

  return [];
};

const adaptAddress = (raw: unknown): OrderAddressSnapshot | null => {
  if (!isRecord(raw)) {
    return null;
  }

  return {
    fullName: readString(raw.full_name, raw.fullName, raw.name, raw.recipient_name),
    phone: readString(raw.phone, raw.phone_number, raw.recipient_phone),
    country: readString(raw.country),
    region: readString(raw.region, raw.state),
    city: readString(raw.city),
    district: readString(raw.district),
    street: readString(raw.street),
    house: readString(raw.house, raw.house_number),
    apartment: readString(raw.apartment, raw.flat),
    postalCode: readString(raw.postal_code, raw.postalCode, raw.zip),
    addressLine1: readString(raw.address_line_1, raw.addressLine1, raw.address1, raw.line1),
    addressLine2: readString(raw.address_line_2, raw.addressLine2, raw.address2, raw.line2),
  };
};

const adaptDelivery = (raw: unknown): OrderDeliverySnapshot | null => {
  if (!isRecord(raw)) {
    return null;
  }

  return {
    methodId: readId(raw.method_id, raw.methodId, raw.id, raw.pk),
    methodName: readString(raw.method_name, raw.methodName, raw.name, raw.title),
    price: readPrice(raw.price, raw.delivery_price, raw.deliveryPrice),
    priceType: readString(raw.price_type, raw.priceType),
  };
};

export function adaptOrderItem(raw: unknown): OrderItem | null {
  if (!isRecord(raw)) {
    return null;
  }

  const product = isRecord(raw.product) ? raw.product : {};
  const variant = isRecord(raw.variant) ? raw.variant : {};
  const id = readId(raw.id, raw.pk, raw.item_id, raw.product_id, product.id, product.pk);

  if (id === null) {
    return null;
  }

  const productName =
    readString(
      raw.product_name,
      raw.productName,
      raw.name,
      raw.title,
      product.name,
      product.title,
    ) ?? 'Product';

  return {
    id,
    productId: readId(raw.product_id, raw.productId, product.id, product.pk),
    productName,
    productSlug: readString(raw.product_slug, raw.productSlug, product.slug),
    sku: readString(raw.sku, product.sku, variant.sku),
    imageUrl: getMediaUrl(
      readString(
        raw.image_url,
        raw.imageUrl,
        raw.main_image,
        raw.image,
        product.image_url,
        product.imageUrl,
        product.main_image,
        product.image,
      ),
    ),
    variantId: readId(raw.variant_id, raw.variantId, variant.id, variant.pk),
    color: readString(raw.color, raw.color_name, raw.colorName) ?? readNestedLabel(variant.color),
    size: readString(raw.size, raw.size_name, raw.sizeName) ?? readNestedLabel(variant.size),
    quantity: Math.max(toNumberOrNull(raw.quantity) ?? 1, 1),
    unitPrice: readPrice(raw.unit_price, raw.unitPrice, raw.price),
    totalPrice: readPrice(raw.total_price, raw.totalPrice, raw.subtotal, raw.total),
  };
}

export function adaptOrder(raw: unknown): Order | null {
  const source = unwrapOrder(raw);

  if (!isRecord(source)) {
    return null;
  }

  const orderNumber = readString(source.order_number, source.orderNumber, source.number);
  const id = readId(source.id, source.pk, orderNumber);

  if (id === null || !orderNumber) {
    return null;
  }

  const items = readItemsArray(source)
    .map(adaptOrderItem)
    .filter((item): item is OrderItem => Boolean(item));
  const itemsCount =
    toNumberOrNull(source.items_count ?? source.itemsCount ?? source.total_items) ??
    items.reduce((total, item) => total + item.quantity, 0);

  return {
    id,
    orderNumber,
    status: readString(source.status),
    paymentStatus: readString(source.payment_status, source.paymentStatus),
    paymentProvider: readString(source.payment_provider, source.paymentProvider),
    paymentUrl: readString(source.payment_url, source.paymentUrl),
    items,
    itemsCount,
    subtotal: readPrice(source.subtotal),
    discountAmount: readPrice(source.discount_amount, source.discountAmount, source.discount),
    deliveryPrice: readPrice(source.delivery_price, source.deliveryPrice, source.shipping_price),
    total: readPrice(source.total, source.total_amount, source.amount),
    currency: readString(source.currency),
    promoCode: readString(source.promo_code, source.promoCode),
    customerFullName: readString(
      source.customer_full_name,
      source.customerFullName,
      source.full_name,
    ),
    customerEmail: readString(source.customer_email, source.customerEmail, source.email),
    customerPhone: readString(source.customer_phone, source.customerPhone, source.phone),
    deliveryAddress: adaptAddress(
      source.delivery_address ?? source.deliveryAddress ?? source.address,
    ),
    deliveryAddressText: readString(source.delivery_address, source.deliveryAddress),
    delivery: adaptDelivery(source.delivery ?? source.delivery_method ?? source.deliveryMethod),
    deliveryMethodCode: readString(source.delivery_method_code, source.deliveryMethodCode),
    deliveryMethodName: readString(source.delivery_method_name, source.deliveryMethodName),
    deliveryRequiresManagerCalculation: readBoolean(
      source.delivery_requires_manager_calculation,
      source.deliveryRequiresManagerCalculation,
    ),
    deliveryPriceIsFinal: readBoolean(source.delivery_price_is_final, source.deliveryPriceIsFinal),
    comment: readString(source.comment, source.notes),
    statusHistory: Array.isArray(source.status_history) ? source.status_history : undefined,
    createdAt: readString(source.created_at, source.createdAt),
    updatedAt: readString(source.updated_at, source.updatedAt),
  };
}

const unwrapOrderList = (raw: unknown): unknown => {
  if (!isRecord(raw)) {
    return raw;
  }

  if (Array.isArray(raw.results) || Array.isArray(raw.orders)) {
    return raw;
  }

  if (isRecord(raw.data)) {
    return raw.data;
  }

  return raw;
};

export function adaptOrderList(raw: unknown): OrderListResponse {
  const source = unwrapOrderList(raw);
  const record = isRecord(source) ? source : {};
  const rawOrders = Array.isArray(source)
    ? source
    : Array.isArray(record.results)
      ? record.results
      : Array.isArray(record.orders)
        ? record.orders
        : [];
  const orders = rawOrders.map(adaptOrder).filter((order): order is Order => Boolean(order));
  const count = toNumberOrNull(record.count) ?? orders.length;
  const pageSize = Math.max(orders.length, 1);
  const currentPage = toNumberOrNull(record.current_page ?? record.currentPage ?? record.page) ?? 1;
  const totalPages =
    toNumberOrNull(record.total_pages ?? record.totalPages) ??
    Math.max(Math.ceil(count / pageSize), 1);

  return {
    orders,
    count,
    currentPage,
    totalPages,
  };
}

export function adaptCheckoutOrder(raw: unknown): CheckoutOrder | null {
  const record = unwrapOrder(raw);

  if (!isRecord(record)) {
    return null;
  }

  const orderNumber = readString(record.order_number, record.orderNumber, record.number);
  const id = readId(record.id, record.pk, orderNumber);

  if (id === null) {
    return null;
  }

  return {
    id,
    orderNumber,
    status: readString(record.status),
    paymentStatus: readString(record.payment_status, record.paymentStatus),
    total: readPrice(record.total, record.total_amount, record.amount),
    currency: readString(record.currency),
    paymentUrl: readString(record.payment_url, record.paymentUrl),
    paymentProvider: readString(record.payment_provider, record.paymentProvider),
    deliveryRequiresManagerCalculation: readBoolean(
      record.delivery_requires_manager_calculation,
      record.deliveryRequiresManagerCalculation,
    ),
    deliveryPriceIsFinal: readBoolean(record.delivery_price_is_final, record.deliveryPriceIsFinal),
    createdAt: readString(record.created_at, record.createdAt),
  };
}

export function adaptCheckoutResult(raw: unknown): CheckoutResult {
  const record = isRecord(raw) ? raw : {};
  const data = isRecord(record.data) ? record.data : {};
  const order = adaptCheckoutOrder(raw);

  return {
    order,
    redirectUrl: readString(record.redirect_url, record.redirectUrl, data.redirect_url),
    paymentUrl: readString(
      record.payment_url,
      record.paymentUrl,
      data.payment_url,
      order?.paymentUrl,
    ),
    message: readString(record.message, record.detail, data.message),
  };
}
