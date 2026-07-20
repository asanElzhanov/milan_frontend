import Link from 'next/link';

import { type AppLocale, localizedRoutes } from '@/shared/config';
import { Button, Container, EmptyState, SectionTitle } from '@/shared/ui';

type PaymentPlaceholderProps = {
  description: string;
  locale: AppLocale;
  title: string;
};

export function PaymentPlaceholder({ description, locale, title }: PaymentPlaceholderProps) {
  return (
    <Container className="sara-section">
      <div className="mx-auto max-w-3xl">
        <SectionTitle eyebrow="Sara Milan" title={title} description={description} />
        <EmptyState
          className="mt-10"
          title={title}
          description={description}
          action={
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="outline">
                <Link href={localizedRoutes.cart(locale)}>
                  {locale === 'en'
                    ? 'Back to cart'
                    : locale === 'kk'
                      ? 'Себетке қайту'
                      : 'Вернуться в корзину'}
                </Link>
              </Button>
              <Button asChild>
                <Link href={localizedRoutes.catalog(locale)}>
                  {locale === 'en'
                    ? 'Browse catalog'
                    : locale === 'kk'
                      ? 'Каталогқа өту'
                      : 'Перейти в каталог'}
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href={localizedRoutes.account(locale)}>
                  {locale === 'en' ? 'Account' : 'Аккаунт'}
                </Link>
              </Button>
            </div>
          }
        />
      </div>
    </Container>
  );
}
