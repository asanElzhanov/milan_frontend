import Link from 'next/link';
import type { ReactNode } from 'react';

import { canContinuePayment, type Order } from '@/entities/order';
import { isRelativePaymentUrl, isSafeExternalPaymentUrl } from '@/entities/payment';
import { type AppLocale, localizedRoutes } from '@/shared/config';
import { Button } from '@/shared/ui';

type OrderPaymentLinkProps = {
  children: ReactNode;
  locale: AppLocale;
  order: Order;
  variant?: 'primary' | 'outline' | 'ghost';
};

export function getOrderPaymentHref(order: Order, locale: AppLocale): string {
  if (order.paymentUrl && isSafeExternalPaymentUrl(order.paymentUrl)) {
    return order.paymentUrl;
  }

  if (order.paymentUrl && isRelativePaymentUrl(order.paymentUrl)) {
    return order.paymentUrl;
  }

  return localizedRoutes.payment(locale, order.orderNumber);
}

export function OrderPaymentLink({
  children,
  locale,
  order,
  variant = 'outline',
}: OrderPaymentLinkProps) {
  if (!canContinuePayment(order)) {
    return null;
  }

  const href = getOrderPaymentHref(order, locale);
  const isExternal = isSafeExternalPaymentUrl(href);

  return (
    <Button asChild variant={variant}>
      {isExternal ? <a href={href}>{children}</a> : <Link href={href}>{children}</Link>}
    </Button>
  );
}
