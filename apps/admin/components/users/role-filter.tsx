"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@orgatick/ui/components/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ALL_ROLES = "all";

export function RoleFilter({ value }: { value?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (next: string | null) => {
    if (!next) return;
    const params = new URLSearchParams(searchParams.toString());
    if (next === ALL_ROLES) {
      params.delete("role");
    } else {
      params.set("role", next);
    }
    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Select value={value ?? ALL_ROLES} onValueChange={handleChange}>
      <SelectTrigger className="h-8 w-36 font-mono text-xs" aria-label="Filter by role">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL_ROLES} className="font-mono text-xs">
          All roles
        </SelectItem>
        <SelectItem value="admin" className="font-mono text-xs">
          Admin
        </SelectItem>
        <SelectItem value="user" className="font-mono text-xs">
          User
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
