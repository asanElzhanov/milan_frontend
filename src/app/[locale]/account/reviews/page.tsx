import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { isSupportedLocale, type AppLocale } from '@/shared/config';

import { AccountShell } from '../account/account-shell';
import { getAccountReviewsDictionary } from './account-reviews.dictionary';
import { ReviewsPageClient } from './reviews-page-client';

type AccountReviewsRouteProps = Readonly<{ params: Promise<{ locale: string }> }>;

export async function generateMetadata({ params }: AccountReviewsRouteProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) return {};
  return { title: locale === 'kk' ? 'Менің пікірлерім — Sara Milan' : 'Мои отзывы — Sara Milan' };
}

export default async function AccountReviewsPage({ params }: AccountReviewsRouteProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();
  return (
    <AccountShell activeKey="reviews" locale={locale}>
      <ReviewsPageClient
        labels={getAccountReviewsDictionary(locale as AppLocale)}
        locale={locale as AppLocale}
      />
    </AccountShell>
  );
}
