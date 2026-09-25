import Link from "next/link";
import { IconArrowUpRight, IconBuildingStore } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@orgatick/ui/components/avatar";
import { Badge } from "@orgatick/ui/components/badge";
import type { AdminOrganization } from "@/lib/types";
import { StatusSwitch } from "./status-switch";

const statusBadgeClass: Record<AdminOrganization["status"], string> = {
  active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  suspended: "bg-destructive/10 text-destructive",
  inactive: "bg-muted text-muted-foreground",
};

const verificationBadgeClass: Record<string, string> = {
  verified: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  rejected: "bg-destructive/10 text-destructive",
  pending: "bg-muted text-muted-foreground",
};

export function OrganizationRow({ organization }: { organization: AdminOrganization }) {
  const state = organization.adminState;
  const verificationStatus = organization.verification?.status;

  return (
    <tr className="border-b border-border/60 last:border-b-0">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-secondary text-secondary-foreground">
            {organization.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={organization.logo} alt="" className="size-7 rounded object-cover" />
            ) : (
              <IconBuildingStore className="size-4" />
            )}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">{organization.name}</p>
            <p className="truncate text-xs text-muted-foreground">@{organization.slug}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
          #{organization.id}
        </code>
      </td>
      <td className="px-4 py-3">
        {organization.creator ? (
          <div className="flex items-center gap-2">
            <Avatar className="size-6 shrink-0">
              {organization.creator.avatar && (
                <AvatarImage src={organization.creator.avatar} alt={organization.creator.name} />
              )}
              <AvatarFallback className="bg-gradient-to-br from-primary to-indigo-600 font-mono text-[8px] font-bold text-white">
                {organization.creator.name
                  .trim()
                  .split(/\s+/)
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="max-w-40 truncate text-sm text-foreground">{organization.creator.name}</span>
          </div>
        ) : (
          <span className="text-xs text-muted-foreground/60">-</span>
        )}
      </td>
      <td className="px-4 py-3">
        <Badge
          variant="secondary"
          className={`px-1.5 py-0 font-mono text-[9px] capitalize ${verificationBadgeClass[verificationStatus ?? "pending"]}`}
        >
          {verificationStatus ?? "pending"}
        </Badge>
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1">
          {state?.blocked && (
            <Badge variant="destructive" className="px-1.5 py-0 font-mono text-[9px]">
              blocked
            </Badge>
          )}
          {state?.hidden && (
            <Badge variant="secondary" className="px-1.5 py-0 font-mono text-[9px]">
              hidden
            </Badge>
          )}
          {state?.archived && (
            <Badge variant="secondary" className="px-1.5 py-0 font-mono text-[9px]">
              archived
            </Badge>
          )}
          {!state?.blocked && !state?.hidden && !state?.archived && (
            <span className="text-xs text-muted-foreground/60">-</span>
          )}
        </div>
      </td>
      <td className="px-4 py-3">
        <StatusSwitch organizationId={organization.id} currentStatus={organization.status} />
      </td>
      <td className="px-4 py-3">
        <span className="text-xs tabular-nums text-muted-foreground">
          {new Date(organization.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </td>
      <td className="px-4 py-3">
        <Badge
          variant="secondary"
          className={`px-1.5 py-0 font-mono text-[9px] capitalize ${statusBadgeClass[organization.status]}`}
        >
          {organization.status}
        </Badge>
      </td>
      <td className="px-4 py-3 text-right">
        <Link
          href={`/organizations/${organization.id}`}
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          View <IconArrowUpRight className="size-3.5" />
        </Link>
      </td>
    </tr>
  );
}
