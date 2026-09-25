"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@orgatick/ui/components/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ALL = "all";

const VERIFICATION_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "verified", label: "Verified" },
  { value: "rejected", label: "Rejected" },
];

const ACCESS_OPTIONS = [
  { value: "blocked", label: "Blocked" },
  { value: "archived", label: "Archived" },
];

function useQueryUpdater() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (key: string, next: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (next === ALL) {
      params.delete(key);
    } else {
      params.set(key, next);
    }
    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
}

export function VerificationFilter({ value }: { value?: string }) {
  const update = useQueryUpdater();
  return (
    <Select value={value ?? ALL} onValueChange={(next) => next && update("verification", next)}>
      <SelectTrigger className="h-8 w-36 font-mono text-xs" aria-label="Filter by verification status">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL} className="font-mono text-xs">
          All verification
        </SelectItem>
        {VERIFICATION_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value} className="font-mono text-xs capitalize">
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function AccessFilter({ value }: { value?: string }) {
  const update = useQueryUpdater();
  return (
    <Select value={value ?? ALL} onValueChange={(next) => next && update("access", next)}>
      <SelectTrigger className="h-8 w-32 font-mono text-xs" aria-label="Filter by access state">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL} className="font-mono text-xs">
          All access
        </SelectItem>
        {ACCESS_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value} className="font-mono text-xs capitalize">
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
