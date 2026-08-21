import { describe, expect, it } from 'vitest';

import { adaptNotificationList } from './notification.adapters';

const notification = (id: number) => ({
  id,
  title: `Notification ${id}`,
  message: 'Body',
  is_read: false,
});

describe('adaptNotificationList pagination', () => {
  it('does not overcount pages when the last page is only partially filled', () => {
    const result = adaptNotificationList({
      count: 29,
      next: null,
      previous: 'http://api/notifications/?page=1',
      results: Array.from({ length: 5 }, (_, index) => notification(index + 1)),
      current_page: 2,
    });

    expect(result.totalPages).toBe(2);
  });

  it('derives totalPages from a full page that has more pages after it', () => {
    const result = adaptNotificationList({
      count: 29,
      next: 'http://api/notifications/?page=2',
      previous: null,
      results: Array.from({ length: 24 }, (_, index) => notification(index + 1)),
      current_page: 1,
    });

    expect(result.totalPages).toBe(2);
  });
});
