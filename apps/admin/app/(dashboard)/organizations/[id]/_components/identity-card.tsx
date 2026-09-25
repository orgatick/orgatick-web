import Link from "next/link";
import { IconArrowUpRight, IconBuildingStore, IconCircleCheck } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@orgatick/ui/components/avatar";
import { Badge } from "@orgatick/ui/components/badge";
import { Card, CardContent } from "@orgatick/ui/components/card";
import type { AdminOrganization } from "@/lib/types";
import { StatusSwitch } from "../../_components/status-switch";

const statusBadgeClass: Record<AdminOrganization["status"], string> = {
  active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  suspended: "bg-destructive/10 text-destructive",
  inactive: "bg-muted text-muted-foreground",
};

interface IdentityCardProps {
  organization: AdminOrganization;
}

export function IdentityCard({ organization }: IdentityCardProps) {
  const verification = organization.verification;
  const state = organization.adminState;

  return (
    <Card>
      <CardContent className="space-y-3 p-4">
        <div className="flex items-center gap-3">
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-secondary text-secondary-foreground">
            {organization.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={organization.logo} alt="" className="size-12 rounded-xl object-cover" />
            ) : (
              <IconBuildingStore className="size-6" />
            )}
          </span>
          <div className="min-w-0">
            <h2 className="truncate font-heading text-lg font-bold tracking-tight text-foreground">
              {organization.name}
            </h2>
            <p className="truncate text-xs text-muted-foreground">@{organization.slug}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <Badge
            variant="secondary"
            className={`px-1.5 py-0 font-mono text-[9px] capitalize ${statusBadgeClass[organization.status]}`}
          >
            {organization.status}
          </Badge>
          {verification?.status === "verified" && (
            <Badge className="gap-1 bg-emerald-500/10 px-1.5 py-0 font-mono text-[9px] text-emerald-600 dark:text-emerald-400">
              <IconCircleCheck className="size-3" /> Verified
            </Badge>
          )}
          {state?.blocked && (
            <Badge variant="destructive" className="px-1.5 py-0 font-mono text-[9px] capitalize">
              Blocked
            </Badge>
          )}
          {state?.hidden && (
            <Badge variant="secondary" className="px-1.5 py-0 font-mono text-[9px] capitalize">
              Hidden
            </Badge>
          )}
          {state?.archived && (
            <Badge variant="secondary" className="px-1.5 py-0 font-mono text-[9px] capitalize">
              Archived
            </Badge>
          )}
        </div>

        <p className="font-mono text-xs text-muted-foreground">ID: #{organization.id}</p>

        <div className="flex items-center justify-between gap-2 border-t border-border/60 pt-3">
          <span className="text-xs text-muted-foreground">Status</span>
          <StatusSwitch organizationId={organization.id} currentStatus={organization.status} />
        </div>

        {organization.creator && (
          <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/40 px-3 py-2">
            <Avatar className="size-7 shrink-0">
              {organization.creator.avatar ? (
                <AvatarImage src={organization.creator.avatar} alt={organization.creator.name} />
              ) : (
                <AvatarFallback className="bg-gradient-to-br from-primary to-indigo-600 font-mono text-[8px] font-bold text-white">
                  {organization.creator.name
                    .trim()
                    .split(/\s+/)
                    .slice(0, 2)
                    .map((part) => part[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="text-xs text-muted-foreground">Owner</p>
              <p className="truncate text-sm font-semibold text-foreground">{organization.creator.name}</p>
            </div>
            <Link
              href={`/users/${organization.creator.id}`}
              className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              Profile <IconArrowUpRight className="size-3" />
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
