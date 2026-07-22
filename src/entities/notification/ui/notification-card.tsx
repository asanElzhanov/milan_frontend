import Link from 'next/link';

import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui';
import { LOCALE_TAGS, type AppLocale } from '@/shared/config';

import { getNotificationHref, isNotificationUnread } from '../lib/notification.selectors';
import type { Notification } from '../model/notification.types';
import { NotificationTypeBadge } from './notification-type-badge';

export type NotificationCardProps = {
  notification: Notification;
  locale: AppLocale;
  labels?: {
    unread?: string;
    read?: string;
    open?: string;
    order?: string;
    payment?: string;
    delivery?: string;
    review?: string;
    promo?: string;
    system?: string;
  };
};

const isSafeInternalHref = (href: string): boolean =>
  href.startsWith('/') && !href.startsWith('//');

const isSafeExternalHref = (href: string): boolean => {
  try {
    const url = new URL(href);

    return url.protocol === 'https:';
  } catch {
    return false;
  }
};

const formatDate = (value: string | null | undefined, locale: AppLocale): string | null => {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(LOCALE_TAGS[locale], {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
};

function NotificationAction({ href, label }: { href: string | null; label: string }) {
  if (!href) {
    return null;
  }

  if (isSafeInternalHref(href)) {
    return (
      <Button asChild size="sm" variant="outline">
        <Link href={href}>{label}</Link>
      </Button>
    );
  }

  if (isSafeExternalHref(href)) {
    return (
      <Button asChild size="sm" variant="outline">
        <a href={href} rel="noreferrer" target="_blank">
          {label}
        </a>
      </Button>
    );
  }

  return null;
}

export function NotificationCard({ labels, locale, notification }: NotificationCardProps) {
  const unread = isNotificationUnread(notification);
  const href = getNotificationHref(notification);
  const createdAt = formatDate(notification.createdAt, locale);
  const typeKey = String(notification.type ?? 'system').toLowerCase() as keyof NonNullable<
    NotificationCardProps['labels']
  >;

  return (
    <article
      className={cn(
        'border bg-sara-white p-5 transition-colors',
        unread ? 'border-sara-bronze shadow-sm' : 'border-sara-beige-dark/70',
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <NotificationTypeBadge label={labels?.[typeKey]} type={notification.type} />
            <span
              className={cn(
                'text-[0.68rem] font-medium uppercase tracking-[0.14em]',
                unread ? 'text-sara-bronze' : 'text-sara-graphite/55',
              )}
            >
              {unread ? (labels?.unread ?? 'Unread') : (labels?.read ?? 'Read')}
            </span>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-medium text-sara-graphite">{notification.title}</h2>
            {notification.message ? (
              <p className="text-sm leading-6 text-sara-graphite/70">{notification.message}</p>
            ) : null}
          </div>
          {createdAt ? (
            <time
              className="block text-xs text-sara-graphite/50"
              dateTime={notification.createdAt ?? undefined}
            >
              {createdAt}
            </time>
          ) : null}
        </div>
        <NotificationAction href={href} label={labels?.open ?? 'Open'} />
      </div>
    </article>
  );
}
