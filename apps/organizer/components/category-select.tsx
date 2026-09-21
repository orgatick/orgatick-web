"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { IconChevronDown, IconLoader } from "@tabler/icons-react";
import type { CategoryResponse } from "@orgatick/contracts";

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
import { cn } from "@orgatick/ui/lib/utils";

import { useCategoryOptions } from "@/lib/use-category-options";

export interface CategorySelectProps {
  value: number | null | undefined;
  onValueChange: (categoryId: number) => void;
  level: number;
  parentId?: number | null;
  placeholder?: string;
  disabled?: boolean;
  disabledReason?: string | null;
  ariaInvalid?: boolean;
  id?: string;
}

function CategoryRow({
  category,
  selected,
  onSelect,
}: {
  category: CategoryResponse;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <CommandItem
      value={`${Number(category.id)}-${category.name}`.toLowerCase()}
      onSelect={onSelect}
      className={cn("flex w-full flex-col items-start gap-0.5 py-2", selected && "bg-accent")}
    >
      <span className="flex w-full items-center gap-2">
        <span className="flex size-5 shrink-0 items-center justify-center rounded-[3px] bg-muted text-[0.65rem] font-semibold text-muted-foreground ring-1 ring-border tabular-nums">
          {category.level}
        </span>
        <span className="min-w-0 flex-1 truncate font-medium">{category.name}</span>
      </span>
      {category.description ? (
        <span className="line-clamp-1 pl-7 text-xs text-muted-foreground">{category.description}</span>
      ) : (
        <span className="line-clamp-1 pl-7 text-xs text-muted-foreground/60">#{category.slug}</span>
      )}
    </CommandItem>
  );
}

export function CategorySelect({
  value,
  onValueChange,
  level,
  parentId,
  placeholder = "Select a category",
  disabled,
  disabledReason,
  ariaInvalid,
  id,
}: CategorySelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const ioRef = useRef<IntersectionObserver | null>(null);

  const { items, isLoading, isLoadingMore, error, hasMore, loadMore } = useCategoryOptions({
    level,
    parentId,
    query,
  });

  const loadMoreRef = useRef(loadMore);
  loadMoreRef.current = loadMore;

  useEffect(() => () => ioRef.current?.disconnect(), []);

  const handleSentinelMount = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) {
        ioRef.current?.disconnect();
        ioRef.current = null;
        return;
      }
      if (!open || !hasMore) return;
      ioRef.current?.disconnect();
      ioRef.current = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            loadMoreRef.current();
          }
        },
        { root: null, rootMargin: "0px 0px 200px 0px" },
      );
      ioRef.current.observe(node);
    },
    [open, hasMore],
  );

  const selectedItem = items.find((category) => Number(category.id) === Number(value));
  const displayLabel = selectedItem?.name ?? selectedLabel;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            id={id}
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-invalid={ariaInvalid}
            disabled={disabled || Boolean(disabledReason)}
            className="w-full justify-between font-normal"
          >
            {disabledReason ? (
              <span className="truncate text-muted-foreground">{disabledReason}</span>
            ) : displayLabel ? (
              <span className="min-w-0 truncate text-foreground">{displayLabel}</span>
            ) : (
              <span className="truncate text-muted-foreground">{placeholder}</span>
            )}
            <IconChevronDown data-icon="inline-end" className="size-4 shrink-0 opacity-50" />
          </Button>
        }
      />

      <PopoverContent align="start" className="w-(--anchor-width) p-0">
        <Command shouldFilter={false}>
          <CommandInput placeholder="Search categories..." value={query} onValueChange={setQuery} />

          <CommandList className="max-h-64">
            {isLoading && (
              <div className="flex items-center justify-center gap-2 px-2 py-6 text-sm text-muted-foreground">
                <IconLoader className="size-4 shrink-0 animate-spin" />
                Loading categories...
              </div>
            )}

            {!isLoading && error && (
              <div className="flex items-start gap-2 px-4 py-6 text-sm text-destructive">
                <span>{error}</span>
              </div>
            )}

            {!isLoading && !error && items.length === 0 && <CommandEmpty>No categories found.</CommandEmpty>}

            {!isLoading && !error && items.length > 0 && (
              <CommandGroup>
                {items.map((category) => (
                  <CategoryRow
                    key={String(category.id)}
                    category={category}
                    selected={Number(category.id) === Number(value)}
                    onSelect={() => {
                      onValueChange(Number(category.id));
                      setSelectedLabel(category.name);
                      setOpen(false);
                    }}
                  />
                ))}
              </CommandGroup>
            )}

            {!isLoading && !error && hasMore && (
              <div ref={handleSentinelMount} className="px-2 py-3">
                {isLoadingMore ? (
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <IconLoader className="size-3.5 shrink-0 animate-spin" />
                    Loading more...
                  </div>
                ) : (
                  <div className="flex items-center justify-center text-xs text-muted-foreground/70">
                    Scroll for more
                  </div>
                )}
              </div>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
