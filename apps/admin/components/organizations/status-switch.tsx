"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@orgatick/ui/components/select";
import { cn } from "@orgatick/ui/lib/utils";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { updateOrganizationStatus } from "@/lib/admin.api";
import { handleApiError } from "@/lib/apis/api-error";
import type { OrgStatus } from "@/lib/types";

const STATUS_OPTIONS: OrgStatus[] = ["active", "suspended", "inactive"];

interface StatusSwitchProps {
  organizationId: string | number;
  currentStatus: OrgStatus;
  className?: string;
}

export function StatusSwitch({ organizationId, currentStatus, className }: StatusSwitchProps) {
  const router = useRouter();
  const [value, setValue] = useState<OrgStatus>(currentStatus);
  const [pending, startTransition] = useTransition();

  const handleChange = (next: string | null) => {
    if (!next || next === value) return;
    startTransition(async () => {
      try {
        await updateOrganizationStatus(String(organizationId), next as OrgStatus);
        setValue(next as OrgStatus);
        router.refresh();
        toast.success(`Organization status updated to ${next}`);
      } catch (error) {
        handleApiError(error, "Failed to update organization status");
      }
    });
  };

  return (
    <Select value={value} onValueChange={handleChange} disabled={pending}>
      <SelectTrigger
        className={cn("h-7 w-28 font-mono text-xs capitalize", className)}
        aria-label="Organization status"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {STATUS_OPTIONS.map((status) => (
          <SelectItem key={status} value={status} className="font-mono text-xs capitalize">
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
