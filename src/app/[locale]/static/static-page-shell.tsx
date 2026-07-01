import type { ReactNode } from 'react';

import { type AppLocale, localizedRoutes } from '@/shared/config';
import { Breadcrumbs, Container } from '@/shared/ui';

export type StaticPageShellProps = {
  locale: AppLocale;
  title: string;
  subtitle?: string;
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
  children: ReactNode;
};

const homeLabel: Record<AppLocale, string> = {
  ru: 'Главная',
  kk: 'Басты бет',
};

export function StaticPageShell({
  breadcrumbs,
  children,
  locale,
  subtitle,
  title,
}: StaticPageShellProps) {
  const breadcrumbItems = breadcrumbs ?? [
    { label: homeLabel[locale], href: localizedRoutes.home(locale) },
    { label: title },
  ];

  return (
    <main className="bg-sara-beige/30">
      <Container className="py-10 md:py-14">
        <Breadcrumbs className="mb-8" items={breadcrumbItems} />
        <div className="mb-10 max-w-3xl space-y-4">
          <h1 className="font-serif text-4xl text-sara-graphite md:text-6xl">{title}</h1>
          {subtitle ? <p className="text-body text-sara-graphite/70">{subtitle}</p> : null}
        </div>
        <div className="space-y-5">{children}</div>
      </Container>
    </main>
  );
}
