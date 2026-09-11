"use client";

import { useTransition } from "react";
import { type Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateAddressSchema } from "@orgatick/contracts";
import { Button } from "@orgatick/ui/components/button";
import { Field, FieldError, FieldLabel } from "@orgatick/ui/components/field";
import { Input } from "@orgatick/ui/components/input";
import { IconBuilding, IconBuildingSkyscraper, IconHome, IconLoader2, IconMapPin } from "@tabler/icons-react";
import { useAddressHierarchy } from "@orgatick/address/hooks/use-address-hierarchy";
import type { AddressFormProps, AddressFormValues } from "@orgatick/address/types";
import { CitySelector } from "./city-selector";
import { StateSelector } from "./state-selector";
import {CountrySelector} from "./country-select";

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

      <CountrySelector />
      
      
      {/* Cascading Geographic Autocomplete Comboboxes */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Country */}
        {/*<CountrySelector
          name="countryUuid"
          control={control}
          dataLoader={dataLoader}
          initialCountries={countries}
          loading={loadingCountries}
          onChange={handleCountryChange}
          disabled={disabled || loadingCountries}
          required
        />*/}

        {/* State / Province (Level 1) */}
        <StateSelector
          name="divisionUuid"
          control={control}
          countryUuid={currentCountryUuid}
          dataLoader={dataLoader}
          initialDivisions={divisions}
          loading={loadingDivisions}
          onChange={handleDivisionChange}
          disabled={disabled || !currentCountryUuid || loadingDivisions}
        />

        {/* City */}
        <CitySelector
          name="cityUuid"
          control={control}
          divisionUuid={currentDivisionUuid}
          countryUuid={currentCountryUuid}
          dataLoader={dataLoader}
          initialCities={cities}
          loading={loadingCities}
          onChange={(cityUuid) => setValue("cityUuid", cityUuid || null, { shouldValidate: true })}
          disabled={disabled || !currentDivisionUuid || loadingCities}
        />
      </div>

      {/* Street Address Line 1 */}
      <Field data-invalid={!!errors.addressLine1}>
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
      <Field data-invalid={!!errors.addressLine2}>
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
        <Field data-invalid={!!errors.landmark}>
          <FieldLabel htmlFor="landmark">Landmark (Optional)</FieldLabel>
          <Input
            id="landmark"
            placeholder="e.g. Near Metro Station, Behind High School"
            disabled={disabled}
            {...register("landmark")}
          />
          <FieldError errors={[errors.landmark]} />
        </Field>

        <Field data-invalid={!!errors.postalCode}>
          <FieldLabel htmlFor="postalCode">Postal Code / PIN</FieldLabel>
          <Input id="postalCode" placeholder="e.g. 110001 or 90210" disabled={disabled} {...register("postalCode")} />
          <FieldError errors={[errors.postalCode]} />
        </Field>
      </div>

      {/* Form Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4">
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
