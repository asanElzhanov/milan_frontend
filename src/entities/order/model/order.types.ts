export type OrderStatus =
  | 'draft'
  | 'pending'
  | 'created'
  | 'processing'
  | 'confirmed'
  | 'packed'
  | 'shipped'
  | 'delivered'
  | 'completed'
  | 'cancelled'
  | 'failed'
  | string;

export type PaymentStatus =
  | 'pending'
  | 'payment_pending'
  | 'unpaid'
  | 'waiting'
  | 'paid'
  | 'failed'
  | 'cancelled'
  | 'refunded'
  | 'not_required'
  | string;

export type OrderItem = {
  id: string | number;
  productId?: string | number | null;
  productName: string;
  productSlug?: string | null;
  sku?: string | null;
  imageUrl?: string | null;
  variantId?: string | number | null;
  color?: string | null;
  size?: string | null;
  quantity: number;
  unitPrice?: number | string | null;
  totalPrice?: number | string | null;
};

export type OrderAddressSnapshot = {
  fullName?: string | null;
  phone?: string | null;
  country?: string | null;
  region?: string | null;
  city?: string | null;
  district?: string | null;
  street?: string | null;
  house?: string | null;
  apartment?: string | null;
  postalCode?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
};

export type OrderDeliverySnapshot = {
  methodId?: string | number | null;
  methodName?: string | null;
  price?: number | string | null;
  priceType?: string | null;
};

export type Order = {
  id: string | number;
  orderNumber: string;
  status?: OrderStatus | null;
  paymentStatus?: PaymentStatus | null;
  paymentProvider?: string | null;
  paymentUrl?: string | null;

  items: OrderItem[];
  itemsCount: number;

  subtotal?: number | string | null;
  discountAmount?: number | string | null;
  deliveryPrice?: number | string | null;
  total?: number | string | null;
  currency?: string | null;

  promoCode?: string | null;
  customerFullName?: string | null;
  customerEmail?: string | null;
  customerPhone?: string | null;

  deliveryAddress?: OrderAddressSnapshot | null;
  deliveryAddressText?: string | null;
  delivery?: OrderDeliverySnapshot | null;
  deliveryMethodCode?: string | null;
  deliveryMethodName?: string | null;
  deliveryRequiresManagerCalculation?: boolean;
  deliveryPriceIsFinal?: boolean;
  comment?: string | null;
  statusHistory?: unknown[];

  createdAt?: string | null;
  updatedAt?: string | null;
};

export type OrderListResponse = {
  orders: Order[];
  count: number;
  currentPage: number;
  totalPages: number;
};

export type CheckoutOrder = {
  id: string | number;
  orderNumber?: string | null;
  status?: OrderStatus | null;
  paymentStatus?: PaymentStatus | null;
  total?: number | string | null;
  currency?: string | null;
  paymentUrl?: string | null;
  paymentProvider?: string | null;
  deliveryRequiresManagerCalculation?: boolean;
  deliveryPriceIsFinal?: boolean;
  createdAt?: string | null;
};

export type CheckoutResult = {
  order: CheckoutOrder | null;
  redirectUrl?: string | null;
  paymentUrl?: string | null;
  message?: string | null;
};
