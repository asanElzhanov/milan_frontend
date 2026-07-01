import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { cartKeys } from '@/entities/cart';
import { getCartToken } from '@/shared/api';

import { mergeGuestCartAfterAuth } from '@/features/cart';

import type {
  LoginPayload,
  LogoutPayload,
  ChangePasswordPayload,
  RefreshPayload,
  RegisterPayload,
  UpdateProfilePayload,
} from '../model/auth.types';
import { hasAuthTokens } from '../lib/auth-token-storage';
import { authApi } from './auth.api';
import { authKeys } from './auth.keys';

export function useCurrentUserQuery(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: () => authApi.me(),
    enabled: options?.enabled ?? hasAuthTokens(),
    retry: 1,
  });
}

const tryMergeGuestCart = async (queryClient: ReturnType<typeof useQueryClient>) => {
  if (!getCartToken()) {
    return;
  }

  try {
    await mergeGuestCartAfterAuth();
    await queryClient.invalidateQueries({ queryKey: cartKeys.current() });
  } catch (error) {
    console.warn('Guest cart merge after auth failed', error);
  }
};

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    retry: false,
    onSuccess: async (result) => {
      if (result.user) {
        queryClient.setQueryData(authKeys.me(), result.user);
      } else if (result.tokens) {
        await queryClient.invalidateQueries({ queryKey: authKeys.me() });
      }

      if (result.tokens) {
        await tryMergeGuestCart(queryClient);
      }
    },
  });
}

export function useRegisterMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
    retry: false,
    onSuccess: async (result) => {
      if (result.user) {
        queryClient.setQueryData(authKeys.me(), result.user);
      } else if (result.tokens) {
        await queryClient.invalidateQueries({ queryKey: authKeys.me() });
      }

      if (result.tokens) {
        await tryMergeGuestCart(queryClient);
      }
    },
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload?: LogoutPayload) => authApi.logout(payload),
    retry: false,
    onSuccess: async () => {
      queryClient.setQueryData(authKeys.me(), null);
      await queryClient.invalidateQueries({ queryKey: authKeys.all });
      await queryClient.invalidateQueries({ queryKey: cartKeys.current() });
    },
  });
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => authApi.updateMe(payload),
    retry: false,
    onSuccess: (user) => {
      if (user) {
        queryClient.setQueryData(authKeys.me(), user);
      }
    },
  });
}

export function useChangePasswordMutation() {
  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) => authApi.changePassword(payload),
    retry: false,
  });
}

export function useRefreshTokenMutation() {
  return useMutation({
    mutationFn: (payload?: RefreshPayload) => authApi.refresh(payload),
    retry: false,
  });
}
