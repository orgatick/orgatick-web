"use client";

import type { AddressResponse } from "@orgatick/contracts";
import { Button } from "@orgatick/ui/components/button";
import { IconMapPinOff, IconPlus } from "@tabler/icons-react";
import type { AddressFormValues, AddressPickerProps } from "@orgatick/address/types";
import { AddressCard } from "@orgatick/address/components/address-card";

export function AddressPicker({
  addresses = [],
  selectedUuid,
  onSelectAddress,
  onAddNewAddress,
  onEditAddress,
  onDeleteAddress,
  variant = "generic",
  className = "",
}: AddressPickerProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header bar */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            {variant === "event_venue"
              ? "Select Venue"
              : variant === "organization"
                ? "Organization Locations"
                : "Saved Addresses"}
          </h3>
          <p className="text-xs text-muted-foreground">
            {variant === "event_venue"
              ? "Choose from existing venues or add a new one"
              : "Select a primary address or add a new one"}
          </p>
        </div>

        {onAddNewAddress && (
          <Button size="sm" variant="outline" onClick={onAddNewAddress} className="gap-1 text-xs">
            <IconPlus className="size-3.5" />
            {variant === "event_venue" ? "Add Venue" : "Add Address"}
          </Button>
        )}
      </div>

      {/* Addresses Grid / Empty State */}
      {addresses.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-8 text-center bg-muted/20">
          <div className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground mb-3">
            <IconMapPinOff className="size-5" />
          </div>
          <p className="text-sm font-medium text-foreground">No addresses found</p>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs">
            {variant === "event_venue"
              ? "You haven't configured any venue addresses yet."
              : "You haven't added any saved addresses yet."}
          </p>
          {onAddNewAddress && (
            <Button size="sm" onClick={onAddNewAddress} className="mt-4 gap-1.5 text-xs">
              <IconPlus className="size-3.5" />
              {variant === "event_venue" ? "Add New Venue" : "Add New Address"}
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {addresses.map((addr: AddressResponse | (AddressFormValues & { uuid?: string })) => {
            const uuid = "uuid" in addr ? (addr.uuid as string | undefined) : undefined;
            const isSelected = selectedUuid ? uuid === selectedUuid : false;

            return (
              <AddressCard
                key={uuid || addr.addressLine1}
                address={addr}
                variant={variant}
                selected={isSelected}
                onSelect={() => onSelectAddress(addr)}
                onEdit={onEditAddress ? () => onEditAddress(addr) : undefined}
                onDelete={onDeleteAddress ? () => onDeleteAddress(addr) : undefined}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
