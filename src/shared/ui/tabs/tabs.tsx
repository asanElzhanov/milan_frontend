'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import type { ReactNode } from 'react';

import { cn } from '@/shared/lib';

export type TabItem = {
  value: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
};

export type TabsProps = {
  tabs: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
};

export function Tabs({ className, defaultValue, onValueChange, tabs, value }: TabsProps) {
  return (
    <TabsPrimitive.Root
      className={cn('w-full', className)}
      defaultValue={defaultValue ?? tabs[0]?.value}
      onValueChange={onValueChange}
      value={value}
    >
      <TabsPrimitive.List className="flex border-b border-sara-beige-dark">
        {tabs.map((tab) => (
          <TabsPrimitive.Trigger
            className="sara-focus border-b-2 border-transparent px-4 py-3 text-sm font-medium uppercase tracking-[0.14em] text-sara-graphite/65 transition-colors hover:text-sara-graphite data-[state=active]:border-sara-bronze data-[state=active]:text-sara-graphite disabled:opacity-40"
            disabled={tab.disabled}
            key={tab.value}
            value={tab.value}
          >
            {tab.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      {tabs.map((tab) => (
        <TabsPrimitive.Content className="pt-6" key={tab.value} value={tab.value}>
          {tab.content}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
}
