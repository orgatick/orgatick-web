"use client";

import type { AddressCountryRef } from "@orgatick/contracts";
import type * as React from "react";
import { useCallback, useMemo } from "react";
import { type Control, Controller, type FieldPath, type FieldValues, type RegisterOptions } from "react-hook-form";
import type { AddressDataLoader } from "../types";
import { DebouncedCombobox } from "./common/debounced-combobox";
import { FormFieldWrapper } from "./common/form-field-wrapper";

export function getCountryFlagEmoji(countryCode?: string | null): string {
  if (countryCode?.length !== 2) return "";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export interface CountryComboboxProps {
  id?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, country?: AddressCountryRef) => void;
  onSelectCountry?: (country: AddressCountryRef | null) => void;
  onBlur?: () => void;
  dataLoader?: AddressDataLoader;
  loadCountries?: (search?: string) => Promise<AddressCountryRef[]>;
  initialCountries?: AddressCountryRef[];
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

export function CountryCombobox({
  id,
  value,
  defaultValue,
  onChange,
  onSelectCountry,
  onBlur,
  dataLoader,
  loadCountries,
  initialCountries,
  disabled = false,
  loading = false,
  placeholder = "Select Country",
  searchPlaceholder = "Search country or code...",
  emptyText = "No country found.",
  className,
  triggerClassName,
  debounceMs = 300,
  allowClear = false,
  isInvalid = false,
}: CountryComboboxProps) {
  const fetchCountriesFn = useMemo(() => {
    if (loadCountries) return loadCountries;
    if (dataLoader?.loadCountries) return dataLoader.loadCountries;
    return null;
  }, [loadCountries, dataLoader]);

  const handleSearch = useCallback(
    async (query: string) => {
      if (!fetchCountriesFn) return [];
      return fetchCountriesFn(query);
    },
    [fetchCountriesFn],
  );

  return (
    <DebouncedCombobox<AddressCountryRef>
      id={id}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      onSelectItem={onSelectCountry}
      onBlur={onBlur}
      items={initialCountries}
      loadItems={fetchCountriesFn ? handleSearch : undefined}
      getItemKey={(c) => c.uuid}
      getItemValue={(c) => c.uuid}
      getItemLabel={(c) => c.name}
      placeholder={placeholder}
      searchPlaceholder={searchPlaceholder}
      emptyText={emptyText}
      loadingText="Searching countries..."
      disabled={disabled}
      loading={loading}
      className={className}
      triggerClassName={triggerClassName}
      debounceMs={debounceMs}
      allowClear={allowClear}
      isInvalid={isInvalid}
      renderTriggerValue={(selectedCountry, isLoading) =>
        selectedCountry ? (
          <>
            <span className="text-base leading-none shrink-0">{getCountryFlagEmoji(selectedCountry.code)}</span>
            <span className="truncate font-medium text-foreground">{selectedCountry.name}</span>
            <span className="text-xs text-muted-foreground shrink-0">({selectedCountry.code})</span>
          </>
        ) : (
          <span>{isLoading ? "Loading countries..." : placeholder}</span>
        )
      }
      renderItem={(c) => (
        <div className="flex min-w-0 items-center gap-2.5 truncate">
          <span className="text-base leading-none shrink-0">{getCountryFlagEmoji(c.code)}</span>
          <span className="truncate">{c.name}</span>
          <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground uppercase shrink-0">
            {c.code}
          </span>
        </div>
      )}
    />
  );
}

export interface CountrySelectorBaseProps extends CountryComboboxProps {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: string;
  required?: boolean;
  standalone?: boolean;
}

export function CountrySelectorBase({
  label = "Country",
  description,
  error,
  required = false,
  standalone = false,
  className,
  id,
  ...comboboxProps
}: CountrySelectorBaseProps) {
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
      {(fieldId) => <CountryCombobox id={fieldId} isInvalid={Boolean(error)} {...comboboxProps} />}
    </FormFieldWrapper>
  );
}

export interface CountryFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<CountrySelectorBaseProps, "value" | "onChange" | "onBlur"> {
  name: TName;
  control: Control<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, TName>;
  onChange?: (value: string, country?: AddressCountryRef) => void;
  onBlur?: () => void;
}

export function CountryFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  rules,
  onChange: externalOnChange,
  onBlur: externalOnBlur,
  ...props
}: CountryFormFieldProps<TFieldValues, TName>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <CountrySelectorBase
          {...props}
          id={props.id || name}
          value={field.value ?? ""}
          onChange={(val, country) => {
            field.onChange(val);
            externalOnChange?.(val, country);
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

export type CountrySelectorProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> =
  | ({
      name: TName;
      control: Control<TFieldValues>;
      rules?: RegisterOptions<TFieldValues, TName>;
    } & Omit<CountrySelectorBaseProps, "value" | "onChange" | "onBlur"> & {
        onChange?: (value: string, country?: AddressCountryRef) => void;
        onBlur?: () => void;
      })
  | ({
      name?: never;
      control?: never;
      rules?: never;
    } & CountrySelectorBaseProps);

export function CountrySelector<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: CountrySelectorProps<TFieldValues, TName>) {
  if (props.control && props.name) {
    return <CountryFormField<TFieldValues, TName> {...props} />;
  }
  return <CountrySelectorBase {...(props as CountrySelectorBaseProps)} />;
}

export default CountrySelector;
