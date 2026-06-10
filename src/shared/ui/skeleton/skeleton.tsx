import type { HTMLAttributes } from 'react';

import { cn } from '@/shared/lib';

export type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  variant?: 'text' | 'card' | 'circle';
};

const variants = {
  text: 'h-4 w-full',
  card: 'aspect-[4/5] w-full',
  circle: 'h-12 w-12 rounded-full',
};

export function Skeleton({ className, variant = 'text', ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={cn(
        'animate-pulse rounded-sara-md bg-sara-beige-dark/45',
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
