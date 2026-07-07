import Link from 'next/link';
import { Suspense } from 'react';

import { env, withLocale } from '@/shared/config';
import { LanguageSwitcher } from '@/widgets/header/ui/language-switcher';

import { footerDictionary } from '../lib/footer.dictionary';
import { getFooterLinkGroups } from '../lib/footer-links';
import type { FooterProps } from '../model/types';

export function Footer({ locale }: FooterProps) {
  const groups = getFooterLinkGroups(locale);
  const dictionary = footerDictionary[locale];
  const showNewsletter = env.features.newsletter;

  return (
    <footer className="bg-sara-graphite text-sara-white">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-[80px] md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr_1fr]">
          <div className="space-y-5">
            <Link className="font-fashion text-3xl tracking-[0.18em]" href={withLocale(locale)}>
              SARA MILAN
            </Link>
            <div className="pt-6">
              <Suspense fallback={null}>
                <LanguageSwitcher locale={locale} variant="footer" />
              </Suspense>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {groups.map((group) => (
              <div key={group.title}>
                <h2 className="text-overline mb-5 text-sara-beige">{group.title}</h2>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        className="text-sm text-sara-beige/75 hover:text-sara-white"
                        href={link.href}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="space-y-5">
            <div>
              <h2 className="text-overline mb-5 text-sara-beige">{dictionary.contacts}</h2>
              <div className="space-y-3 text-sm text-sara-beige/75">
                <p>{dictionary.contactsPlaceholder}</p>
              </div>
            </div>

            {showNewsletter ? (
              <form className="space-y-3" aria-label={dictionary.newsletterTitle}>
                <label className="text-overline block text-sara-beige" htmlFor="footer-email">
                  {dictionary.newsletterTitle}
                </label>
                <input
                  className="w-full border border-sara-beige/30 bg-transparent px-3 py-3 text-sm text-sara-white placeholder:text-sara-beige/45"
                  disabled
                  id="footer-email"
                  placeholder={dictionary.newsletterSoon}
                  type="email"
                />
                <p className="text-xs leading-5 text-sara-beige/55">
                  {dictionary.newsletterDescription}
                </p>
              </form>
            ) : (
              <p className="text-sm leading-6 text-sara-beige/65">
                {dictionary.newsletterDescription}
              </p>
            )}
          </div>
        </div>

        <div className="mt-12 border-t border-sara-beige/20 pt-6 text-xs text-sara-beige/55">
          © {new Date().getFullYear()} SARA MILAN. {dictionary.rights}
        </div>
      </div>
    </footer>
  );
}
