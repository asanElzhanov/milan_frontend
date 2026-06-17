export { addressApi } from './api/address.api';
export { addressKeys } from './api/address.keys';
export {
  useAddressQuery,
  useAddressesQuery,
  useCreateAddressMutation,
  useDeleteAddressMutation,
  useSetDefaultAddressMutation,
  useUpdateAddressMutation,
} from './api/address.queries';
export { adaptAddress, adaptAddressList, createAddressPayload } from './lib/address.adapters';
export {
  formatAddressLine,
  formatAddressRecipient,
  getDefaultAddress,
  isAddressComplete,
} from './lib/address.selectors';
export type {
  Address,
  AddressPayload,
  CreateAddressPayload,
  UpdateAddressPayload,
} from './model/address.types';
