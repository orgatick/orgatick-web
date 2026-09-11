"use client";

import type { AddressDivisionRef } from "@orgatick/contracts";
import type * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { type Control, Controller, type FieldPath, type FieldValues, type RegisterOptions } from "react-hook-form";
import type { AddressDataLoader, DivisionQueryOptions } from "../types";
import { DebouncedCombobox } from "./common/debounced-combobox";
import { FormFieldWrapper } from "./common/form-field-wrapper";

export interface DivisionComboboxProps {
  id?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, division?: AddressDivisionRef) => void;
  onSelectDivision?: (division: AddressDivisionRef | null) => void;
  onBlur?: () => void;
  countryUuid?: string | null;
  parentDivisionUuid?: string | null;
  level?: number;
  dataLoader?: AddressDataLoader;
  loadDivisions?: (
    countryUuid: string,
    search?: string,
    options?: DivisionQueryOptions,
  ) => Promise<AddressDivisionRef[]>;
  initialDivisions?: AddressDivisionRef[];
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

export function DivisionCombobox({
  id,
  value,
  defaultValue,
  onChange,
  onSelectDivision,
  onBlur,
  countryUuid,
  parentDivisionUuid,
  level = 1,
  dataLoader,
  loadDivisions,
  initialDivisions,
  disabled = false,
  loading = false,
  placeholder: customPlaceholder,
  searchPlaceholder: customSearchPlaceholder,
  emptyText = "No state or division found.",
  className,
  triggerClassName,
  debounceMs = 300,
  allowClear = false,
  isInvalid = false,
}: DivisionComboboxProps) {
  const isLevel2 = level === 2;
  const defaultPlaceholder = isLevel2 ? "Select District" : "Select State / Province";
  const defaultSearchPlaceholder = isLevel2 ? "Search district..." : "Search state / province...";

  const resolvedPlaceholder = !countryUuid
    ? "Select country first"
    : isLevel2 && !parentDivisionUuid
      ? "Select state first"
      : customPlaceholder || defaultPlaceholder;

  const isDisabled = disabled || !countryUuid || (isLevel2 && !parentDivisionUuid);

  const fetchDivisionsFn = useMemo(() => {
    if (loadDivisions) return loadDivisions;
    if (dataLoader?.loadDivisions) return dataLoader.loadDivisions;
    return null;
  }, [loadDivisions, dataLoader]);

  // Track parent changes to reset or reload
  const [items, setItems] = useState<AddressDivisionRef[]>(initialDivisions || []);
  const prevCountryRef = useRef(countryUuid);

  useEffect(() => {
    if (initialDivisions && initialDivisions.length > 0) {
      setItems(initialDivisions);
    }
  }, [initialDivisions]);

  useEffect(() => {
    if (prevCountryRef.current !== countryUuid) {
      prevCountryRef.current = countryUuid;
      if (!initialDivisions?.length) {
        setItems([]);
      }
    }
  }, [countryUuid, initialDivisions]);

  const handleSearch = useCallback(
    async (query: string) => {
      if (!fetchDivisionsFn || !countryUuid) return [];
      return fetchDivisionsFn(countryUuid, query, {
        level,
        parentUuid: parentDivisionUuid || undefined,
      });
    },
    [fetchDivisionsFn, countryUuid, level, parentDivisionUuid],
  );

  return (
    <DebouncedCombobox<AddressDivisionRef>
      id={id}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      onSelectItem={onSelectDivision}
      onBlur={onBlur}
      items={items}
      loadItems={fetchDivisionsFn && countryUuid ? handleSearch : undefined}
      getItemKey={(d) => d.uuid}
      getItemValue={(d) => d.uuid}
      getItemLabel={(d) => d.name}
      placeholder={resolvedPlaceholder}
      searchPlaceholder={customSearchPlaceholder || defaultSearchPlaceholder}
      emptyText={emptyText}
      loadingText={isLevel2 ? "Searching districts..." : "Searching states..."}
      disabled={isDisabled}
      loading={loading}
      className={className}
      triggerClassName={triggerClassName}
      debounceMs={debounceMs}
      allowClear={allowClear}
      isInvalid={isInvalid}
      renderItem={(d) => (
        <div className="flex min-w-0 items-center justify-between gap-2 truncate w-full">
          <span className="truncate">{d.name}</span>
          {d.code && (
            <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground uppercase shrink-0">
              {d.code}
            </span>
          )}
        </div>
      )}
    />
  );
}

export interface DivisionSelectorBaseProps extends DivisionComboboxProps {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: string;
  required?: boolean;
  standalone?: boolean;
}

export function DivisionSelectorBase({
  label,
  description,
  error,
  required = false,
  standalone = false,
  className,
  id,
  level = 1,
  ...comboboxProps
}: DivisionSelectorBaseProps) {
  const defaultLabel = level === 2 ? "District" : "State / Province";
  const resolvedLabel = label !== undefined ? label : defaultLabel;

  return (
    <FormFieldWrapper
      id={id}
      label={resolvedLabel}
      description={description}
      error={error}
      required={required}
      standalone={standalone}
      className={className}
    >
      {(fieldId) => <DivisionCombobox id={fieldId} level={level} isInvalid={Boolean(error)} {...comboboxProps} />}
    </FormFieldWrapper>
  );
}

export interface DivisionFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<DivisionSelectorBaseProps, "value" | "onChange" | "onBlur"> {
  name: TName;
  control: Control<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, TName>;
  onChange?: (value: string, division?: AddressDivisionRef) => void;
  onBlur?: () => void;
}

export function DivisionFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  rules,
  onChange: externalOnChange,
  onBlur: externalOnBlur,
  ...props
}: DivisionFormFieldProps<TFieldValues, TName>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <DivisionSelectorBase
          {...props}
          id={props.id || name}
          value={field.value ?? ""}
          onChange={(val, division) => {
            field.onChange(val);
            externalOnChange?.(val, division);
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

export type DivisionSelectorProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> =
  | ({
      name: TName;
      control: Control<TFieldValues>;
      rules?: RegisterOptions<TFieldValues, TName>;
    } & Omit<DivisionSelectorBaseProps, "value" | "onChange" | "onBlur"> & {
        onChange?: (value: string, division?: AddressDivisionRef) => void;
        onBlur?: () => void;
      })
  | ({
      name?: never;
      control?: never;
      rules?: never;
    } & DivisionSelectorBaseProps);

export function DivisionSelector<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: DivisionSelectorProps<TFieldValues, TName>) {
  if (props.control && props.name) {
    return <DivisionFormField<TFieldValues, TName> {...props} />;
  }
  return <DivisionSelectorBase {...(props as DivisionSelectorBaseProps)} />;
}

// Semantic aliases for state (Level 1) and district (Level 2)
export const StateSelector = DivisionSelector;
export const StateCombobox = DivisionCombobox;

export function DistrictSelector<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: DivisionSelectorProps<TFieldValues, TName>) {
  return <DivisionSelector<TFieldValues, TName> level={2} {...props} />;
}

export default DivisionSelector;
