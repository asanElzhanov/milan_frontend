import Link from 'next/link';
import { Suspense } from 'react';

import { withLocale } from '@/shared/config';
import { LanguageSwitcher } from '@/widgets/header/ui/language-switcher';

import { footerDictionary } from '../lib/footer.dictionary';
import { getFooterLinkGroups } from '../lib/footer-links';
import type { FooterProps } from '../model/types';
import { FooterContacts } from './footer-contacts';

export function Footer({ locale }: FooterProps) {
  const groups = getFooterLinkGroups(locale);
  const dictionary = footerDictionary[locale];

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

          <div>
            <FooterContacts fallbackTitle={dictionary.contacts} locale={locale} />
          </div>
        </div>

        <div className="mt-12 border-t border-sara-beige/20 pt-6 text-xs text-sara-beige/55">
          © {new Date().getFullYear()} SARA MILAN. {dictionary.rights}
        </div>
      </div>
    </footer>
  );
}
