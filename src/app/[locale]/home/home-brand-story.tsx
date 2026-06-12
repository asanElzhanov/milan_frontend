import Link from 'next/link';

import type { AppLocale } from '@/shared/config';
import { withLocale } from '@/shared/lib';
import { Button, Container } from '@/shared/ui';

import type { homeDictionary } from './home.dictionary';

export function HomeBrandStory({
  dictionary,
  locale,
}: {
  dictionary: (typeof homeDictionary)[AppLocale];
  locale: AppLocale;
}) {
  const copy = dictionary.brandStory;

  return (
    <section className="sara-section bg-sara-white">
      <Container className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="min-h-[420px] border border-sara-beige-dark bg-sara-beige p-8">
          <div className="flex h-full min-h-[360px] items-end border border-sara-bronze/25 p-8">
            <p className="max-w-xs font-fashion text-4xl leading-tight text-sara-black">
              SARA MILAN
            </p>
          </div>
        </div>
        <div>
          <p className="text-overline text-sara-bronze">{copy.eyebrow}</p>
          <h2 className="text-heading mt-4 text-sara-black">{copy.title}</h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-sara-graphite/70">
            {copy.description}
          </p>
          <Button asChild className="mt-8" variant="outline">
            <Link href={withLocale(locale, '/about')}>{copy.cta}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
