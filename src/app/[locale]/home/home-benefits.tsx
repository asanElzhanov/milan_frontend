import { CreditCard, Headphones, Sparkles, Truck } from 'lucide-react';

import type { AppLocale } from '@/shared/config';
import { Container, SectionTitle } from '@/shared/ui';

import type { HomeDictionary } from './home.types';

type HomeBenefitsProps = {
  dictionary: HomeDictionary;
  locale: AppLocale;
};

const icons = [Truck, CreditCard, Headphones, Sparkles] as const;

export function HomeBenefits({ dictionary }: HomeBenefitsProps) {
  return (
    <section className="sara-section bg-sara-beige">
      <Container>
        <SectionTitle
          align="center"
          description={dictionary.benefits.description}
          eyebrow={dictionary.benefits.eyebrow}
          title={dictionary.benefits.title}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dictionary.benefits.items.map((item, index) => {
            const Icon = icons[index] ?? Sparkles;

            return (
              <article key={item.title} className="sara-card h-full p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sara-graphite text-sara-white">
                  <Icon aria-hidden className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-sara-black">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-sara-graphite/70">{item.description}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
