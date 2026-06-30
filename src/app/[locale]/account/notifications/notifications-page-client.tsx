'use client';

import { useSearchParams } from 'next/navigation';

import {
  getUnreadNotificationsCount,
  useMarkAllNotificationsReadMutation,
  useNotificationsQuery,
} from '@/entities/notification';
import { getApiErrorMessage } from '@/shared/api';
import type { AppLocale } from '@/shared/config';
import { Button, EmptyState, ErrorState, SectionTitle, Skeleton } from '@/shared/ui';

import type { NotificationsDictionary } from './notifications.dictionary';
import { NotificationsList } from './notifications-list';
import { NotificationsPagination } from './notifications-pagination';

type NotificationsPageClientProps = {
  labels: NotificationsDictionary;
  locale: AppLocale;
};

const parsePage = (value: string | null): number => {
  const page = Number(value);

  return Number.isInteger(page) && page > 0 ? page : 1;
};

function NotificationsLoadingState({ labels }: { labels: NotificationsDictionary }) {
  return (
    <div className="space-y-4">
      <p className="text-caption">{labels.loading}</p>
      <Skeleton className="h-36" />
      <Skeleton className="h-36" />
    </div>
  );
}

export function NotificationsPageClient({ labels, locale }: NotificationsPageClientProps) {
  const searchParams = useSearchParams();
  const page = parsePage(searchParams.get('page'));
  const notificationsQuery = useNotificationsQuery({ page }, { enabled: true });
  const markAllMutation = useMarkAllNotificationsReadMutation();
  const notificationList = notificationsQuery.data;
  const unreadCount = getUnreadNotificationsCount(notificationList);

  const handleReadAll = () => {
    markAllMutation.reset();
    markAllMutation.mutate();
  };

  if (notificationsQuery.isLoading) {
    return <NotificationsLoadingState labels={labels} />;
  }

  if (notificationsQuery.isError) {
    return (
      <ErrorState
        title={labels.loadError}
        description={getApiErrorMessage(notificationsQuery.error)}
        action={<Button onClick={() => void notificationsQuery.refetch()}>{labels.retry}</Button>}
      />
    );
  }

  if (!notificationList || notificationList.notifications.length === 0) {
    return (
      <div className="space-y-6">
        <SectionTitle title={labels.title} description={labels.subtitle} />
        <EmptyState title={labels.emptyTitle} description={labels.emptyDescription} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <SectionTitle title={labels.title} description={labels.subtitle} />
        <div className="flex flex-col items-start gap-3 sm:items-end">
          <p className="text-caption">
            {labels.unreadCount}: {unreadCount}
          </p>
          {unreadCount > 0 ? (
            <Button
              loading={markAllMutation.isPending}
              onClick={handleReadAll}
              size="sm"
              variant="outline"
            >
              {labels.readAll}
            </Button>
          ) : null}
        </div>
      </div>
      {markAllMutation.isError ? (
        <p className="text-sm text-red-700">
          {getApiErrorMessage(markAllMutation.error) || labels.readAllError}
        </p>
      ) : null}
      <NotificationsList labels={labels} notifications={notificationList.notifications} />
      <NotificationsPagination
        currentPage={notificationList.currentPage}
        locale={locale}
        totalPages={notificationList.totalPages}
      />
    </div>
  );
}
