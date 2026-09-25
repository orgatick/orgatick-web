"use client";

import { useEffect, useState } from "react";
import { Controller, type Path, type FieldValues, type UseFormReturn } from "react-hook-form";
import { IconChevronDown, IconLoader } from "@tabler/icons-react";
import getCountryFlag from "country-flag-icons/unicode";

import type { CountryDetailResponse } from "@orgatick/contracts";

import { Button } from "@orgatick/ui/components/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList } from "@orgatick/ui/components/command";
import { Label } from "@orgatick/ui/components/label";
import { Popover, PopoverContent, PopoverTrigger } from "@orgatick/ui/components/popover";
import { cn } from "@orgatick/ui/lib/utils";

import api from "../../libs/apis/auth.api";
import { useDebouncedValue } from "../../hooks/use-debounced-value";
import { CommandOption } from "./command-option";

interface CountrySelectProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
}

const extractCountries = (data: unknown): CountryDetailResponse[] => {
  const unwrap = (node: unknown): unknown => {
    if (Array.isArray(node)) return node;

    if (node && typeof node === "object") {
      const obj = node as Record<string, unknown>;
      if (Array.isArray(obj.data)) return obj.data;
      if (Array.isArray(obj.items)) return obj.items;
      if (Array.isArray(obj.results)) return obj.results;
      if (obj.data && typeof obj.data === "object") return unwrap(obj.data);
    }

    return [];
  };

  const list = unwrap(data);
  return Array.isArray(list) ? (list as CountryDetailResponse[]) : [];
};

function CountryFlag({ code, className }: { code: string; className?: string }) {
  const flag = code?.length === 2 ? getCountryFlag(code) : null;

  return (
    <span
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-[3px] bg-muted ring-1 ring-border",
        className,
      )}
    >
      {flag ? (
        <span className="text-base leading-none drop-shadow-[0_1px_1px_rgb(0_0_0_/_0.15)]">{flag}</span>
      ) : (
        <span className="text-[0.65rem] font-semibold tracking-wide text-muted-foreground">{code}</span>
      )}
    </span>
  );
}

const CountrySelect = <T extends FieldValues>({ form, name }: CountrySelectProps<T>) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState<CountryDetailResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebouncedValue(query);

  useEffect(() => {
    let isCancelled = false;

    async function searchCountries() {
      try {
        setIsLoading(true);
        setError(null);
        const trimmed = debouncedQuery.trim();
        const response = await api.get("/countries", {
          params: trimmed ? { search: trimmed } : { limit: 50 },
        });
        if (!isCancelled) {
          setCountries(extractCountries(response.data));
        }
      } catch {
        if (!isCancelled) {
          setCountries([]);
          setError("Failed to fetch countries");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    void searchCountries();
    return () => {
      isCancelled = true;
    };
  }, [debouncedQuery]);

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => {
        const selectedCountry = countries.find((country) => String(country.id) === String(field.value));

        return (
          <div className="w-full">
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor={name}>
                Country <span className="text-destructive">*</span>
              </Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger
                  render={
                    <Button
                      id={name}
                      type="button"
                      variant="outline"
                      role="combobox"
                      aria-required="true"
                      aria-expanded={open}
                      aria-invalid={fieldState.invalid}
                      className="w-full justify-between font-normal"
                    >
                      {selectedCountry ? (
                        <span className="flex min-w-0 items-center gap-2">
                          <CountryFlag code={selectedCountry.code} className="size-5" />
                          <span className="truncate">{selectedCountry.name}</span>
                        </span>
                      ) : (
                        <span className="truncate text-muted-foreground">
                          {field.value != null ? "Country not found" : "Select country..."}
                        </span>
                      )}
                      <IconChevronDown data-icon="inline-end" className="size-4 shrink-0 opacity-50" />
                    </Button>
                  }
                />

                <PopoverContent align="start" className="w-(--anchor-width) p-0">
                  <Command shouldFilter={false}>
                    <CommandInput placeholder="Search country..." value={query} onValueChange={setQuery} />
                    <CommandList>
                      {isLoading && (
                        <div className="flex items-center justify-center gap-2 px-2 py-6 text-sm text-muted-foreground">
                          <IconLoader className="size-4 animate-spin" />
                          Searching countries...
                        </div>
                      )}

                      {!isLoading && error && (
                        <div className="px-2 py-6 text-center text-sm text-destructive">{error}</div>
                      )}

                      {!isLoading && !error && countries.length === 0 && (
                        <CommandEmpty>No countries found.</CommandEmpty>
                      )}

                      {!isLoading && !error && countries.length > 0 && (
                        <CommandGroup>
                          {countries.map((country) => {
                            const isSelected = String(country.id) === String(field.value);
                            return (
                              <CommandOption
                                key={String(country.id)}
                                value={`${country.code3}-${country.name}`}
                                icon={<CountryFlag code={country.code} className="size-6" />}
                                title={country.name}
                                subtitle={country.code}
                                selected={isSelected}
                                onSelect={() => {
                                  field.onChange(BigInt(country.id));
                                  setOpen(false);
                                }}
                              />
                            );
                          })}
                        </CommandGroup>
                      )}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {fieldState.error && <p className="mt-1 text-sm text-destructive">{fieldState.error.message}</p>}
          </div>
        );
      }}
    />
  );
};

export default CountrySelect;
