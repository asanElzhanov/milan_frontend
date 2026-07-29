'use client';

import { useState } from 'react';

import { canCancelOrder, useCancelOrderMutation, type Order } from '@/entities/order';
import { getApiErrorMessage } from '@/shared/api';
import {
  Alert,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui';

import type { OrdersDictionary } from './orders.dictionary';

type OrderCancelButtonProps = {
  labels: OrdersDictionary;
  order: Order;
  fullWidth?: boolean;
};

export function OrderCancelButton({ labels, order, fullWidth }: OrderCancelButtonProps) {
  const [open, setOpen] = useState(false);
  const cancelMutation = useCancelOrderMutation();

  if (!canCancelOrder(order)) {
    return null;
  }

  const handleConfirm = () => {
    cancelMutation.mutate(
      { orderNumber: order.orderNumber },
      {
        onSuccess: () => {
          setOpen(false);
        },
      },
    );
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (cancelMutation.isPending) {
      return;
    }
    setOpen(nextOpen);
    if (!nextOpen) {
      cancelMutation.reset();
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <Button
        fullWidth={fullWidth}
        onClick={() => setOpen(true)}
        type="button"
        variant="danger"
      >
        {labels.cancelOrder}
      </Button>

      <DialogContent closeLabel={labels.keepOrder}>
        <DialogHeader>
          <DialogTitle>{labels.cancelTitle}</DialogTitle>
          <DialogDescription>{labels.cancelDescription}</DialogDescription>
        </DialogHeader>

        {cancelMutation.isError ? (
          <Alert className="mt-4" variant="danger">
            {getApiErrorMessage(cancelMutation.error) || labels.cancelError}
          </Alert>
        ) : null}

        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={cancelMutation.isPending} type="button" variant="ghost">
              {labels.keepOrder}
            </Button>
          </DialogClose>
          <Button
            loading={cancelMutation.isPending}
            onClick={handleConfirm}
            type="button"
            variant="danger"
          >
            {cancelMutation.isPending ? labels.cancelling : labels.cancelConfirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
