"use client";

import type { UseFormReturn } from "react-hook-form";
import { IconBuildingCommunity, IconCompass, IconMapPin, IconNavigation, IconWorld } from "@tabler/icons-react";
import { Button } from "@orgatick/ui/components/button";
import { Field, FieldDescription, FieldError, FieldLabel } from "@orgatick/ui/components/field";
import { Input } from "@orgatick/ui/components/input";
import type { CreateOrganization } from "../_schemas/create-organization.schema";

interface Step2AddressProps {
  form: UseFormReturn<CreateOrganization>;
  onNext: () => void;
  onPrev: () => void;
}

export function Step2Address({ form, onNext, onPrev }: Step2AddressProps) {
  const {
    register,
    formState: { errors },
  } = form;

  const addressErrors = errors.address;

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="border-b border-border/60 pb-4">
        <h2 className="text-xl font-bold text-foreground">Registered Address & Location</h2>
        <p className="text-xs text-muted-foreground sm:text-sm">
          Specify your organization's headquarters or official operating address for legal invoicing and tax compliance.
        </p>
      </div>

      {/* Main Address Fields */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Address Line 1 */}
        <Field data-invalid={!!addressErrors?.addressLine1} className="sm:col-span-2">
          <FieldLabel htmlFor="addr-line1">
            Street Address / Building Line 1 <span className="text-destructive">*</span>
          </FieldLabel>
          <div className="relative">
            <Input
              id="addr-line1"
              placeholder="e.g. Suite 402, Innov8 Hub, 24 MG Road"
              aria-invalid={!!addressErrors?.addressLine1}
              className="pl-9"
              {...register("address.addressLine1")}
            />
            <IconBuildingCommunity className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          </div>
          <FieldError errors={addressErrors?.addressLine1 ? [addressErrors.addressLine1] : []} />
        </Field>

        {/* Address Line 2 */}
        <Field data-invalid={!!addressErrors?.addressLine2} className="sm:col-span-2">
          <FieldLabel htmlFor="addr-line2">Address Line 2 (Optional)</FieldLabel>
          <div className="relative">
            <Input
              id="addr-line2"
              placeholder="e.g. Near Metro Station, Sector 4"
              aria-invalid={!!addressErrors?.addressLine2}
              className="pl-9"
              {...register("address.addressLine2")}
            />
            <IconMapPin className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          </div>
          <FieldError errors={addressErrors?.addressLine2 ? [addressErrors.addressLine2] : []} />
        </Field>

        {/* Landmark */}
        <Field data-invalid={!!addressErrors?.landmark}>
          <FieldLabel htmlFor="addr-landmark">Landmark</FieldLabel>
          <div className="relative">
            <Input
              id="addr-landmark"
              placeholder="e.g. Opposite City Mall"
              aria-invalid={!!addressErrors?.landmark}
              className="pl-9"
              {...register("address.landmark")}
            />
            <IconCompass className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          </div>
          <FieldError errors={addressErrors?.landmark ? [addressErrors.landmark] : []} />
        </Field>

        {/* Postal Code / PIN Code */}
        <Field data-invalid={!!addressErrors?.postalCode}>
          <FieldLabel htmlFor="addr-pincode">PIN / Postal Code</FieldLabel>
          <div className="relative">
            <Input
              id="addr-pincode"
              placeholder="e.g. 560001"
              maxLength={10}
              aria-invalid={!!addressErrors?.postalCode}
              className="pl-9 font-mono"
              {...register("address.postalCode")}
            />
            <IconNavigation className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          </div>
          <FieldError errors={addressErrors?.postalCode ? [addressErrors.postalCode] : []} />
        </Field>

        {/* Coordinates Section (Optional Lat & Lng) */}
        <div className="sm:col-span-2 rounded-2xl border border-border/70 bg-muted/20 p-5 space-y-4">
          <div className="flex items-center gap-2">
            <IconWorld className="size-4 text-primary" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Geographic Coordinates (Optional)
            </h4>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field data-invalid={!!addressErrors?.latitude}>
              <FieldLabel htmlFor="addr-lat">Latitude</FieldLabel>
              <Input
                id="addr-lat"
                type="number"
                step="any"
                placeholder="e.g. 12.9716"
                className="font-mono text-xs"
                {...register("address.latitude", { valueAsNumber: true })}
              />
            </Field>

            <Field data-invalid={!!addressErrors?.longitude}>
              <FieldLabel htmlFor="addr-lng">Longitude</FieldLabel>
              <Input
                id="addr-lng"
                type="number"
                step="any"
                placeholder="e.g. 77.5946"
                className="font-mono text-xs"
                {...register("address.longitude", { valueAsNumber: true })}
              />
            </Field>
          </div>
          <FieldDescription className="text-[11px]">
            GPS coordinates assist attendees in mapping your events and headquarters on interactive event maps.
          </FieldDescription>
        </div>
      </div>

      {/* Navigation Actions */}
      <div className="flex items-center justify-between border-t border-border/60 pt-6">
        <Button type="button" variant="outline" onClick={onPrev} className="h-11 px-6 text-sm font-semibold">
          Back
        </Button>

        <Button type="button" onClick={onNext} className="h-11 px-8 text-sm font-semibold shadow-xs">
          Proceed to Documents
        </Button>
      </div>
    </div>
  );
}
