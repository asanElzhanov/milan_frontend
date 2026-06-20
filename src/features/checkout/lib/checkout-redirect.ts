import type { CheckoutResult } from '@/entities/order';
import { isRelativePaymentUrl, isSafeExternalPaymentUrl } from '@/entities/payment';
import { type AppLocale, localizedRoutes } from '@/shared/config';

const isUnsafeUrl = (url: string): boolean => {
  const trimmed = url.trim().toLowerCase();

  return (
    trimmed.startsWith('javascript:') || trimmed.startsWith('data:') || trimmed.startsWith('//')
  );
};

export function isExternalUrl(url: string): boolean {
  return isSafeExternalPaymentUrl(url);
}

const getSafeRedirectUrl = (url: string | null | undefined): string | null => {
  if (
    !url?.trim() ||
    isUnsafeUrl(url) ||
    (!isRelativePaymentUrl(url) && !isSafeExternalPaymentUrl(url))
  ) {
    return null;
  }

  return url;
};

export function resolveCheckoutRedirect({
  locale,
  result,
}: {
  locale: AppLocale;
  result: CheckoutResult;
}): string {
  const directRedirect =
    getSafeRedirectUrl(result.paymentUrl) ?? getSafeRedirectUrl(result.redirectUrl);

  if (directRedirect) {
    return directRedirect;
  }

  if (result.order?.orderNumber) {
    return localizedRoutes.payment(locale, result.order.orderNumber);
  }

  if (result.order?.id) {
    return localizedRoutes.payment(locale, result.order.id);
  }

  return localizedRoutes.paymentPending(locale);
}
