"use client";

import { Button } from "@orgatick/ui/components/button";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@orgatick/ui/lib/utils";

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  className?: string;
}

interface PageItem {
  key: string;
  page: number | null;
}

function pageNumbers(current: number, total: number): PageItem[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => ({ key: String(index + 1), page: index + 1 }));
  }
  const items: PageItem[] = [{ key: "1", page: 1 }];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) items.push({ key: "ellipsis-start", page: null });
  for (let p = start; p <= end; p += 1) {
    items.push({ key: String(p), page: p });
  }
  if (end < total - 1) items.push({ key: "ellipsis-end", page: null });
  items.push({ key: String(total), page: total });
  return items;
}

export function PaginationControls({ page, totalPages, className }: PaginationControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const goTo = (target: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(target));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const current = Math.min(Math.max(page, 1), totalPages);

  return (
    <div className={cn("flex items-center justify-between gap-3", className)}>
      <p className="text-xs text-muted-foreground">
        Page <span className="font-medium text-foreground">{current}</span> of{" "}
        <span className="font-medium text-foreground">{totalPages}</span>
      </p>
      <div className="flex items-center gap-1">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={current <= 1}
          onClick={() => goTo(current - 1)}
          aria-label="Previous page"
        >
          <IconChevronLeft className="size-3.5" />
        </Button>
        {pageNumbers(current, totalPages).map((item) => {
          if (item.page === null) {
            return (
              <span key={item.key} className="px-1 text-xs text-muted-foreground">
                ...
              </span>
            );
          }
          const page = item.page;
          return (
            <Button
              type="button"
              key={item.key}
              size="sm"
              variant={page === current ? "default" : "outline"}
              className="min-w-7 px-2 font-mono text-xs"
              onClick={() => goTo(page)}
            >
              {page}
            </Button>
          );
        })}
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={current >= totalPages}
          onClick={() => goTo(current + 1)}
          aria-label="Next page"
        >
          <IconChevronRight className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
