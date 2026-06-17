import Link from 'next/link';

import type { AppLocale } from '@/shared/config';
import { Button } from '@/shared/ui';

import { buildWishlistLoginHref } from '../lib/wishlist-auth';

export function WishlistLoginRequired({
  callbackPath,
  label,
  locale,
}: {
  locale: AppLocale;
  callbackPath: string;
  label: string;
}) {
  return (
    <Button asChild variant="outline">
      <Link href={buildWishlistLoginHref(locale, callbackPath)}>{label}</Link>
    </Button>
  );
}
