"use client";

import { useEffect, useState } from "react";
import { Controller, type Path, type FieldValues, type UseFormReturn } from "react-hook-form";
import { IconChevronDown, IconLoader, IconBuildingCommunity, IconX } from "@tabler/icons-react";

import type { CityDetailResponse } from "@orgatick/contracts";

import { Button } from "@orgatick/ui/components/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList } from "@orgatick/ui/components/command";
import { Label } from "@orgatick/ui/components/label";
import { Popover, PopoverContent, PopoverTrigger } from "@orgatick/ui/components/popover";

import api from "../../libs/apis/auth.api";
import { useDebouncedValue } from "../../hooks/use-debounced-value";
import { CommandOption } from "./command-option";

interface CitySelectProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  countryName?: Path<T> | string;
  admin1Name?: Path<T> | string;
  admin2Name?: Path<T> | string;
  latName?: Path<T> | string;
  lngName?: Path<T> | string;
}

const extractCities = (data: unknown): CityDetailResponse[] => {
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
  return Array.isArray(list) ? (list as CityDetailResponse[]) : [];
};

const CitySelect = <T extends FieldValues>({
  form,
  name,
  countryName = "address.countryId" as Path<T>,
  admin1Name = "address.divisionId" as Path<T>,
  admin2Name = "address.divisionId2" as Path<T>,
  latName = "address.latitude" as Path<T>,
  lngName = "address.longitude" as Path<T>,
}: CitySelectProps<T>) => {
  const countryId = form.watch(countryName as Path<T>) as bigint | undefined;
  const admin1Id = form.watch(admin1Name as Path<T>) as bigint | undefined;
  const admin2Id = form.watch(admin2Name as Path<T>) as bigint | undefined;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState<CityDetailResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebouncedValue(query);

  useEffect(() => {
    if (!countryId || !admin1Id || !admin2Id) {
      setCities([]);
      return;
    }

    let isCancelled = false;

    async function searchCities() {
      try {
        setIsLoading(true);
        setError(null);
        const trimmed = debouncedQuery.trim();
        const response = await api.get("/cities", {
          params: { countryId, admin1Id, admin2Id, search: trimmed },
        });
        if (!isCancelled) {
          setCities(extractCities(response.data));
        }
      } catch {
        if (!isCancelled) {
          setCities([]);
          setError("Failed to fetch cities");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    void searchCities();
    return () => {
      isCancelled = true;
    };
  }, [countryId, admin1Id, admin2Id, debouncedQuery]);

  const disabledReason = !countryId
    ? "Select a country first"
    : !admin1Id
      ? "Select a state or province first"
      : !admin2Id
        ? "Select a district first"
        : null;

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => {
        const selectedCity = cities.find((city) => String(city.id) === String(field.value));

        const setCity = (city: CityDetailResponse | null) => {
          field.onChange(city ? city.id : null);
          if (latName) {
            form.setValue(latName as Path<T>, (city ? city.latitude : null) as never, {
              shouldDirty: true,
              shouldValidate: false,
            });
          }
          if (lngName) {
            form.setValue(lngName as Path<T>, (city ? city.longitude : null) as never, {
              shouldDirty: true,
              shouldValidate: false,
            });
          }
          setOpen(false);
        };

        return (
          <div className="w-full">
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor={name}>
                City <span className="text-destructive">*</span>
              </Label>
              <Popover open={open && Boolean(countryId && admin1Id && admin2Id)} onOpenChange={setOpen}>
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
                      disabled={Boolean(disabledReason)}
                    >
                      {disabledReason ? (
                        <span className="truncate text-muted-foreground">{disabledReason}</span>
                      ) : selectedCity ? (
                        <span className="flex min-w-0 items-center gap-2">
                          <span className="flex size-5 shrink-0 items-center justify-center rounded-[3px] bg-muted ring-1 ring-border">
                            <IconBuildingCommunity className="size-3 text-muted-foreground" />
                          </span>
                          <span className="truncate">{selectedCity.name}</span>
                        </span>
                      ) : (
                        <span className="truncate text-muted-foreground">
                          {field.value != null ? "City not found" : "City (optional)"}
                        </span>
                      )}
                      <IconChevronDown data-icon="inline-end" className="size-4 shrink-0 opacity-50" />
                    </Button>
                  }
                />

                <PopoverContent align="start" className="w-(--anchor-width) p-0">
                  <Command shouldFilter={false}>
                    <CommandInput placeholder="Search cities..." value={query} onValueChange={setQuery} />
                    <CommandList>
                      {isLoading && (
                        <div className="flex items-center justify-center gap-2 px-2 py-6 text-sm text-muted-foreground">
                          <IconLoader className="size-4 animate-spin" />
                          Searching cities...
                        </div>
                      )}

                      {!isLoading && error && (
                        <div className="px-2 py-6 text-center text-sm text-destructive">{error}</div>
                      )}

                      {!isLoading && !error && cities.length === 0 && <CommandEmpty>No cities found.</CommandEmpty>}

                      {!isLoading && !error && cities.length > 0 && (
                        <CommandGroup>
                          <CommandOption
                            value="none"
                            icon={
                              <span className="flex size-6 shrink-0 items-center justify-center rounded-[3px] bg-muted ring-1 ring-border">
                                <IconX className="size-3.5 text-muted-foreground" />
                              </span>
                            }
                            title="None"
                            subtitle="Clear city selection"
                            selected={field.value == null}
                            onSelect={() => setCity(null)}
                          />

                          {cities.map((city) => {
                            const isSelected = String(city.id) === String(field.value);
                            return (
                              <CommandOption
                                key={String(city.id)}
                                value={`${city.name}-${city.slug ?? city.id}`}
                                icon={
                                  <span className="flex size-6 shrink-0 items-center justify-center rounded-[3px] bg-muted ring-1 ring-border">
                                    <IconBuildingCommunity className="size-3.5 text-muted-foreground" />
                                  </span>
                                }
                                title={city.name}
                                subtitle={city.admin2?.name ?? city.admin1?.name ?? city.country.name}
                                selected={isSelected}
                                onSelect={() => setCity(city)}
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

export default CitySelect;
