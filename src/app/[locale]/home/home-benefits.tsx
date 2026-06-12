import { ShieldCheck, Sparkles, Truck, WalletCards } from 'lucide-react';

import type { AppLocale } from '@/shared/config';
import { Container, SectionTitle } from '@/shared/ui';

import type { homeDictionary } from './home.dictionary';

const icons = [Truck, WalletCards, ShieldCheck, Sparkles];

export function HomeBenefits({ dictionary }: { dictionary: (typeof homeDictionary)[AppLocale] }) {
  const copy = dictionary.benefits;

  return (
    <section className="bg-sara-beige py-14">
      <Container>
        <SectionTitle eyebrow={copy.eyebrow} title={copy.title} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {copy.items.map((item, index) => {
            const Icon = icons[index] ?? Sparkles;

            return (
              <div className="border border-sara-beige-dark bg-sara-white p-6" key={item}>
                <Icon aria-hidden className="h-6 w-6 text-sara-bronze" />
                <h3 className="mt-5 font-fashion text-2xl text-sara-black">{item}</h3>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
