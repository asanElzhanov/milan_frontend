import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { CreateAddressPayload, UpdateAddressPayload } from '../model/address.types';
import { addressApi } from './address.api';
import { addressKeys } from './address.keys';

export function useAddressesQuery(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: addressKeys.list(),
    queryFn: () => addressApi.getAddresses(),
    enabled: options?.enabled,
    retry: 1,
  });
}

export function useAddressQuery(
  id: string | number | null | undefined,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: addressKeys.detail(id ?? 'unknown'),
    queryFn: () => addressApi.getAddress(id as string | number),
    enabled: Boolean(id) && options?.enabled !== false,
    retry: 1,
  });
}

export function useCreateAddressMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateAddressPayload) => addressApi.createAddress(payload),
    retry: false,
    onSuccess: async (address) => {
      if (address) {
        queryClient.setQueryData(addressKeys.detail(address.id), address);
      }

      await queryClient.invalidateQueries({ queryKey: addressKeys.list() });
    },
  });
}

export function useUpdateAddressMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string | number; payload: UpdateAddressPayload }) =>
      addressApi.updateAddress(id, payload),
    retry: false,
    onSuccess: async (address, variables) => {
      if (address) {
        queryClient.setQueryData(addressKeys.detail(address.id), address);
      } else {
        await queryClient.invalidateQueries({ queryKey: addressKeys.detail(variables.id) });
      }

      await queryClient.invalidateQueries({ queryKey: addressKeys.list() });
    },
  });
}

export function useDeleteAddressMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => addressApi.deleteAddress(id),
    retry: false,
    onSuccess: async (_result, id) => {
      queryClient.removeQueries({ queryKey: addressKeys.detail(id) });
      await queryClient.invalidateQueries({ queryKey: addressKeys.list() });
    },
  });
}

export function useSetDefaultAddressMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => addressApi.setDefaultAddress(id),
    retry: false,
    onSuccess: async (address) => {
      if (address) {
        queryClient.setQueryData(addressKeys.detail(address.id), address);
      }

      await queryClient.invalidateQueries({ queryKey: addressKeys.list() });
    },
  });
}
