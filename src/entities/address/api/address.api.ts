import { ApiError, apiClient, isMockApiMode } from '@/shared/api';

import { adaptAddress, adaptAddressList } from '../lib/address.adapters';
import type { Address, CreateAddressPayload, UpdateAddressPayload } from '../model/address.types';

const ADDRESSES_ENDPOINT = '/api/v1/auth/addresses/';
const ADDRESS_MUTATION_DISABLED = 'Address changes are disabled in the current API mode';

const getAddressEndpoint = (id: string | number) =>
  `${ADDRESSES_ENDPOINT}${encodeURIComponent(String(id))}/`;

const throwMockMutationError = (): never => {
  throw new ApiError({
    status: 503,
    message: ADDRESS_MUTATION_DISABLED,
    code: 'address_mock_mode',
  });
};

export const addressApi = {
  async getAddresses(): Promise<Address[]> {
    if (isMockApiMode) {
      return [];
    }

    const response = await apiClient.get<unknown>(ADDRESSES_ENDPOINT);

    return adaptAddressList(response);
  },

  async getAddress(id: string | number): Promise<Address | null> {
    if (isMockApiMode) {
      return null;
    }

    const response = await apiClient.get<unknown>(getAddressEndpoint(id));

    return adaptAddress(response);
  },

  async createAddress(payload: CreateAddressPayload): Promise<Address | null> {
    if (isMockApiMode) {
      throwMockMutationError();
    }

    const response = await apiClient.post<unknown>(ADDRESSES_ENDPOINT, payload);

    return adaptAddress(response);
  },

  async updateAddress(id: string | number, payload: UpdateAddressPayload): Promise<Address | null> {
    if (isMockApiMode) {
      throwMockMutationError();
    }

    const response = await apiClient.patch<unknown>(getAddressEndpoint(id), payload);

    return adaptAddress(response);
  },

  async deleteAddress(id: string | number): Promise<void> {
    if (isMockApiMode) {
      throwMockMutationError();
    }

    await apiClient.delete<unknown>(getAddressEndpoint(id));
  },

  async setDefaultAddress(id: string | number): Promise<Address | null> {
    return addressApi.updateAddress(id, { is_default: true });
  },
};
