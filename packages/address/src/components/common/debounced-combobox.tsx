"use client";

import { Button } from "@orgatick/ui/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@orgatick/ui/components/command";
import { Popover, PopoverContent, PopoverTrigger } from "@orgatick/ui/components/popover";
import { Spinner } from "@orgatick/ui/components/spinner";
import { cn } from "@orgatick/ui/lib/utils";
import { IconCheck, IconSelector, IconX } from "@tabler/icons-react";
import type * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDebounce } from "../../hooks/use-debounce";

export interface DebouncedComboboxProps<TItem> {
  id?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, item?: TItem) => void;
  onSelectItem?: (item: TItem | null) => void;
  onBlur?: () => void;
  items?: TItem[];
  loadItems?: (search: string) => Promise<TItem[]>;
  getItemKey: (item: TItem) => string;
  getItemValue: (item: TItem) => string;
  getItemLabel: (item: TItem) => string;
  renderItem?: (item: TItem, isSelected: boolean) => React.ReactNode;
  renderTriggerValue?: (selectedItem: TItem | null, isLoading: boolean) => React.ReactNode;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  loadingText?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  triggerClassName?: string;
  debounceMs?: number;
  allowClear?: boolean;
  isInvalid?: boolean;
}

export function DebouncedCombobox<TItem>({
  id,
  value: controlledValue,
  defaultValue = "",
  onChange,
  onSelectItem,
  onBlur,
  items: initialItems,
  loadItems,
  getItemKey,
  getItemValue,
  getItemLabel,
  renderItem,
  renderTriggerValue,
  placeholder = "Select option...",
  searchPlaceholder = "Search...",
  emptyText = "No results found.",
  loadingText = "Loading...",
  disabled = false,
  loading = false,
  className,
  triggerClassName,
  debounceMs = 300,
  allowClear = false,
  isInvalid = false,
}: DebouncedComboboxProps<TItem>) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, debounceMs);

  const [itemsList, setItemsList] = useState<TItem[]>(initialItems || []);
  const [isSearching, setIsSearching] = useState(false);
  const [cachedSelectedItem, setCachedSelectedItem] = useState<TItem | null>(null);

  const hasRemoteLoader = Boolean(loadItems);

  // Sync initial items when provided externally
  useEffect(() => {
    if (initialItems && initialItems.length > 0) {
      setItemsList((prev) => (prev.length === 0 ? initialItems : prev));
    }
  }, [initialItems]);

  const fetchItems = useCallback(
    async (query: string) => {
      if (!loadItems) return;
      setIsSearching(true);
      try {
        const results = await loadItems(query);
        setItemsList(results);
      } catch (err) {
        console.error("Failed to load combobox items:", err);
      } finally {
        setIsSearching(false);
      }
    },
    [loadItems],
  );

  // Load initial items if remote loader is present
  const hasLoadedInitial = useRef(false);
  useEffect(() => {
    if (hasRemoteLoader && !hasLoadedInitial.current) {
      hasLoadedInitial.current = true;
      fetchItems("");
    }
  }, [hasRemoteLoader, fetchItems]);

  // Debounced search query change
  const isInitialDebounce = useRef(true);
  useEffect(() => {
    if (isInitialDebounce.current) {
      isInitialDebounce.current = false;
      return;
    }
    if (hasRemoteLoader) {
      fetchItems(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery, hasRemoteLoader, fetchItems]);

  // Find selected item from list, initialItems, or cached item
  const selectedItem = useMemo(() => {
    if (!currentValue) return null;
    const found =
      itemsList.find((item) => getItemValue(item) === currentValue) ||
      initialItems?.find((item) => getItemValue(item) === currentValue);
    return found || cachedSelectedItem;
  }, [currentValue, itemsList, initialItems, cachedSelectedItem, getItemValue]);

  useEffect(() => {
    if (selectedItem && selectedItem !== cachedSelectedItem) {
      setCachedSelectedItem(selectedItem);
    }
  }, [selectedItem, cachedSelectedItem]);

  // Local filtering if no remote loader
  const filteredItems = useMemo(() => {
    if (hasRemoteLoader) return itemsList;
    if (!searchQuery.trim()) return itemsList;
    const q = searchQuery.toLowerCase().trim();
    return itemsList.filter((item) => getItemLabel(item).toLowerCase().includes(q));
  }, [hasRemoteLoader, itemsList, searchQuery, getItemLabel]);

  const handleSelect = (item: TItem | null) => {
    const nextValue = item ? getItemValue(item) : "";
    if (!isControlled) {
      setInternalValue(nextValue);
    }
    setCachedSelectedItem(item);
    onChange?.(nextValue, item ?? undefined);
    onSelectItem?.(item);
    setIsOpen(false);
    setSearchQuery("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleSelect(null);
  };

  const isLoading = loading || isSearching;

  return (
    <Popover
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          onBlur?.();
          setSearchQuery("");
        }
      }}
    >
      <PopoverTrigger
        render={
          <Button
            id={id}
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            aria-invalid={isInvalid}
            disabled={disabled || isLoading}
            className={cn(
              "h-8 w-full justify-between gap-2 rounded-lg border border-input bg-transparent px-2.5 text-sm font-normal transition-colors outline-none",
              "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
              !selectedItem && "text-muted-foreground",
              className,
              triggerClassName,
            )}
          />
        }
      >
        <span className="flex min-w-0 flex-1 items-center gap-2 truncate text-start">
          {renderTriggerValue ? (
            renderTriggerValue(selectedItem, isLoading)
          ) : selectedItem ? (
            <span className="truncate font-medium text-foreground">{getItemLabel(selectedItem)}</span>
          ) : (
            <span>{isLoading ? loadingText : placeholder}</span>
          )}
        </span>
        <span className="flex items-center gap-1 shrink-0">
          {allowClear && selectedItem && !disabled && (
            <span
              role="button"
              tabIndex={0}
              aria-label="Clear selection"
              onClick={handleClear}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.stopPropagation();
                  handleSelect(null);
                }
              }}
              className="rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <IconX className="size-3.5" />
            </span>
          )}
          {isLoading ? (
            <Spinner className="size-4 text-muted-foreground" />
          ) : (
            <IconSelector className="size-4 opacity-50" />
          )}
        </span>
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={4} className="w-(--anchor-width) min-w-[280px] p-0">
        <Command shouldFilter={false} className="w-full">
          <CommandInput placeholder={searchPlaceholder} value={searchQuery} onValueChange={setSearchQuery} />
          <CommandList className="max-h-60 overflow-y-auto">
            {isSearching && (
              <div className="flex items-center justify-center gap-2 py-4 text-xs text-muted-foreground">
                <Spinner className="size-4" />
                <span>{loadingText}</span>
              </div>
            )}
            {!isSearching && filteredItems.length === 0 && <CommandEmpty>{emptyText}</CommandEmpty>}
            {!isSearching && filteredItems.length > 0 && (
              <CommandGroup>
                {filteredItems.map((item) => {
                  const itemKey = getItemKey(item);
                  const itemVal = getItemValue(item);
                  const isSelected = selectedItem ? getItemValue(selectedItem) === itemVal : false;

                  return (
                    <CommandItem
                      key={itemKey}
                      value={getItemLabel(item)}
                      onSelect={() => {
                        if (allowClear && isSelected) {
                          handleSelect(null);
                        } else {
                          handleSelect(item);
                        }
                      }}
                      className="flex items-center justify-between gap-2 py-2 cursor-pointer"
                    >
                      {renderItem ? (
                        renderItem(item, isSelected)
                      ) : (
                        <span className="truncate">{getItemLabel(item)}</span>
                      )}
                      <IconCheck
                        className={cn(
                          "size-4 shrink-0 transition-opacity",
                          isSelected ? "opacity-100 text-primary" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
