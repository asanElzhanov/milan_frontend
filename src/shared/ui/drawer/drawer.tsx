'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';

import { cn } from '@/shared/lib';

export const Drawer = DialogPrimitive.Root;
export const DrawerTrigger = DialogPrimitive.Trigger;
export const DrawerClose = DialogPrimitive.Close;

export type DrawerContentProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  side?: 'left' | 'right' | 'bottom';
  closeLabel?: string;
};

const sideClasses = {
  left: 'inset-y-0 left-0 h-full w-[min(420px,calc(100vw-2rem))]',
  right: 'inset-y-0 right-0 h-full w-[min(420px,calc(100vw-2rem))]',
  bottom: 'inset-x-0 bottom-0 max-h-[85vh] w-full',
};

export const DrawerContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  DrawerContentProps
>(({ children, className, closeLabel = 'Close', side = 'right', ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-sara-black/45 backdrop-blur-sm" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed z-50 overflow-y-auto border border-sara-beige-dark bg-sara-white p-6 shadow-xl',
        sideClasses[side],
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="sara-focus absolute top-4 right-4 text-sara-graphite/60 hover:text-sara-graphite">
        <X aria-hidden className="h-5 w-5" />
        <span className="sr-only">{closeLabel}</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));

DrawerContent.displayName = 'DrawerContent';
