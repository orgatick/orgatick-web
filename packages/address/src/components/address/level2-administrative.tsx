"use client";

import { useEffect, useState } from "react";
import { Controller, type Path, type FieldValues, type UseFormReturn } from "react-hook-form";
import { IconChevronDown, IconLoader, IconMapPin } from "@tabler/icons-react";

import type { AdministrativeDivisionResponse } from "@orgatick/contracts";

import { Button } from "@orgatick/ui/components/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList } from "@orgatick/ui/components/command";
import { Label } from "@orgatick/ui/components/label";
import { Popover, PopoverContent, PopoverTrigger } from "@orgatick/ui/components/popover";

import api from "../../libs/apis/auth.api";
import { useDebouncedValue } from "../../hooks/use-debounced-value";
import { CommandOption } from "./command-option";

interface Level2AdministrativeSelectProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  countryName?: Path<T> | string;
  parentName?: Path<T> | string;
}

const extractDivisions = (data: unknown): AdministrativeDivisionResponse[] => {
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
  return Array.isArray(list) ? (list as AdministrativeDivisionResponse[]) : [];
};

const Level2AdministrativeSelect = <T extends FieldValues>({
  form,
  name,
  countryName = "address.countryId" as Path<T>,
  parentName = "address.divisionId" as Path<T>,
}: Level2AdministrativeSelectProps<T>) => {
  const countryId = form.watch(countryName as Path<T>) as bigint | undefined;
  const parentId = form.watch(parentName as Path<T>) as bigint | undefined;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [districts, setDistricts] = useState<AdministrativeDivisionResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebouncedValue(query);

  useEffect(() => {
    if (!countryId || !parentId) {
      setDistricts([]);
      return;
    }

    let isCancelled = false;

    async function searchDistricts() {
      try {
        setIsLoading(true);
        setError(null);
        const trimmed = debouncedQuery.trim();
        const response = await api.get("/administrative-divisions", {
          params: { level: 2, countryId, parentId, search: trimmed },
        });
        if (!isCancelled) {
          setDistricts(extractDivisions(response.data));
        }
      } catch {
        if (!isCancelled) {
          setDistricts([]);
          setError("Failed to fetch districts");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    void searchDistricts();
    return () => {
      isCancelled = true;
    };
  }, [countryId, parentId, debouncedQuery]);

  const disabledReason = !countryId ? "Select a country first" : !parentId ? "Select a state or province first" : null;

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => {
        const selectedDistrict = districts.find((district) => String(district.id) === String(field.value));

        return (
          <div className="w-full">
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor={name}>
                District <span className="text-destructive">*</span>
              </Label>
              <Popover open={open && Boolean(countryId && parentId)} onOpenChange={setOpen}>
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
                      ) : selectedDistrict ? (
                        <span className="flex min-w-0 items-center gap-2">
                          <span className="flex size-5 shrink-0 items-center justify-center rounded-[3px] bg-muted ring-1 ring-border">
                            <IconMapPin className="size-3 text-muted-foreground" />
                          </span>
                          <span className="truncate">{selectedDistrict.name}</span>
                        </span>
                      ) : (
                        <span className="truncate text-muted-foreground">
                          {field.value != null ? "District not found" : "District"}
                        </span>
                      )}
                      <IconChevronDown data-icon="inline-end" className="size-4 shrink-0 opacity-50" />
                    </Button>
                  }
                />

                <PopoverContent align="start" className="w-(--anchor-width) p-0">
                  <Command shouldFilter={false}>
                    <CommandInput placeholder="Search districts..." value={query} onValueChange={setQuery} />
                    <CommandList>
                      {isLoading && (
                        <div className="flex items-center justify-center gap-2 px-2 py-6 text-sm text-muted-foreground">
                          <IconLoader className="size-4 animate-spin" />
                          Searching districts...
                        </div>
                      )}

                      {!isLoading && error && (
                        <div className="px-2 py-6 text-center text-sm text-destructive">{error}</div>
                      )}

                      {!isLoading && !error && districts.length === 0 && (
                        <CommandEmpty>No districts found.</CommandEmpty>
                      )}

                      {!isLoading && !error && districts.length > 0 && (
                        <CommandGroup>
                          {districts.map((district) => {
                            const isSelected = String(district.id) === String(field.value);
                            return (
                              <CommandOption
                                key={String(district.id)}
                                value={`${district.code}-${district.name}`}
                                icon={<IconMapPin className="size-5" />}
                                title={district.name}
                                subtitle={district.parent?.name ?? `Level ${district.level}`}
                                selected={isSelected}
                                onSelect={() => {
                                  field.onChange(district.id);
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

export default Level2AdministrativeSelect;
