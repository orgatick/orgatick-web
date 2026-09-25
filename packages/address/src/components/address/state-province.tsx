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

interface StateOrProvinceSelectProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  countryName?: Path<T> | string;
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

const StateOrProvinceSelect = <T extends FieldValues>({
  form,
  name,
  countryName = "address.countryId" as Path<T>,
}: StateOrProvinceSelectProps<T>) => {
  const countryId = form.watch(countryName as Path<T>) as bigint | undefined;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [divisions, setDivisions] = useState<AdministrativeDivisionResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebouncedValue(query);

  useEffect(() => {
    if (!countryId) {
      setDivisions([]);
      return;
    }

    let isCancelled = false;

    async function searchDivisions() {
      try {
        setIsLoading(true);
        setError(null);
        const trimmed = debouncedQuery.trim();
        const response = await api.get("/administrative-divisions", {
          params: { level: 1, countryId, search: trimmed },
        });
        if (!isCancelled) {
          setDivisions(extractDivisions(response.data));
        }
      } catch {
        if (!isCancelled) {
          setDivisions([]);
          setError("Failed to fetch divisions");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    void searchDivisions();
    return () => {
      isCancelled = true;
    };
  }, [countryId, debouncedQuery]);

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => {
        const selectedDivision = divisions.find((division) => String(division.id) === String(field.value));

        return (
          <div className="w-full">
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor={name}>
                State or Province <span className="text-destructive">*</span>
              </Label>
              <Popover open={open && Boolean(countryId)} onOpenChange={setOpen}>
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
                      disabled={!countryId}
                    >
                      {!countryId ? (
                        <span className="truncate text-muted-foreground">Select a country first</span>
                      ) : selectedDivision ? (
                        <span className="flex min-w-0 items-center gap-2">
                          <span className="flex size-5 shrink-0 items-center justify-center rounded-[3px] bg-muted ring-1 ring-border">
                            <IconMapPin className="size-3 text-muted-foreground" />
                          </span>
                          <span className="truncate">{selectedDivision.name}</span>
                        </span>
                      ) : (
                        <span className="truncate text-muted-foreground">
                          {field.value != null ? "Division not found" : "State or Province"}
                        </span>
                      )}
                      <IconChevronDown data-icon="inline-end" className="size-4 shrink-0 opacity-50" />
                    </Button>
                  }
                />

                <PopoverContent align="start" className="w-(--anchor-width) p-0">
                  <Command shouldFilter={false}>
                    <CommandInput placeholder="Search states..." value={query} onValueChange={setQuery} />
                    <CommandList>
                      {isLoading && (
                        <div className="flex items-center justify-center gap-2 px-2 py-6 text-sm text-muted-foreground">
                          <IconLoader className="size-4 animate-spin" />
                          Searching states...
                        </div>
                      )}

                      {!isLoading && error && (
                        <div className="px-2 py-6 text-center text-sm text-destructive">{error}</div>
                      )}

                      {!isLoading && !error && divisions.length === 0 && (
                        <CommandEmpty>No states or provinces found.</CommandEmpty>
                      )}

                      {!isLoading && !error && divisions.length > 0 && (
                        <CommandGroup>
                          {divisions.map((division) => {
                            const isSelected = String(division.id) === String(field.value);
                            return (
                              <CommandOption
                                key={String(division.id)}
                                value={`${division.code}-${division.name}`}
                                icon={<IconMapPin className="size-6" />}
                                title={division.name}
                                subtitle={division.parent?.name ?? `Level ${division.level}`}
                                selected={isSelected}
                                onSelect={() => {
                                  field.onChange(division.id);
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

export default StateOrProvinceSelect;
