import type { Cart } from '@/entities/cart';
import type { AppLocale } from '@/shared/config';

export type CartSummaryLabels = {
  summaryTitle?: string;
  subtotal: string;
  discount: string;
  totalAfterDiscount: string;
  total: string;
  proceedToCheckout: string;
  promoCode?: string;
};

export type CartSummaryProps = {
  cart: Cart;
  locale: AppLocale;
  labels: CartSummaryLabels;
  checkoutHref: string;
  disabled?: boolean;
};
