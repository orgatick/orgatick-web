"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@orgatick/ui/components/dialog";
import type { AddressDialogProps, AddressFormValues } from "@orgatick/address/types";
import { AddressForm } from "@orgatick/address/components/address-form";

export function AddressDialog({
  open,
  onOpenChange,
  title,
  description,
  variant = "generic",
  initialValues,
  dataLoader,
  onSubmit,
}: AddressDialogProps) {
  const defaultTitle =
    title ||
    (variant === "event_venue"
      ? "Set Venue Address"
      : variant === "organization"
        ? "Add Organization Address"
        : "Add Address");

  const defaultDescription =
    description ||
    (variant === "event_venue"
      ? "Specify the location and coordinates for this venue."
      : variant === "organization"
        ? "Enter the registered office or facility address."
        : "Enter your delivery or billing address details.");

  const handleSubmit = async (values: AddressFormValues) => {
    await onSubmit(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{defaultTitle}</DialogTitle>
          <DialogDescription>{defaultDescription}</DialogDescription>
        </DialogHeader>

        <div className="py-2">
          <AddressForm
            variant={variant}
            initialValues={initialValues}
            dataLoader={dataLoader}
            onSubmit={handleSubmit}
            onCancel={() => onOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
