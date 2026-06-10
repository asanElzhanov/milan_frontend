import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { forwardRef, type ButtonHTMLAttributes } from 'react';

import { cn } from '@/shared/lib';

const buttonVariants = cva(
  'sara-focus inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium uppercase tracking-[0.16em] transition-colors disabled:pointer-events-none disabled:opacity-45',
  {
    variants: {
      variant: {
        primary: 'bg-sara-graphite text-sara-white hover:bg-sara-black',
        secondary: 'bg-sara-beige text-sara-graphite hover:bg-sara-beige-dark/70',
        outline:
          'border border-sara-graphite bg-transparent text-sara-graphite hover:bg-sara-graphite hover:text-sara-white',
        ghost: 'bg-transparent text-sara-graphite hover:bg-sara-beige',
        link: 'h-auto px-0 py-0 text-sara-graphite underline-offset-4 hover:text-sara-bronze hover:underline',
        danger: 'bg-red-700 text-white hover:bg-red-800',
      },
      size: {
        sm: 'h-9 px-4 text-[0.7rem]',
        md: 'h-11 px-6 text-xs',
        lg: 'h-13 px-8 text-sm',
        icon: 'h-11 w-11 px-0',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild = false,
      children,
      className,
      disabled,
      fullWidth,
      loading = false,
      size,
      type = 'button',
      variant,
      ...props
    },
    ref,
  ) => {
    const Component = asChild ? Slot : 'button';

    return (
      <Component
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        disabled={disabled || loading}
        type={asChild ? undefined : type}
        {...props}
      >
        {loading ? <Loader2 aria-hidden className="h-4 w-4 animate-spin" /> : null}
        {children}
      </Component>
    );
  },
);

Button.displayName = 'Button';
