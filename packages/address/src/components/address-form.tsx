"use client";

import { useTransition } from "react";
import { Controller, type Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AddressCityRef, AddressCountryRef, AddressDivisionRef } from "@orgatick/contracts";
import { CreateAddressSchema } from "@orgatick/contracts";
import { Button } from "@orgatick/ui/components/button";
import { Field, FieldError, FieldLabel } from "@orgatick/ui/components/field";
import { Input } from "@orgatick/ui/components/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@orgatick/ui/components/select";
import { IconBuilding, IconBuildingSkyscraper, IconHome, IconLoader2, IconMapPin } from "@tabler/icons-react";
import { useAddressHierarchy } from "@orgatick/address/hooks/use-address-hierarchy";
import type { AddressFormProps, AddressFormValues } from "@orgatick/address/types";

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

  const initialCityUuid: string | null =
    (initialValues && "cityUuid" in initialValues && initialValues.cityUuid) ||
    (initialValues && "city" in initialValues && initialValues.city?.uuid) ||
    null;

  const initialLabel: string | null =
    initialValues && "label" in initialValues && typeof initialValues.label === "string" ? initialValues.label : null;

  const initialVenueName: string | null =
    initialValues && "venueName" in initialValues && typeof initialValues.venueName === "string"
      ? initialValues.venueName
      : null;

  const initialIsDefault: boolean =
    initialValues && "isDefault" in initialValues ? Boolean(initialValues.isDefault) : false;

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(CreateAddressSchema) as unknown as Resolver<AddressFormValues>,
    defaultValues: {
      countryUuid: initialCountryUuid,
      divisionUuid: initialDivisionUuid,
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

  const currentCountryUuid = watch("countryUuid");
  const currentDivisionUuid = watch("divisionUuid");

  const {
    countries,
    divisions,
    cities,
    loadingCountries,
    loadingDivisions,
    loadingCities,
    loadDivisionsForCountry,
    loadCitiesForDivision,
    setDivisions,
    setCities,
  } = useAddressHierarchy({
    dataLoader,
    defaultCountryUuid: initialCountryUuid,
    defaultDivisionUuid: initialDivisionUuid,
    defaultCityUuid: initialCityUuid,
  });

  const handleCountryChange = (countryUuid: string | null) => {
    const val = countryUuid || "";
    setValue("countryUuid", val, { shouldValidate: true });
    setValue("divisionUuid", null);
    setValue("cityUuid", null);
    setDivisions([]);
    setCities([]);
    if (val) {
      loadDivisionsForCountry(val);
    }
  };

  const handleDivisionChange = (divisionUuid: string | null) => {
    setValue("divisionUuid", divisionUuid, { shouldValidate: true });
    setValue("cityUuid", null);
    setCities([]);
    if (divisionUuid) {
      loadCitiesForDivision(divisionUuid);
    }
  };

  const handleFormSubmit = async (values: AddressFormValues) => {
    startTransition(async () => {
      await onSubmit(values);
    });
  };

  const disabled = isLoading || isSubmitting || isPending;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={`space-y-4 ${className}`}>
      {/* Variant Context Header Fields */}
      {variant === "event_venue" && (
        <Field>
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
        </Field>
      )}

      {(variant === "user" || variant === "organization") && (
        <Field>
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
        </Field>
      )}

      {/* Cascading Geographic Selects */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Country */}
        <Field data-invalid={!!errors.countryUuid}>
          <FieldLabel htmlFor="country-select">
            Country <span className="text-destructive">*</span>
          </FieldLabel>
          <Controller
            name="countryUuid"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value || ""}
                onValueChange={handleCountryChange}
                disabled={disabled || loadingCountries}
              >
                <SelectTrigger id="country-select" className="w-full">
                  <SelectValue placeholder={loadingCountries ? "Loading countries..." : "Select Country"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {countries.map((c: AddressCountryRef) => (
                      <SelectItem key={c.uuid} value={c.uuid}>
                        {c.name} ({c.code})
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <FieldError errors={[errors.countryUuid]} />
        </Field>

        {/* Division / State */}
        <Field data-invalid={!!errors.divisionUuid}>
          <FieldLabel htmlFor="division-select">State / Province</FieldLabel>
          <Controller
            name="divisionUuid"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value || ""}
                onValueChange={handleDivisionChange}
                disabled={disabled || !currentCountryUuid || loadingDivisions}
              >
                <SelectTrigger id="division-select" className="w-full">
                  <SelectValue
                    placeholder={
                      !currentCountryUuid
                        ? "Select country first"
                        : loadingDivisions
                          ? "Loading states..."
                          : "Select State / Province"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {divisions.map((d: AddressDivisionRef) => (
                      <SelectItem key={d.uuid} value={d.uuid}>
                        {d.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <FieldError errors={[errors.divisionUuid]} />
        </Field>

        {/* City */}
        <Field data-invalid={!!errors.cityUuid}>
          <FieldLabel htmlFor="city-select">City</FieldLabel>
          <Controller
            name="cityUuid"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value || ""}
                onValueChange={(val) => setValue("cityUuid", val, { shouldValidate: true })}
                disabled={disabled || !currentDivisionUuid || loadingCities}
              >
                <SelectTrigger id="city-select" className="w-full">
                  <SelectValue
                    placeholder={
                      !currentDivisionUuid ? "Select state first" : loadingCities ? "Loading cities..." : "Select City"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {cities.map((city: AddressCityRef) => (
                      <SelectItem key={city.uuid} value={city.uuid}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <FieldError errors={[errors.cityUuid]} />
        </Field>
      </div>

      {/* Street Address Line 1 */}
      <Field data-invalid={!!errors.addressLine1}>
        <FieldLabel htmlFor="addressLine1">
          Street Address Line 1 <span className="text-destructive">*</span>
        </FieldLabel>
        <div className="relative">
          <Input
            id="addressLine1"
            placeholder="House/Flat number, building, street address"
            disabled={disabled}
            className="pl-9"
            aria-invalid={!!errors.addressLine1}
            {...register("addressLine1")}
          />
          <IconMapPin className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        </div>
        <FieldError errors={[errors.addressLine1]} />
      </Field>

      {/* Street Address Line 2 */}
      <Field data-invalid={!!errors.addressLine2}>
        <FieldLabel htmlFor="addressLine2">Street Address Line 2</FieldLabel>
        <Input
          id="addressLine2"
          placeholder="Apartment, suite, unit, floor (optional)"
          disabled={disabled}
          {...register("addressLine2")}
        />
        <FieldError errors={[errors.addressLine2]} />
      </Field>

      {/* Landmark & Postal Code */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field data-invalid={!!errors.landmark}>
          <FieldLabel htmlFor="landmark">Landmark / Area</FieldLabel>
          <Input
            id="landmark"
            placeholder="Near city center, metro station, etc."
            disabled={disabled}
            {...register("landmark")}
          />
          <FieldError errors={[errors.landmark]} />
        </Field>

        <Field data-invalid={!!errors.postalCode}>
          <FieldLabel htmlFor="postalCode">Postal / PIN Code</FieldLabel>
          <Input id="postalCode" placeholder="e.g. 560001, 10001" disabled={disabled} {...register("postalCode")} />
          <FieldError errors={[errors.postalCode]} />
        </Field>
      </div>

      {/* Event Venue specific coordinates */}
      {variant === "event_venue" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field data-invalid={!!errors.latitude}>
            <FieldLabel htmlFor="latitude">Latitude (Optional)</FieldLabel>
            <Input
              id="latitude"
              type="number"
              step="any"
              placeholder="e.g. 12.9716"
              disabled={disabled}
              {...register("latitude", {
                valueAsNumber: true,
              })}
            />
            <FieldError errors={[errors.latitude]} />
          </Field>

          <Field data-invalid={!!errors.longitude}>
            <FieldLabel htmlFor="longitude">Longitude (Optional)</FieldLabel>
            <Input
              id="longitude"
              type="number"
              step="any"
              placeholder="e.g. 77.5946"
              disabled={disabled}
              {...register("longitude", {
                valueAsNumber: true,
              })}
            />
            <FieldError errors={[errors.longitude]} />
          </Field>
        </div>
      )}

      {/* User Default Address Toggle */}
      {variant === "user" && (
        <div className="flex items-center gap-2 pt-1">
          <input
            id="isDefault"
            type="checkbox"
            className="size-4 rounded border-input text-primary focus:ring-ring"
            disabled={disabled}
            {...register("isDefault")}
          />
          <label htmlFor="isDefault" className="text-sm font-medium text-foreground cursor-pointer">
            Set as default address
          </label>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={disabled}>
            {cancelLabel}
          </Button>
        )}
        <Button type="submit" disabled={disabled}>
          {disabled && <IconLoader2 className="mr-2 size-4 animate-spin" />}
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
