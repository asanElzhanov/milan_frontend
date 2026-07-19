import Link from 'next/link';

import type { AppLocale } from '@/shared/config';
import { withLocale } from '@/shared/config';

import type { AuthDictionary } from '../model/auth-ui.types';

const conjunction = {
  ru: 'и',
  kk: 'және',
  en: 'and',
};

export function AuthLegalNote({
  dictionary,
  locale,
}: {
  dictionary: AuthDictionary;
  locale: AppLocale;
}) {
  return (
    <p className="text-caption">
      {dictionary.termsPrefix}{' '}
      <Link className="sara-focus text-sara-graphite underline" href={withLocale(locale, '/terms')}>
        {dictionary.terms}
      </Link>{' '}
      {conjunction[locale]}{' '}
      <Link
        className="sara-focus text-sara-graphite underline"
        href={withLocale(locale, '/privacy')}
      >
        {dictionary.privacy}
      </Link>
      .
    </p>
  );
}
