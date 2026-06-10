import type { ReactNode } from 'react';

import { cn } from '@/shared/lib';

export type EmptyStateProps = {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({ action, className, description, icon, title }: EmptyStateProps) {
  return (
    <div className={cn('sara-card flex flex-col items-center px-6 py-12 text-center', className)}>
      {icon ? <div className="mb-5 text-sara-bronze">{icon}</div> : null}
      <h3 className="font-fashion text-2xl text-sara-black">{title}</h3>
      {description ? (
        <p className="mt-3 max-w-md text-sm leading-6 text-sara-graphite/65">{description}</p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
