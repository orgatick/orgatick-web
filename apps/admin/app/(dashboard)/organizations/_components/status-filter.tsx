"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@orgatick/ui/components/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ALL_STATUSES = "all";
const STATUSES = ["active", "suspended", "inactive"] as const;

export function StatusFilter({ value }: { value?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (next: string | null) => {
    if (!next) return;
    const params = new URLSearchParams(searchParams.toString());
    if (next === ALL_STATUSES) {
      params.delete("status");
    } else {
      params.set("status", next);
    }
    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Select value={value ?? ALL_STATUSES} onValueChange={handleChange}>
      <SelectTrigger className="h-8 w-40 font-mono text-xs" aria-label="Filter by status">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL_STATUSES} className="font-mono text-xs">
          All statuses
        </SelectItem>
        {STATUSES.map((status) => (
          <SelectItem key={status} value={status} className="font-mono text-xs capitalize">
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
