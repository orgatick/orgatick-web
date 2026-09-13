"use client";

import { Button } from "@orgatick/ui/components/button";
import { Field, FieldError, FieldLabel } from "@orgatick/ui/components/field";
import { Popover, PopoverContent, PopoverTrigger } from "@orgatick/ui/components/popover";
import { ScrollArea } from "@orgatick/ui/components/scroll-area";
import { Spinner } from "@orgatick/ui/components/spinner";
import { cn } from "@orgatick/ui/lib/utils";
import { IconCheck, IconSearch, IconSelector, IconX } from "@tabler/icons-react";
import type * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useDebounce } from "../hooks/use-debounce";
import type { AddressFormValues, AddressOption } from "../types";

export function getCountryFlagEmoji(countryCode?: string | null): string {
  if (countryCode?.length !== 2) return "";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export interface AddressSelectProps {
  name: keyof AddressFormValues;
  label: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  required?: boolean;
  loadOptions: (search: string) => Promise<AddressOption[]>;
  initialOption?: AddressOption | null;
  parentValue?: string | null;
  onSelect?: (option: AddressOption | null) => void;
  className?: string;
  debounceMs?: number;
}

export function AddressSelect({
  name,
  label,
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  emptyText = "No results found.",
  disabled = false,
  required = false,
  loadOptions,
  initialOption = null,
  parentValue,
  onSelect,
  className = "",
  debounceMs = 300,
}: AddressSelectProps) {
  const formContext = useFormContext<AddressFormValues>();

  const fieldValue = formContext ? (formContext.watch(name) as string | null | undefined) : undefined;
  const fieldError = formContext?.formState?.errors?.[name]?.message as string | undefined;

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, debounceMs);

  const [options, setOptions] = useState<AddressOption[]>(initialOption ? [initialOption] : []);
  const [selectedOption, setSelectedOption] = useState<AddressOption | null>(initialOption);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync selectedOption with initialOption or if fieldValue matches
  useEffect(() => {
    if (initialOption && (!selectedOption || selectedOption.value !== initialOption.value)) {
      setSelectedOption(initialOption);
    }
  }, [initialOption, selectedOption]);

  // Keep selectedOption in sync if fieldValue gets cleared
  useEffect(() => {
    if (!fieldValue) {
      setSelectedOption(null);
    } else if (selectedOption && selectedOption.value !== fieldValue) {
      const found = options.find((o) => o.value === fieldValue);
      if (found) {
        setSelectedOption(found);
      }
    }
  }, [fieldValue, selectedOption, options]);

  // Reset options and value when parentValue changes (e.g. country changed -> reset division)
  const prevParentRef = useRef(parentValue);
  useEffect(() => {
    if (prevParentRef.current !== undefined && prevParentRef.current !== parentValue) {
      setOptions([]);
      setSelectedOption(null);
      if (formContext && fieldValue) {
        formContext.setValue(name, null as never, { shouldValidate: true, shouldDirty: true });
      }
    }
    prevParentRef.current = parentValue;
  }, [parentValue, formContext, name, fieldValue]);

  const fetchOptions = useCallback(
    async (query: string) => {
      setIsLoading(true);
      try {
        const results = await loadOptions(query);
        setOptions(results ?? []);
      } catch (err) {
        console.error(`Failed to load options for ${name}:`, err);
        setOptions([]);
      } finally {
        setIsLoading(false);
      }
    },
    [loadOptions, name],
  );

  // Fetch when opened and focus search input
  const handleOpenChange = (open: boolean) => {
    if (disabled) return;
    setIsOpen(open);
    if (open) {
      setSearchQuery("");
      fetchOptions("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  // Debounced search when query changes while popover is open
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isOpen) {
      fetchOptions(debouncedQuery);
    }
  }, [debouncedQuery, isOpen, fetchOptions]);

  const handleSelect = (option: AddressOption) => {
    setSelectedOption(option);
    if (formContext) {
      formContext.setValue(name, option.value as never, { shouldValidate: true, shouldDirty: true });
    }
    onSelect?.(option);
    setIsOpen(false);
    setSearchQuery("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedOption(null);
    if (formContext) {
      formContext.setValue(name, null as never, { shouldValidate: true, shouldDirty: true });
    }
    onSelect?.(null);
  };

  const hasValue = Boolean(fieldValue || selectedOption);

  return (
    <Field data-invalid={Boolean(fieldError)} className={className}>
      <FieldLabel htmlFor={name}>
        {label} {required && <span className="text-destructive">*</span>}
      </FieldLabel>

      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger
          render={
            <Button
              id={name}
              type="button"
              variant="outline"
              role="combobox"
              aria-expanded={isOpen}
              disabled={disabled}
              className={cn(
                "h-9 w-full justify-between gap-2 rounded-lg border border-input bg-transparent px-3 text-sm font-normal transition-colors outline-none",
                "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                "disabled:cursor-not-allowed disabled:opacity-50",
                !hasValue && "text-muted-foreground",
                fieldError && "border-destructive ring-destructive/20 ring-3",
              )}
            />
          }
        >
          <span className="flex min-w-0 flex-1 items-center gap-2 truncate text-start">
            {selectedOption ? (
              <>
                {selectedOption.prefix}
                <span className="truncate font-medium text-foreground">{selectedOption.label}</span>
                {selectedOption.subLabel && (
                  <span className="text-xs text-muted-foreground shrink-0">({selectedOption.subLabel})</span>
                )}
              </>
            ) : (
              <span className="truncate">{placeholder}</span>
            )}
          </span>

          <span className="flex items-center gap-1 shrink-0">
            {hasValue && !disabled && !required && (
              <span
                role="button"
                tabIndex={0}
                aria-label="Clear selection"
                onClick={handleClear}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.stopPropagation();
                    handleClear(e as unknown as React.MouseEvent);
                  }
                }}
                className="rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <IconX className="size-3.5" />
              </span>
            )}
            {isLoading ? (
              <Spinner className="size-3.5 text-muted-foreground" />
            ) : (
              <IconSelector className="size-4 opacity-50" />
            )}
          </span>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          sideOffset={4}
          className="w-full min-w-[240px] max-h-56 p-0 gap-0 shadow-md flex flex-col overflow-hidden"
          style={{ maxHeight: "15rem" }}
        >
          {/* Compact Search Header */}
          <div className="flex shrink-0 items-center gap-2 border-b border-border px-2.5 py-1.5 bg-popover">
            <IconSearch className="size-3.5 shrink-0 text-muted-foreground" />
            <input
              ref={inputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
            />
            {isLoading && <Spinner className="size-3.5 text-muted-foreground" />}
          </div>

          {/* Compact Options List with ScrollArea */}
          <ScrollArea className="size-full min-h-0 max-h-44 w-full p-1 overflow-y-auto" style={{ maxHeight: "11rem" }}>
            {isLoading && options.length === 0 ? (
              <div className="flex items-center justify-center gap-2 py-4 text-xs text-muted-foreground">
                <Spinner className="size-3.5" />
                <span>Searching...</span>
              </div>
            ) : options.length === 0 ? (
              <div className="py-4 text-center text-xs text-muted-foreground">{emptyText}</div>
            ) : (
              <div className="flex flex-col gap-0.5">
                {options.map((opt) => {
                  const isSelected = fieldValue === opt.value || selectedOption?.value === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleSelect(opt)}
                      className={cn(
                        "flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-xs text-start transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer",
                        isSelected && "bg-accent/70 font-medium text-accent-foreground",
                      )}
                    >
                      <div className="flex min-w-0 items-center gap-2 truncate">
                        {opt.prefix}
                        <span className="truncate">{opt.label}</span>
                        {opt.subLabel && (
                          <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase text-muted-foreground">
                            {opt.subLabel}
                          </span>
                        )}
                      </div>
                      {isSelected && <IconCheck className="size-3.5 shrink-0 text-primary" />}
                    </button>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </PopoverContent>
      </Popover>

      {fieldError && <FieldError errors={[{ message: fieldError }]} />}
    </Field>
  );
}
