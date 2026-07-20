import Image from 'next/image';

import { theme } from '@/shared/config';
import { formatPriceKzt, getMediaUrl } from '@/shared/lib';

const colorSwatches = [
  { name: 'sara-white', value: theme.colors.saraWhite, className: 'bg-sara-white' },
  { name: 'sara-beige', value: theme.colors.saraBeige, className: 'bg-sara-beige' },
  { name: 'sara-beige-dark', value: theme.colors.saraBeigeDark, className: 'bg-sara-beige-dark' },
  { name: 'sara-bronze', value: theme.colors.saraBronze, className: 'bg-sara-bronze' },
  { name: 'sara-graphite', value: theme.colors.saraGraphite, className: 'bg-sara-graphite' },
  { name: 'sara-black', value: theme.colors.saraBlack, className: 'bg-sara-black' },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-sara-white text-sara-graphite">
      <section className="sara-container sara-section-lg space-y-12">
        <div className="max-w-3xl space-y-5">
          <p className="text-overline text-sara-bronze">Production frontend foundation</p>
          <h1 className="fashion-hero-title text-sara-black">Sara Milan</h1>
          <p className="text-subheading text-sara-graphite">Premium fashion theme foundation</p>
          <p className="text-body max-w-2xl text-sara-graphite/75">
            Technical preview for colors, typography, spacing, media fallback, and KZT price
            formatting. Production pages and UI Kit components will be added later.
          </p>
        </div>

        <div className="editorial-grid">
          <section className="sara-card col-span-12 space-y-6 p-6 lg:col-span-7 lg:p-8">
            <div className="space-y-2">
              <h2 className="text-heading text-sara-black">Theme palette</h2>
              <p className="text-caption">Tokens migrated from the Vite visual prototype.</p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {colorSwatches.map((color) => (
                <div key={color.name} className="sara-border bg-sara-white p-3">
                  <div className={`mb-3 h-20 ${color.className}`} />
                  <p className="text-caption font-medium text-sara-graphite">{color.name}</p>
                  <p className="text-caption">{color.value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="sara-card col-span-12 space-y-6 p-6 lg:col-span-5 lg:p-8">
            <div className="space-y-4">
              <p className="text-overline text-sara-bronze">Typography</p>
              <h2 className="text-display text-sara-black">Editorial heading</h2>
              <h3 className="text-subheading text-sara-graphite">Luxury subheading</h3>
              <p className="text-body text-sara-graphite/75">
                The interface uses the system sans-serif font for body text, controls, and headings.
              </p>
              <p className="text-caption">Caption text for supporting details and metadata.</p>
            </div>
          </section>

          <section className="sara-card col-span-12 grid gap-8 p-6 md:grid-cols-[220px_1fr] lg:p-8">
            <Image
              src={getMediaUrl(null)}
              alt="Sara Milan product placeholder"
              width={800}
              height={1000}
              className="sara-border aspect-[4/5] w-full bg-sara-beige object-cover"
            />

            <div className="space-y-5">
              <p className="text-overline text-sara-bronze">Foundation utilities</p>
              <h2 className="text-heading text-sara-black">Reusable primitives</h2>
              <p className="text-body max-w-2xl text-sara-graphite/75">
                Shared helpers now cover KZT price formatting, safe media URLs, focus treatment,
                borders, cards, containers, and editorial layout rhythm.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <span className="font-fashion text-3xl text-sara-black">
                  {formatPriceKzt(25900)}
                </span>
                <a href="#theme-link" className="luxury-link uppercase-nav sara-focus">
                  Luxury link sample
                </a>
                <button className="sara-focus bg-sara-graphite px-6 py-3 text-overline text-sara-white transition-colors hover:bg-sara-black">
                  Button sample
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
