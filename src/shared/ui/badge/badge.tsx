import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';

import { cn } from '@/shared/lib';

const badgeVariants = cva(
  'inline-flex w-fit items-center justify-center border font-medium tracking-[0.12em]',
  {
    variants: {
      variant: {
        default: 'border-sara-graphite bg-sara-graphite text-sara-white',
        bronze: 'border-sara-bronze bg-sara-bronze text-sara-white',
        outline: 'border-sara-beige-dark bg-transparent text-sara-graphite',
        success: 'border-emerald-700 bg-emerald-50 text-emerald-800',
        warning: 'border-amber-700 bg-amber-50 text-amber-800',
        danger: 'border-red-700 bg-red-50 text-red-800',
        muted: 'border-sara-beige-dark bg-sara-beige text-sara-graphite/75',
      },
      size: {
        sm: 'px-2 py-0.5 text-[0.65rem]',
        md: 'px-3 py-1 text-xs',
      },
      uppercase: {
        true: 'uppercase',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      uppercase: true,
    },
  },
);

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>;

export function Badge({ className, size, uppercase, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size, uppercase }), className)} {...props} />;
}
