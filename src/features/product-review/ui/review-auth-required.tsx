import Link from 'next/link';

import type { AppLocale } from '@/shared/config';
import { localizedRoutes, loginWithCallback } from '@/shared/config';
import { Alert, Button } from '@/shared/ui';

import type { ProductReviewDictionary } from '../product-review.dictionary';

export function ReviewAuthRequired({
  labels,
  locale,
  productSlug,
}: {
  labels: ProductReviewDictionary;
  locale: AppLocale;
  productSlug: string;
}) {
  const callbackPath = localizedRoutes.product(locale, productSlug);
  return (
    <Alert title={labels.authRequiredTitle}>
      <p>{labels.authRequiredDescription}</p>
      <Button asChild className="mt-4" size="sm">
        <Link href={loginWithCallback(locale, callbackPath)}>{labels.login}</Link>
      </Button>
    </Alert>
  );
}
