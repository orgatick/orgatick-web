"use client";

import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@orgatick/ui/components/command";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@orgatick/ui/components/input-group";
import { Spinner } from "@orgatick/ui/components/spinner";
import { cn } from "@orgatick/ui/lib/utils";
import { IconMapPin, IconSearch } from "@tabler/icons-react";
import type { BBox } from "geojson";
import type * as React from "react";
import { useEffect, useState } from "react";
import { formatAddress, type PlaceFeature, usePlaceSearch } from "./use-place-search";

export interface PlaceAutocompleteProps
  extends Omit<React.ComponentProps<typeof InputGroupInput>, "onChange" | "value" | "defaultValue"> {
  debounceMs?: number;
  lang?: string;
  limit?: number;
  bbox?: BBox;
  lat?: number;
  lon?: number;
  zoom?: number;
  locationBiasScale?: number;
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onPlaceSelect?: (feature: PlaceFeature) => void;
  onResultsChange?: (features: PlaceFeature[]) => void;
}

export function PlaceAutocomplete({
  debounceMs = 300,
  lang,
  limit = 5,
  bbox,
  lat,
  lon,
  zoom,
  locationBiasScale,
  className,
  value: controlledValue,
  defaultValue = "",
  onChange: controlledOnChange,
  onPlaceSelect,
  onResultsChange,
  ...props
}: PlaceAutocompleteProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [searchQuery, setSearchQuery] = useState("");

  const isControlled = controlledValue !== undefined;
  const displayValue = isControlled ? controlledValue : internalValue;

  const { results, isLoading, error, hasSearched } = usePlaceSearch({
    query: searchQuery,
    debounceMs,
    lang,
    limit,
    bbox,
    lat,
    lon,
    zoom,
    locationBiasScale,
  });

  useEffect(() => {
    onResultsChange?.(results);
  }, [results, onResultsChange]);

  const hasNoResults = hasSearched && !isLoading && !error && results.length === 0;
  const showCommandList = error || hasNoResults || results.length > 0;

  return (
    <Command className={cn("h-fit overflow-visible", className)} shouldFilter={false} loop>
      <div className="relative">
        <InputGroup className={cn("border-input! bg-popover! ring-0!", showCommandList && "rounded-b-none")}>
          <InputGroupAddon>
            <IconSearch />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Search location..."
            value={displayValue}
            onChange={(event) => {
              const newValue = event.target.value;
              if (!isControlled) {
                setInternalValue(newValue);
              }
              setSearchQuery(newValue);
              controlledOnChange?.(newValue);
            }}
            {...props}
          />
          {isLoading && (
            <InputGroupAddon align="inline-end">
              <Spinner />
            </InputGroupAddon>
          )}
        </InputGroup>
        {showCommandList && (
          <CommandList
            data-state={showCommandList ? "open" : "closed"}
            className={cn(
              "bg-popover border-input absolute top-full end-0 start-0 rounded-b-md border border-t-0 shadow-md",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
              "data-[state=open]:slide-in-from-top-2 data-[state=closed]:slide-out-to-top-2",
            )}
          >
            {error && <CommandEmpty>Error: {error.message}</CommandEmpty>}
            {hasNoResults && <CommandEmpty>Can't find {displayValue}.</CommandEmpty>}
            {results.length > 0 && (
              <CommandGroup>
                {results.map((feature) => {
                  const formatted = formatAddress(feature.properties);
                  return (
                    <CommandItem
                      key={feature.properties.osm_id}
                      value={String(feature.properties.osm_id)}
                      onSelect={() => {
                        const addr = formatAddress(feature.properties);

                        if (!isControlled) {
                          setInternalValue(addr);
                        }

                        setSearchQuery("");
                        controlledOnChange?.(addr);
                        onPlaceSelect?.(feature);
                      }}
                    >
                      <IconMapPin />
                      <div className="flex flex-col items-start text-start">
                        <span className="font-medium">
                          {feature.properties.name || feature.properties.street || "Unknown"}
                        </span>
                        <span className="text-muted-foreground text-xs">{formatted}</span>
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )}
          </CommandList>
        )}
      </div>
    </Command>
  );
}
