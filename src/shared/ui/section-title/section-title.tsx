import type { ReactNode } from 'react';

import { cn } from '@/shared/lib';

export type SectionTitleProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
};

export function SectionTitle({
  action,
  align = 'left',
  className,
  description,
  eyebrow,
  title,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        'flex gap-6',
        align === 'center'
          ? 'flex-col items-center text-center'
          : 'flex-col md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <div className="max-w-3xl space-y-3">
        {eyebrow ? <p className="text-overline text-sara-bronze">{eyebrow}</p> : null}
        <h2 className="text-heading text-sara-black">{title}</h2>
        {description ? <p className="text-body text-sara-graphite/70">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
