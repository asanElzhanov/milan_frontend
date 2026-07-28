import { EmptyState } from '@/shared/ui';

import type { AddressBookDictionary } from '../address-book.dictionary';

export function AddressEmptyState({ labels }: { labels: AddressBookDictionary }) {
  return <EmptyState description={labels.emptyDescription} title={labels.emptyTitle} />;
}
