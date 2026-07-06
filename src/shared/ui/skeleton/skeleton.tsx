import type { ElementType, HTMLAttributes } from 'react';

import { cn } from '@/shared/lib';

export type SkeletonProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  variant?: 'text' | 'card' | 'circle';
};

const variants = {
  text: 'h-4 w-full',
  card: 'aspect-[4/5] w-full',
  circle: 'h-12 w-12 rounded-full',
};

export function Skeleton({ as: Component = 'div', className, variant = 'text', ...props }: SkeletonProps) {
  return (
    <Component
      aria-hidden
      className={cn(
        'block animate-pulse rounded-sara-md bg-sara-beige-dark/45',
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
