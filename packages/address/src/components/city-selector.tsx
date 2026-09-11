"use client";

import type { AddressCityRef } from "@orgatick/contracts";
import type * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { type Control, Controller, type FieldPath, type FieldValues, type RegisterOptions } from "react-hook-form";
import type { AddressDataLoader, CityQueryOptions } from "../types";
import { DebouncedCombobox } from "./common/debounced-combobox";
import { FormFieldWrapper } from "./common/form-field-wrapper";

export interface CityComboboxProps {
  id?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, city?: AddressCityRef) => void;
  onSelectCity?: (city: AddressCityRef | null) => void;
  onBlur?: () => void;
  divisionUuid?: string | null;
  countryUuid?: string | null;
  requireDivision?: boolean;
  dataLoader?: AddressDataLoader;
  loadCities?: (
    divisionUuid?: string,
    search?: string,
    countryUuidOrOptions?: string | CityQueryOptions,
  ) => Promise<AddressCityRef[]>;
  initialCities?: AddressCityRef[];
  disabled?: boolean;
  loading?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
  triggerClassName?: string;
  debounceMs?: number;
  allowClear?: boolean;
  isInvalid?: boolean;
}

export function CityCombobox({
  id,
  value,
  defaultValue,
  onChange,
  onSelectCity,
  onBlur,
  divisionUuid,
  countryUuid,
  requireDivision = true,
  dataLoader,
  loadCities,
  initialCities,
  disabled = false,
  loading = false,
  placeholder = "Select City",
  searchPlaceholder = "Search city...",
  emptyText = "No city found.",
  className,
  triggerClassName,
  debounceMs = 300,
  allowClear = false,
  isInvalid = false,
}: CityComboboxProps) {
  const isParentMissing = requireDivision ? !divisionUuid : !countryUuid && !divisionUuid;
  const resolvedPlaceholder = isParentMissing
    ? requireDivision
      ? "Select state first"
      : "Select country or state first"
    : placeholder;

  const isDisabled = disabled || isParentMissing;

  const fetchCitiesFn = useMemo(() => {
    if (loadCities) return loadCities;
    if (dataLoader?.loadCities) return dataLoader.loadCities;
    return null;
  }, [loadCities, dataLoader]);

  // Track division changes to reset or reload
  const [items, setItems] = useState<AddressCityRef[]>(initialCities || []);
  const prevDivisionRef = useRef(divisionUuid);

  useEffect(() => {
    if (initialCities && initialCities.length > 0) {
      setItems(initialCities);
    }
  }, [initialCities]);

  useEffect(() => {
    if (prevDivisionRef.current !== divisionUuid) {
      prevDivisionRef.current = divisionUuid;
      if (!initialCities?.length) {
        setItems([]);
      }
    }
  }, [divisionUuid, initialCities]);

  const handleSearch = useCallback(
    async (query: string) => {
      if (!fetchCitiesFn) return [];
      return fetchCitiesFn(divisionUuid || undefined, query, countryUuid || undefined);
    },
    [fetchCitiesFn, divisionUuid, countryUuid],
  );

  return (
    <DebouncedCombobox<AddressCityRef>
      id={id}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      onSelectItem={onSelectCity}
      onBlur={onBlur}
      items={items}
      loadItems={fetchCitiesFn && !isParentMissing ? handleSearch : undefined}
      getItemKey={(c) => c.uuid}
      getItemValue={(c) => c.uuid}
      getItemLabel={(c) => c.name}
      placeholder={resolvedPlaceholder}
      searchPlaceholder={searchPlaceholder}
      emptyText={emptyText}
      loadingText="Searching cities..."
      disabled={isDisabled}
      loading={loading}
      className={className}
      triggerClassName={triggerClassName}
      debounceMs={debounceMs}
      allowClear={allowClear}
      isInvalid={isInvalid}
      renderItem={(c) => (
        <div className="flex min-w-0 items-center justify-between gap-2 truncate w-full">
          <span className="truncate">{c.name}</span>
          {c.slug && (
            <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground lowercase shrink-0">
              {c.slug}
            </span>
          )}
        </div>
      )}
    />
  );
}

export interface CitySelectorBaseProps extends CityComboboxProps {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: string;
  required?: boolean;
  standalone?: boolean;
}

export function CitySelectorBase({
  label = "City",
  description,
  error,
  required = false,
  standalone = false,
  className,
  id,
  ...comboboxProps
}: CitySelectorBaseProps) {
  return (
    <FormFieldWrapper
      id={id}
      label={label}
      description={description}
      error={error}
      required={required}
      standalone={standalone}
      className={className}
    >
      {(fieldId) => <CityCombobox id={fieldId} isInvalid={Boolean(error)} {...comboboxProps} />}
    </FormFieldWrapper>
  );
}

export interface CityFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<CitySelectorBaseProps, "value" | "onChange" | "onBlur"> {
  name: TName;
  control: Control<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, TName>;
  onChange?: (value: string, city?: AddressCityRef) => void;
  onBlur?: () => void;
}

export function CityFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  rules,
  onChange: externalOnChange,
  onBlur: externalOnBlur,
  ...props
}: CityFormFieldProps<TFieldValues, TName>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <CitySelectorBase
          {...props}
          id={props.id || name}
          value={field.value ?? ""}
          onChange={(val, city) => {
            field.onChange(val);
            externalOnChange?.(val, city);
          }}
          onBlur={() => {
            field.onBlur();
            externalOnBlur?.();
          }}
          error={props.error || fieldState.error?.message}
        />
      )}
    />
  );
}

export type CitySelectorProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> =
  | ({
      name: TName;
      control: Control<TFieldValues>;
      rules?: RegisterOptions<TFieldValues, TName>;
    } & Omit<CitySelectorBaseProps, "value" | "onChange" | "onBlur"> & {
        onChange?: (value: string, city?: AddressCityRef) => void;
        onBlur?: () => void;
      })
  | ({
      name?: never;
      control?: never;
      rules?: never;
    } & CitySelectorBaseProps);

export function CitySelector<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: CitySelectorProps<TFieldValues, TName>) {
  if (props.control && props.name) {
    return <CityFormField<TFieldValues, TName> {...props} />;
  }
  return <CitySelectorBase {...(props as CitySelectorBaseProps)} />;
}

export default CitySelector;
