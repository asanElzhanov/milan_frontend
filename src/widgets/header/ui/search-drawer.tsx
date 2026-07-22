'use client';

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';

import type { AppLocale } from '@/shared/config';
import { withLocale } from '@/shared/config';
import { Button, Drawer, DrawerContent, DrawerTrigger, Input } from '@/shared/ui';

import type { headerDictionary } from '../lib/header.dictionary';

export function SearchDrawer({
  dictionary,
  locale,
}: {
  dictionary: (typeof headerDictionary)[AppLocale];
  locale: AppLocale;
}) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    setOpen(false);
    router.push(`${withLocale(locale, '/catalog')}?search=${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <Drawer onOpenChange={setOpen} open={open}>
      <DrawerTrigger asChild>
        <button
          aria-label={dictionary.searchLabel}
          className="sara-focus inline-flex h-10 w-10 items-center justify-center text-sara-graphite hover:text-sara-bronze"
          type="button"
        >
          <Search aria-hidden className="h-5 w-5" />
        </button>
      </DrawerTrigger>
      <DrawerContent closeLabel={dictionary.close} side="right">
        <form className="space-y-6 pr-8" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <p className="text-overline text-sara-bronze">{dictionary.searchLabel}</p>
            <h2 className="font-fashion text-3xl text-sara-black">{dictionary.searchTitle}</h2>
            <p className="text-sm leading-6 text-sara-graphite/70">
              {dictionary.searchDescription}
            </p>
          </div>
          <Input
            label={dictionary.searchLabel}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={dictionary.searchPlaceholder}
            value={query}
          />
          <Button fullWidth type="submit">
            {dictionary.searchSubmit}
          </Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
