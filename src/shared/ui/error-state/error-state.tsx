import { AlertCircle } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '@/shared/lib';

export type ErrorStateProps = {
  title?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function ErrorState({
  action,
  className,
  description = 'Попробуйте обновить страницу или повторить действие позже.',
  title = 'Что-то пошло не так',
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'sara-card flex flex-col items-center px-6 py-12 text-center text-sara-graphite',
        className,
      )}
      role="alert"
    >
      <AlertCircle aria-hidden className="h-9 w-9 text-sara-bronze" />
      <h3 className="mt-5 font-fashion text-2xl text-sara-black">{title}</h3>
      <p className="mt-3 max-w-md text-sm leading-6 text-sara-graphite/65">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
