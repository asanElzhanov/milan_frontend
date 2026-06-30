'use client';

import { getUnreadNotificationsCount, useNotificationsQuery } from '@/entities/notification';
import { hasAuthTokens } from '@/features/auth';

export function NotificationHeaderBadge() {
  const query = useNotificationsQuery(undefined, { enabled: hasAuthTokens() });
  const unreadCount = getUnreadNotificationsCount(query.data);

  if (query.isError || unreadCount <= 0) {
    return null;
  }

  return (
    <span className="absolute top-0 right-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-sara-bronze px-1 text-[10px] font-medium text-sara-white">
      {unreadCount}
    </span>
  );
}
