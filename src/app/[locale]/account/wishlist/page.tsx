import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { isSupportedLocale, type AppLocale } from '@/shared/config';

import { AccountShell } from '../account/account-shell';
import { WishlistPageClient } from './wishlist-page-client';

type AccountWishlistRouteProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

const metadataTitle: Record<AppLocale, string> = {
  ru: 'Избранное — Sara Milan',
  kk: 'Таңдаулылар — Sara Milan',
  en: 'Wishlist — Sara Milan',
};

export async function generateMetadata({ params }: AccountWishlistRouteProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return {
    title: metadataTitle[locale],
  };
}

export default async function AccountWishlistPage({ params }: AccountWishlistRouteProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return (
    <AccountShell activeKey="wishlist" locale={locale}>
      <WishlistPageClient locale={locale} />
    </AccountShell>
  );
}
