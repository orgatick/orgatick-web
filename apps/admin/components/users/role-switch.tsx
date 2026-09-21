"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@orgatick/ui/components/select";
import { cn } from "@orgatick/ui/lib/utils";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { updateUserRole } from "@/lib/admin.api";
import { handleApiError } from "@/lib/apis/api-error";
import type { PlatformRole } from "@/lib/types";

const ROLE_OPTIONS: { value: PlatformRole; className?: string }[] = [{ value: "admin" }, { value: "user" }];

interface RoleSwitchProps {
  userId: string | number;
  currentRole: PlatformRole;
  disabled?: boolean;
  className?: string;
}

export function RoleSwitch({ userId, currentRole, disabled, className }: RoleSwitchProps) {
  const router = useRouter();
  const [value, setValue] = useState<PlatformRole>(currentRole);
  const [pending, startTransition] = useTransition();

  const handleChange = (next: string | null) => {
    if (!next || next === value) return;
    startTransition(async () => {
      try {
        await updateUserRole(String(userId), next as PlatformRole);
        setValue(next as PlatformRole);
        router.refresh();
        toast.success(`User role updated to ${next}`);
      } catch (error) {
        handleApiError(error, "Failed to update user role");
      }
    });
  };

  return (
    <Select value={value} onValueChange={handleChange} disabled={disabled || pending}>
      <SelectTrigger className={cn("h-7 w-28 font-mono text-xs capitalize", className)} aria-label="User role">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {ROLE_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value} className="font-mono text-xs capitalize">
            {option.value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
