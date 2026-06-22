import { Badge } from '@/shared/ui';

import type { ReviewStatus } from '../model/review.types';

export type ReviewStatusLabels = Partial<
  Record<'pending' | 'approved' | 'rejected' | 'published' | 'hidden', string>
>;

const variants = {
  pending: 'warning',
  approved: 'success',
  rejected: 'danger',
  published: 'success',
  hidden: 'muted',
} as const;

export function ReviewStatusBadge({
  labels,
  status,
}: {
  status?: ReviewStatus | null;
  labels?: ReviewStatusLabels;
}) {
  if (!status) return null;
  const normalized = status.toLowerCase();
  const known = normalized in variants ? (normalized as keyof typeof variants) : null;
  return (
    <Badge uppercase={false} variant={known ? variants[known] : 'outline'}>
      {known ? (labels?.[known] ?? status) : status}
    </Badge>
  );
}
