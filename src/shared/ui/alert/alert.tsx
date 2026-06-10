import { CircleAlert, CircleCheck, Info, TriangleAlert } from 'lucide-react';
import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/shared/lib';

export type AlertProps = HTMLAttributes<HTMLDivElement> & {
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: ReactNode;
  icon?: ReactNode;
};

const variants = {
  info: 'border-sara-beige-dark bg-sara-beige/50 text-sara-graphite',
  success: 'border-emerald-700/30 bg-emerald-50 text-emerald-900',
  warning: 'border-amber-700/30 bg-amber-50 text-amber-900',
  danger: 'border-red-700/30 bg-red-50 text-red-900',
};

const icons = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  danger: CircleAlert,
};

export function Alert({
  children,
  className,
  icon,
  role = 'status',
  title,
  variant = 'info',
  ...props
}: AlertProps) {
  const Icon = icons[variant];

  return (
    <div
      className={cn('flex gap-3 border p-4 text-sm leading-6', variants[variant], className)}
      role={role}
      {...props}
    >
      <div className="mt-0.5 shrink-0">{icon ?? <Icon aria-hidden className="h-5 w-5" />}</div>
      <div>
        {title ? <p className="font-medium">{title}</p> : null}
        {children ? <div className="text-current/80">{children}</div> : null}
      </div>
    </div>
  );
}
