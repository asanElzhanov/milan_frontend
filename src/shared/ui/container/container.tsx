import type { ElementType, HTMLAttributes } from 'react';

import { cn } from '@/shared/lib';

export type ContainerProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: boolean;
};

const sizeClasses = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-[1440px]',
  full: 'max-w-none',
};

export function Container({
  as: Component = 'div',
  children,
  className,
  padding = true,
  size = 'xl',
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn('mx-auto w-full', sizeClasses[size], padding && 'px-5 md:px-[80px]', className)}
      {...props}
    >
      {children}
    </Component>
  );
}
