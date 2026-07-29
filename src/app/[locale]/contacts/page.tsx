import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { env, isSupportedLocale } from '@/shared/config';
import { createPageMetadata } from '@/shared/lib';
import { Button } from '@/shared/ui';

import { getStaticDictionary } from '../static/static.dictionary';
import { StaticPageSection } from '../static/static-page-section';
import { StaticPageShell } from '../static/static-page-shell';

type StaticRouteProps = Readonly<{ params: Promise<{ locale: string }> }>;

const getContactItems = (labels: ReturnType<typeof getStaticDictionary>['labels']) => {
  const phoneDigits = env.contact.phone.replace(/\D/g, '');
  const whatsappDigits = env.contact.whatsapp.replace(/\D/g, '');

  return [
    {
      label: labels.whatsapp,
      value: env.contact.whatsapp,
      href: whatsappDigits ? `https://wa.me/${whatsappDigits}` : null,
    },
    {
      label: labels.phone,
      value: env.contact.phone,
      href: phoneDigits ? `tel:+${phoneDigits}` : null,
    },
    {
      label: labels.email,
      value: env.contact.email,
      href: env.contact.email ? `mailto:${env.contact.email}` : null,
    },
    { label: labels.instagram, value: env.contact.instagram, href: null },
    { label: labels.address, value: env.contact.address, href: null },
  ].filter((item) => item.value.trim());
};

export async function generateMetadata({ params }: StaticRouteProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) return {};
  const page = getStaticDictionary(locale).contacts;

  return createPageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    locale,
    path: '/contacts',
  });
}

export default async function ContactsPage({ params }: StaticRouteProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();
  const dictionary = getStaticDictionary(locale);
  const page = dictionary.contacts;
  const contacts = getContactItems(dictionary.labels);
  const supportHref = env.contact.email
    ? `mailto:${env.contact.email}`
    : env.contact.instagram || null;
  const supportLabel =
    locale === 'en'
      ? 'Contact support'
      : locale === 'kk'
        ? 'Қолдау қызметіне жазу'
        : 'Написать в поддержку';

  return (
    <StaticPageShell locale={locale} title={page.title} subtitle={page.subtitle}>
      <StaticPageSection
        title={contacts.length > 0 ? dictionary.labels.contactChannels : undefined}
      >
        {supportHref ? (
          <Button asChild className="mb-5">
            <a href={supportHref}>{supportLabel}</a>
          </Button>
        ) : null}
        {contacts.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {contacts.map((item) => (
              <div className="border border-sara-beige-dark/70 p-4" key={item.label}>
                <p className="text-caption mb-2">{item.label}</p>
                {item.href ? (
                  <a
                    className="break-words text-sara-graphite underline-offset-4 hover:underline"
                    href={item.href}
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="break-words text-sara-graphite">{item.value}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>{dictionary.labels.contactsPending}</p>
        )}
      </StaticPageSection>
    </StaticPageShell>
  );
}
