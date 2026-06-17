import { notFound } from 'next/navigation';

import { isSupportedLocale } from '@/shared/config';

import { AccountShell } from '../account/account-shell';

type AccountWishlistRouteProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

export default async function AccountWishlistPage({ params }: AccountWishlistRouteProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return <AccountShell activeKey="wishlist" locale={locale} />;
}
