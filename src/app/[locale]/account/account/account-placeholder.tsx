import { Alert, EmptyState } from '@/shared/ui';

import type { AccountDictionary } from './account.types';

export function AccountPlaceholder({
  message,
  title,
}: {
  title: string;
  message: AccountDictionary[keyof AccountDictionary];
}) {
  return (
    <div className="space-y-5">
      <EmptyState description={message} title={title} />
      <Alert title={message} variant="info" />
    </div>
  );
}
