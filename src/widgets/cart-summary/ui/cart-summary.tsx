import Link from 'next/link';

import { Button, Price } from '@/shared/ui';

import type { CartSummaryProps } from '../model/types';

const toPositiveNumber = (value: number | string | null | undefined): number => {
  if (typeof value === 'number') {
    return Number.isFinite(value) && value > 0 ? value : 0;
  }

  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value.replace(/\s/g, '').replace(',', '.'));

    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  }

  return 0;
};

const hasValue = (value: number | string | null | undefined): value is number | string =>
  value !== null && value !== undefined && value !== '';

function SummaryLine({
  label,
  pendingLabel,
  strong = false,
  value,
}: {
  label: string;
  value?: number | string | null;
  pendingLabel?: string;
  strong?: boolean;
}) {
  return (
    <div
      className={
        strong
          ? 'flex items-center justify-between gap-4 text-lg font-semibold'
          : 'flex items-center justify-between gap-4 text-sm text-sara-graphite/70'
      }
    >
      <span>{label}</span>
      {value !== null && value !== undefined ? (
        <Price size={strong ? 'lg' : 'md'} value={value} />
      ) : pendingLabel ? (
        <span className="max-w-40 text-right text-xs leading-5">{pendingLabel}</span>
      ) : null}
    </div>
  );
}

export function CartSummary({
  cart,
  checkoutHref,
  delivery,
  disabled = false,
  footerSlot,
  labels,
  showCheckoutButton = true,
  totalLabel,
  totalOverride,
}: CartSummaryProps) {
  const discountAmount = toPositiveNumber(cart.discountAmount);
  const displayTotal = totalOverride ?? cart.total ?? cart.totalAfterDiscount ?? cart.subtotal ?? 0;

  return (
    <aside className="sara-card h-fit space-y-5 p-6">
      <h2 className="font-fashion text-3xl text-sara-black">
        {labels.summaryTitle ?? labels.total}
      </h2>

      <div className="space-y-4 border-y border-sara-beige-dark/70 py-5">
        {discountAmount > 0 && hasValue(cart.discountAmount) ? (
          <SummaryLine label={labels.discount} value={cart.discountAmount} />
        ) : null}
        {hasValue(cart.totalAfterDiscount) ? (
          <SummaryLine label={labels.totalAfterDiscount} value={cart.totalAfterDiscount} />
        ) : null}
        {delivery ? (
          <SummaryLine
            label={delivery.label}
            pendingLabel={delivery.pendingLabel}
            value={delivery.price}
          />
        ) : null}
        <SummaryLine label={totalLabel ?? labels.total} strong value={displayTotal} />
      </div>

      {cart.promoCode ? (
        <div className="border border-sara-beige-dark bg-sara-beige/40 p-4 text-sm">
          <span className="font-medium">{labels.promoCode}:</span>{' '}
          {cart.promoCodeLabel ?? cart.promoCode}
        </div>
      ) : null}

      {footerSlot ? <div>{footerSlot}</div> : null}

      {showCheckoutButton && checkoutHref ? (
        <Button asChild disabled={disabled} fullWidth>
          <Link aria-disabled={disabled || undefined} href={checkoutHref}>
            {labels.proceedToCheckout}
          </Link>
        </Button>
      ) : null}
    </aside>
  );
}
