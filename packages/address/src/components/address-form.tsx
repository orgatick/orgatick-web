"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CreateAddressSchema } from "@orgatick/contracts";
import { Button } from "@orgatick/ui/components/button";
import { Field, FieldError, FieldLabel } from "@orgatick/ui/components/field";
import { Input } from "@orgatick/ui/components/input";
import { Spinner } from "@orgatick/ui/components/spinner";
import { cn } from "@orgatick/ui/lib/utils";
import { IconBuilding, IconBuildingSkyscraper, IconHome, IconMapPin } from "@tabler/icons-react";
import { useTransition } from "react";
import { FormProvider, type Resolver, useForm } from "react-hook-form";
import type { AddressFormProps, AddressFormValues, AddressOption } from "../types";
import { AddressSelect, getCountryFlagEmoji } from "./address-select";

export function AddressForm({
  variant = "generic",
  initialValues,
  dataLoader,
  onSubmit,
  onCancel,
  isLoading = false,
  submitLabel = "Save Address",
  cancelLabel = "Cancel",
  className = "",
}: AddressFormProps) {
  const [isPending, startTransition] = useTransition();

  const initialCountryUuid: string =
    (initialValues && "countryUuid" in initialValues && initialValues.countryUuid) ||
    (initialValues && "country" in initialValues && initialValues.country?.uuid) ||
    "";

  const initialDivisionUuid: string | null =
    (initialValues && "divisionUuid" in initialValues && initialValues.divisionUuid) ||
    (initialValues && "division" in initialValues && initialValues.division?.uuid) ||
    null;

  const initialDivisionUuid2: string | null =
    (initialValues && "divisionUuid2" in initialValues && initialValues.divisionUuid2) || null;

  const initialCityUuid: string | null =
    (initialValues && "cityUuid" in initialValues && initialValues.cityUuid) ||
    (initialValues && "city" in initialValues && initialValues.city?.uuid) ||
    null;

  const initialLabel: string =
    (initialValues && "label" in initialValues && typeof initialValues.label === "string" && initialValues.label) || "";

  const initialVenueName: string =
    (initialValues &&
      "venueName" in initialValues &&
      typeof initialValues.venueName === "string" &&
      initialValues.venueName) ||
    "";

  const initialIsDefault: boolean =
    initialValues && "isDefault" in initialValues ? Boolean(initialValues.isDefault) : false;

  const initialCountryOption: AddressOption | null =
    initialValues && "country" in initialValues && initialValues.country
      ? {
          value: initialValues.country.uuid,
          label: initialValues.country.name,
          subLabel: initialValues.country.code,
          prefix: (
            <span className="text-base leading-none shrink-0">{getCountryFlagEmoji(initialValues.country.code)}</span>
          ),
        }
      : null;

  const initialDivisionOption: AddressOption | null =
    initialValues && "division" in initialValues && initialValues.division
      ? {
          value: initialValues.division.uuid,
          label: initialValues.division.name,
          subLabel: initialValues.division.code,
        }
      : null;

  const initialCityOption: AddressOption | null =
    initialValues && "city" in initialValues && initialValues.city
      ? {
          value: initialValues.city.uuid,
          label: initialValues.city.name,
        }
      : null;

  const methods = useForm<AddressFormValues>({
    resolver: zodResolver(CreateAddressSchema) as unknown as Resolver<AddressFormValues>,
    defaultValues: {
      countryUuid: initialCountryUuid,
      divisionUuid: initialDivisionUuid,
      divisionUuid2: initialDivisionUuid2,
      cityUuid: initialCityUuid,
      addressLine1: initialValues?.addressLine1 || "",
      addressLine2: initialValues?.addressLine2 || null,
      landmark: initialValues?.landmark || null,
      postalCode: initialValues?.postalCode || null,
      latitude: initialValues?.latitude ?? null,
      longitude: initialValues?.longitude ?? null,
      formattedAddress: initialValues?.formattedAddress || null,
      label: initialLabel,
      venueName: initialVenueName,
      isDefault: initialIsDefault,
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = methods;

  const currentCountryUuid = watch("countryUuid");
  const currentDivisionUuid = watch("divisionUuid");

  const handleFormSubmit = async (values: AddressFormValues) => {
    startTransition(async () => {
      await onSubmit(values);
    });
  };

  const disabled = isLoading || isSubmitting || isPending;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={cn("space-y-4", className)}>
        {/* Context Fields based on Variant */}
        {variant === "event_venue" && (
          <Field data-invalid={Boolean(errors.venueName)}>
            <FieldLabel htmlFor="venueName">Venue Name</FieldLabel>
            <div className="relative">
              <Input
                id="venueName"
                placeholder="e.g. Royal Palace Banquet Hall"
                disabled={disabled}
                className="pl-9"
                {...register("venueName")}
              />
              <IconBuildingSkyscraper className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            </div>
            <FieldError errors={[errors.venueName]} />
          </Field>
        )}

        {(variant === "user" || variant === "organization") && (
          <Field data-invalid={Boolean(errors.label)}>
            <FieldLabel htmlFor="label">{variant === "user" ? "Address Label" : "Branch / Office Name"}</FieldLabel>
            <div className="relative">
              <Input
                id="label"
                placeholder={variant === "user" ? "e.g. Home, Work, Parents" : "e.g. Main Office, Warehouse"}
                disabled={disabled}
                className="pl-9"
                {...register("label")}
              />
              {variant === "user" ? (
                <IconHome className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              ) : (
                <IconBuilding className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              )}
            </div>
            <FieldError errors={[errors.label]} />
          </Field>
        )}

        {/* Geographic Hierarchy Selectors (Reusing single debounced AddressSelect) */}
        <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4")}>
          {/* Country */}
          <AddressSelect
            name="countryUuid"
            label="Country"
            placeholder="Select Country"
            searchPlaceholder="Search country or code..."
            emptyText="No country found."
            required
            disabled={disabled}
            initialOption={initialCountryOption}
            loadOptions={async (search) => {
              const list = await dataLoader.loadCountries(search);
              return (list ?? []).map((c) => ({
                value: c.uuid,
                label: c.name,
                subLabel: c.code,
                prefix: <span className="text-base leading-none shrink-0">{getCountryFlagEmoji(c.code)}</span>,
              }));
            }}
            onSelect={() => {
              setValue("divisionUuid", null, { shouldDirty: true });
              setValue("divisionUuid2", null, { shouldDirty: true });
              setValue("cityUuid", null, { shouldDirty: true });
            }}
          />

          {/* Division (State / Province - Level 1) */}
          <AddressSelect
            name="divisionUuid"
            label="State / Province"
            placeholder={!currentCountryUuid ? "Select country first" : "Select State / Province"}
            searchPlaceholder="Search state or province..."
            emptyText="No state found."
            disabled={disabled || !currentCountryUuid}
            parentValue={currentCountryUuid}
            initialOption={initialDivisionOption}
            loadOptions={async (search) => {
              if (!currentCountryUuid) return [];
              const list = await dataLoader.loadDivisions(currentCountryUuid, search, { level: 1 });
              return (list ?? []).map((d) => ({
                value: d.uuid,
                label: d.name,
                subLabel: d.code,
              }));
            }}
            onSelect={() => {
              setValue("divisionUuid2", null, { shouldDirty: true });
              setValue("cityUuid", null, { shouldDirty: true });
            }}
          />

          {/* Optional District / Division 2 (Level 2) */}

          <AddressSelect
            name="divisionUuid2"
            label="District"
            placeholder={!currentDivisionUuid ? "Select state first" : "Select District"}
            searchPlaceholder="Search district..."
            emptyText="No district found."
            disabled={disabled || !currentDivisionUuid}
            parentValue={currentDivisionUuid}
            loadOptions={async (search) => {
              if (!currentCountryUuid) return [];
              const list = await dataLoader.loadDivisions(currentCountryUuid, search, {
                level: 2,
                parentUuid: currentDivisionUuid || undefined,
              });
              return (list ?? []).map((d) => ({
                value: d.uuid,
                label: d.name,
                subLabel: d.code,
              }));
            }}
            onSelect={() => {
              setValue("cityUuid", null, { shouldDirty: true });
            }}
          />

          {/* City */}
          <AddressSelect
            name="cityUuid"
            label="City"
            placeholder={!currentDivisionUuid ? "Select state first" : "Select City"}
            searchPlaceholder="Search city..."
            emptyText="No city found."
            disabled={disabled || !currentDivisionUuid}
            parentValue={currentDivisionUuid}
            initialOption={initialCityOption}
            loadOptions={async (search) => {
              if (!currentDivisionUuid && !currentCountryUuid) return [];
              const list = await dataLoader.loadCities(
                currentDivisionUuid || undefined,
                search,
                currentCountryUuid || undefined,
              );
              return (list ?? []).map((c) => ({
                value: c.uuid,
                label: c.name,
                subLabel: c.slug || undefined,
              }));
            }}
          />
        </div>

        {/* Street Address Line 1 */}
        <Field data-invalid={Boolean(errors.addressLine1)}>
          <FieldLabel htmlFor="addressLine1">
            Street Address Line 1 <span className="text-destructive">*</span>
          </FieldLabel>
          <div className="relative">
            <Input
              id="addressLine1"
              placeholder="House / Flat No., Building Name, Street Name"
              disabled={disabled}
              className="pl-9"
              {...register("addressLine1")}
            />
            <IconMapPin className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          </div>
          <FieldError errors={[errors.addressLine1]} />
        </Field>

        {/* Street Address Line 2 */}
        <Field data-invalid={Boolean(errors.addressLine2)}>
          <FieldLabel htmlFor="addressLine2">Street Address Line 2 (Optional)</FieldLabel>
          <Input
            id="addressLine2"
            placeholder="Apartment, Suite, Unit, Area"
            disabled={disabled}
            {...register("addressLine2")}
          />
          <FieldError errors={[errors.addressLine2]} />
        </Field>

        {/* Landmark & Postal Code */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field data-invalid={Boolean(errors.landmark)}>
            <FieldLabel htmlFor="landmark">Landmark (Optional)</FieldLabel>
            <Input
              id="landmark"
              placeholder="e.g. Near Metro Station, Behind High School"
              disabled={disabled}
              {...register("landmark")}
            />
            <FieldError errors={[errors.landmark]} />
          </Field>

          <Field data-invalid={Boolean(errors.postalCode)}>
            <FieldLabel htmlFor="postalCode">Postal Code / PIN</FieldLabel>
            <Input id="postalCode" placeholder="e.g. 110001 or 90210" disabled={disabled} {...register("postalCode")} />
            <FieldError errors={[errors.postalCode]} />
          </Field>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel} disabled={disabled}>
              {cancelLabel}
            </Button>
          )}
          <Button type="submit" disabled={disabled}>
            {disabled && <Spinner className="mr-2 size-4" />}
            {submitLabel}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
