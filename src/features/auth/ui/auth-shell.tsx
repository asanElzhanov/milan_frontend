import Link from 'next/link';

import { withLocale } from '@/shared/config';
import { Button, Container } from '@/shared/ui';

import type { AuthShellProps } from '../model/auth-ui.types';

const authShellCopy = {
  ru: {
    catalog: 'В каталог',
    eyebrow: 'Sara Milan Atelier',
    title: 'Персональный гардероб начинается с деталей.',
    text: 'Аккаунт Sara Milan поможет сохранить историю заказов, адреса и избранные изделия, когда backend-авторизация будет подключена.',
  },
  kk: {
    catalog: 'Каталогқа',
    eyebrow: 'Sara Milan Atelier',
    title: 'Жеке гардероб ұсақ бөлшектерден басталады.',
    text: 'Backend авторизациясы қосылған кезде Sara Milan аккаунты тапсырыстар тарихын, мекенжайларды және таңдаулы бұйымдарды сақтауға көмектеседі.',
  },
  en: {
    catalog: 'Browse catalog', eyebrow: 'Sara Milan Atelier',
    title: 'A personal wardrobe begins with the details.',
    text: 'Your Sara Milan account keeps your orders, addresses and favorite pieces together.',
  },
};

export function AuthShell({ aside, children, locale, subtitle, title }: AuthShellProps) {
  const copy = authShellCopy[locale];

  return (
    <main className="bg-sara-beige/40">
      <Container className="py-10 md:py-16">
        <div className="grid min-h-[680px] overflow-hidden border border-sara-beige-dark bg-sara-white lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <section className="flex items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
            <div className="w-full max-w-[440px] space-y-8">
              <div className="space-y-5">
                <Link
                  className="sara-focus inline-flex text-2xl font-semibold tracking-[0.18em] text-sara-graphite uppercase"
                  href={withLocale(locale)}
                >
                  Sara Milan
                </Link>
                <div className="space-y-3">
                  <h1 className="font-serif text-4xl leading-tight text-sara-graphite md:text-5xl">
                    {title}
                  </h1>
                  {subtitle ? <p className="text-body text-sara-graphite/70">{subtitle}</p> : null}
                </div>
              </div>
              {children}
            </div>
          </section>

          <aside className="hidden min-h-full bg-sara-graphite text-sara-white lg:block">
            <div className="flex h-full flex-col justify-between p-12">
              <div className="space-y-6">
                <p className="text-caption text-sara-white/70">{copy.eyebrow}</p>
                <div className="max-w-[520px] space-y-5">
                  <p className="font-serif text-5xl leading-tight">{copy.title}</p>
                  <p className="text-sm leading-7 text-sara-white/70">{copy.text}</p>
                </div>
              </div>

              <div className="space-y-6">
                {aside}
                <Button
                  asChild
                  variant="outlineInverted"
                >
                  <Link href={withLocale(locale, '/catalog')}>{copy.catalog}</Link>
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </main>
  );
}
