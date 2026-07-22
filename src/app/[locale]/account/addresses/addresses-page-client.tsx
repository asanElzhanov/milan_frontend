'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';

import type { Address } from '@/entities/address';
import {
  createAddressPayload,
  useAddressesQuery,
  useCreateAddressMutation,
  useDeleteAddressMutation,
  useSetDefaultAddressMutation,
  useUpdateAddressMutation,
} from '@/entities/address';
import {
  AddressDeleteDialog,
  AddressEmptyState,
  AddressForm,
  AddressList,
  getAddressBookDictionary,
  type AddressFormValues,
} from '@/features/address-book';
import { getApiErrorMessage } from '@/shared/api';
import type { AppLocale } from '@/shared/config';
import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  ErrorState,
  Skeleton,
} from '@/shared/ui';

type FormMode = 'create' | 'edit';

function AddressesLoadingState() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-24" />
      <div className="grid gap-4 xl:grid-cols-2">
        <Skeleton className="h-56" />
        <Skeleton className="h-56" />
      </div>
    </div>
  );
}

export function AddressesPageClient({ locale }: { locale: AppLocale }) {
  const labels = getAddressBookDictionary(locale);
  const addressesQuery = useAddressesQuery();
  const createMutation = useCreateAddressMutation();
  const updateMutation = useUpdateAddressMutation();
  const deleteMutation = useDeleteAddressMutation();
  const setDefaultMutation = useSetDefaultAddressMutation();
  const [formMode, setFormMode] = useState<FormMode>('create');
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deletingAddress, setDeletingAddress] = useState<Address | null>(null);
  const [feedback, setFeedback] = useState<{
    variant: 'success' | 'danger';
    message: string;
  } | null>(null);

  const isMutating =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending ||
    setDefaultMutation.isPending;

  const openCreateForm = () => {
    setFeedback(null);
    setEditingAddress(null);
    setFormMode('create');
    setIsFormOpen(true);
  };

  const openEditForm = (address: Address) => {
    setFeedback(null);
    setEditingAddress(address);
    setFormMode('edit');
    setIsFormOpen(true);
  };

  const handleSubmit = (values: AddressFormValues) => {
    setFeedback(null);
    const payload = createAddressPayload({
      ...values,
      fullName: values.recipientName,
    });

    if (formMode === 'edit' && editingAddress) {
      updateMutation.mutate(
        { id: editingAddress.id, payload },
        {
          onSuccess: () => {
            setFeedback({ variant: 'success', message: labels.updateSuccess });
            setIsFormOpen(false);
            setEditingAddress(null);
          },
          onError: (error) =>
            setFeedback({
              variant: 'danger',
              message: getApiErrorMessage(error) || labels.updateError,
            }),
        },
      );
      return;
    }

    createMutation.mutate(payload, {
      onSuccess: () => {
        setFeedback({ variant: 'success', message: labels.createSuccess });
        setIsFormOpen(false);
      },
      onError: (error) =>
        setFeedback({
          variant: 'danger',
          message: getApiErrorMessage(error) || labels.createError,
        }),
    });
  };

  const handleDelete = () => {
    if (!deletingAddress) {
      return;
    }

    setFeedback(null);
    deleteMutation.mutate(deletingAddress.id, {
      onSuccess: () => {
        setFeedback({ variant: 'success', message: labels.deleteSuccess });
        setDeletingAddress(null);
      },
      onError: (error) =>
        setFeedback({
          variant: 'danger',
          message: getApiErrorMessage(error) || labels.deleteError,
        }),
    });
  };

  const handleSetDefault = (address: Address) => {
    setFeedback(null);
    setDefaultMutation.mutate(address.id, {
      onSuccess: () => setFeedback({ variant: 'success', message: labels.setDefaultSuccess }),
      onError: (error) =>
        setFeedback({
          variant: 'danger',
          message: getApiErrorMessage(error) || labels.setDefaultError,
        }),
    });
  };

  if (addressesQuery.isLoading) {
    return <AddressesLoadingState />;
  }

  if (addressesQuery.isError) {
    return (
      <ErrorState
        action={
          <Button onClick={() => void addressesQuery.refetch()} type="button">
            {labels.title}
          </Button>
        }
        description={getApiErrorMessage(addressesQuery.error)}
      />
    );
  }

  const addresses = addressesQuery.data ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 border border-sara-beige-dark bg-sara-white p-5 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <p className="text-caption">{labels.title}</p>
          <h2 className="font-serif text-3xl text-sara-graphite">{labels.title}</h2>
          <p className="text-sm leading-6 text-sara-graphite/65">{labels.subtitle}</p>
        </div>
        <Button onClick={openCreateForm} type="button">
          <Plus aria-hidden className="h-4 w-4" />
          {labels.addAddress}
        </Button>
      </div>

      {feedback ? <Alert title={feedback.message} variant={feedback.variant} /> : null}

      {addresses.length > 0 ? (
        <AddressList
          addresses={addresses}
          isPending={isMutating}
          labels={labels}
          onDelete={setDeletingAddress}
          onEdit={openEditForm}
          onSetDefault={handleSetDefault}
        />
      ) : (
        <AddressEmptyState labels={labels} onAdd={openCreateForm} />
      )}

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-3xl" closeLabel={labels.cancel}>
          <DialogHeader>
            <DialogTitle>
              {formMode === 'edit' ? labels.editAddress : labels.addAddress}
            </DialogTitle>
          </DialogHeader>
          <AddressForm
            initialAddress={editingAddress}
            isSubmitting={createMutation.isPending || updateMutation.isPending}
            key={editingAddress?.id ?? formMode}
            labels={labels}
            onCancel={() => setIsFormOpen(false)}
            onSubmit={handleSubmit}
            submitLabel={formMode === 'edit' ? labels.save : labels.create}
          />
        </DialogContent>
      </Dialog>

      <AddressDeleteDialog
        address={deletingAddress}
        isDeleting={deleteMutation.isPending}
        labels={labels}
        onConfirm={handleDelete}
        onOpenChange={(open) => {
          if (!open) {
            setDeletingAddress(null);
          }
        }}
      />
    </div>
  );
}
