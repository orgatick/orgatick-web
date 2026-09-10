"use client";

import type { AddressResponse } from "@orgatick/contracts";
import { Badge } from "@orgatick/ui/components/badge";
import { Button } from "@orgatick/ui/components/button";
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import {
  IconBuilding,
  IconCheck,
  IconEdit,
  IconHome,
  IconMapPin,
  IconNavigation,
  IconTrash,
} from "@tabler/icons-react";
import type { AddressCardProps, AddressFormValues } from "@orgatick/address/types";

function isAddressResponse(address: AddressResponse | AddressFormValues): address is AddressResponse {
  return "country" in address && typeof address.country === "object" && address.country !== null;
}

export function AddressCard({
  address,
  variant = "generic",
  selected = false,
  onSelect,
  onEdit,
  onDelete,
  onSetDefault,
  className = "",
}: AddressCardProps) {
  const isResponse = isAddressResponse(address);

  // Extract address elements safely
  const addressLine1 = address.addressLine1;
  const addressLine2 = address.addressLine2;
  const landmark = address.landmark;
  const postalCode = address.postalCode;
  const latitude = address.latitude;
  const longitude = address.longitude;

  const countryName = isResponse ? address.country?.name : "";
  const divisionName = isResponse ? address.division?.name : "";
  const cityName = isResponse ? address.city?.name : "";

  const label = "label" in address ? address.label : undefined;
  const venueName = "venueName" in address ? address.venueName : undefined;
  const isDefault = "isDefault" in address ? address.isDefault : undefined;

  // Header Title
  const title = venueName || label || (variant === "event_venue" ? "Venue Location" : "Address");

  return (
    <Card
      className={`relative transition-all duration-200 ${
        selected ? "border-primary ring-2 ring-primary/20 bg-primary/5" : "hover:border-border/80"
      } ${className}`}
    >
      <CardHeader className="pb-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          {variant === "event_venue" ? (
            <IconMapPin className="size-4 text-primary shrink-0" />
          ) : variant === "organization" ? (
            <IconBuilding className="size-4 text-primary shrink-0" />
          ) : (
            <IconHome className="size-4 text-primary shrink-0" />
          )}
          <CardTitle className="truncate font-semibold text-foreground">{title}</CardTitle>
          {isDefault && (
            <Badge variant="secondary" className="text-[10px] uppercase tracking-wider font-semibold">
              Default
            </Badge>
          )}
        </div>

        {selected && (
          <CardAction>
            <span className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <IconCheck className="size-3.5" />
            </span>
          </CardAction>
        )}
      </CardHeader>

      <CardContent className="space-y-2 pt-3 text-sm">
        <div>
          <p className="font-medium text-foreground">{addressLine1}</p>
          {addressLine2 && <p className="text-muted-foreground">{addressLine2}</p>}
          {landmark && (
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <span className="font-medium">Landmark:</span> {landmark}
            </p>
          )}
        </div>

        {/* Location hierarchy line */}
        <p className="text-xs text-muted-foreground">
          {[cityName, divisionName, postalCode, countryName].filter(Boolean).join(", ")}
        </p>

        {/* Latitude & Longitude if venue */}
        {latitude !== null && longitude !== null && latitude !== undefined && longitude !== undefined && (
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground pt-1">
            <IconNavigation className="size-3 text-primary shrink-0" />
            <span>
              {latitude}, {longitude}
            </span>
          </div>
        )}
      </CardContent>

      {/* Footer Actions */}
      {(onSelect || onEdit || onDelete || onSetDefault) && (
        <CardFooter className="flex items-center justify-between gap-2 border-t border-border/40 pt-2 pb-2">
          <div>
            {onSetDefault && !isDefault && (
              <Button variant="ghost" size="sm" className="text-xs h-7 px-2" onClick={() => onSetDefault(address)}>
                Set as default
              </Button>
            )}
          </div>

          <div className="flex items-center gap-1">
            {onSelect && (
              <Button
                variant={selected ? "secondary" : "outline"}
                size="sm"
                className="text-xs h-7 px-2.5"
                onClick={() => onSelect(address)}
              >
                {selected ? "Selected" : "Select"}
              </Button>
            )}
            {onEdit && (
              <Button
                variant="ghost"
                size="icon-sm"
                className="size-7"
                onClick={() => onEdit(address)}
                title="Edit address"
              >
                <IconEdit className="size-3.5" />
                <span className="sr-only">Edit</span>
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="icon-sm"
                className="size-7 text-destructive hover:bg-destructive/10"
                onClick={() => onDelete(address)}
                title="Delete address"
              >
                <IconTrash className="size-3.5" />
                <span className="sr-only">Delete</span>
              </Button>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
