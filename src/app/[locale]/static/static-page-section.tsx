import type { ReactNode } from 'react';

export type StaticPageSectionProps = {
  title?: string;
  children: ReactNode;
};

export function StaticPageSection({ children, title }: StaticPageSectionProps) {
  return (
    <section className="border border-sara-beige-dark/70 bg-sara-white p-6 md:p-8">
      {title ? (
        <h2 className="mb-4 font-serif text-2xl text-sara-graphite md:text-3xl">{title}</h2>
      ) : null}
      <div className="space-y-4 text-sm leading-7 text-sara-graphite/75 md:text-base">
        {children}
      </div>
    </section>
  );
}
