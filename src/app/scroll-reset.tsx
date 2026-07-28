'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Resets the window scroll position to the top on every route (pathname) change.
 *
 * The App Router keeps the window scroll offset when navigating between some
 * routes, which leaves the user part-way down a new page. Forcing an instant
 * scroll-to-top on each pathname change guarantees a predictable "new page
 * starts at the top" behaviour.
 */
export function ScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.scrollTo({ left: 0, top: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}
