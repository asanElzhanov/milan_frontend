import Link from 'next/link';

import { withLocale, type AppLocale } from '@/shared/config';
import { Button, Container } from '@/shared/ui';

import type { HomeDictionary } from './home.types';

type HomeBrandStoryProps = {
  dictionary: HomeDictionary;
  locale: AppLocale;
};

export function HomeBrandStory({ dictionary, locale }: HomeBrandStoryProps) {
  return (
    <section className="sara-section-lg bg-sara-white">
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div className="space-y-4">
          <p className="text-overline text-sara-bronze">{dictionary.story.eyebrow}</p>
          <h2 className="text-heading text-sara-black">{dictionary.story.title}</h2>
        </div>
        <div className="space-y-6">
          <p className="font-fashion text-3xl leading-tight text-sara-graphite">
            {dictionary.story.lead}
          </p>
          <p className="text-body text-sara-graphite/72">{dictionary.story.body}</p>
          <Button asChild variant="link">
            <Link href={withLocale(locale, '/about')}>{dictionary.story.cta}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
