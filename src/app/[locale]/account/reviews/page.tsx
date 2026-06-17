import { notFound } from 'next/navigation';

import { isSupportedLocale } from '@/shared/config';

import { AccountShell } from '../account/account-shell';

type AccountReviewsRouteProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

export default async function AccountReviewsPage({ params }: AccountReviewsRouteProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return <AccountShell activeKey="reviews" locale={locale} />;
}
