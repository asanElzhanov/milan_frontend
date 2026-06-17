'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useLogoutMutation } from '@/features/auth';
import { withLocale, type AppLocale } from '@/shared/config';
import { Button } from '@/shared/ui';

export function AccountLogoutButton({ label, locale }: { label: string; locale: AppLocale }) {
  const router = useRouter();
  const logoutMutation = useLogoutMutation();

  return (
    <Button
      fullWidth
      loading={logoutMutation.isPending}
      onClick={() =>
        logoutMutation.mutate(undefined, {
          onSettled: () => router.push(withLocale(locale, '/login')),
        })
      }
      size="sm"
      type="button"
      variant="ghost"
    >
      <LogOut aria-hidden className="h-4 w-4" />
      {label}
    </Button>
  );
}
