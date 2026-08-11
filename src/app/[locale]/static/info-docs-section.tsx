import { Download } from 'lucide-react';

import type { InfoDoc } from '@/entities/info-doc';

import { StaticPageSection } from './static-page-section';

type InfoDocsSectionProps = {
  title: string;
  docs: InfoDoc[];
};

export function InfoDocsSection({ docs, title }: InfoDocsSectionProps) {
  if (docs.length === 0) {
    return null;
  }

  return (
    <StaticPageSection title={title}>
      <ul className="space-y-3">
        {docs.map((doc) => (
          <li key={doc.id}>
            <a
              className="flex items-center gap-3 text-sara-graphite underline-offset-4 transition-colors hover:text-sara-graphite/70 hover:underline"
              download
              href={doc.fileUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Download aria-hidden="true" className="shrink-0 text-sara-graphite/60" size={18} />
              <span>{doc.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </StaticPageSection>
  );
}
