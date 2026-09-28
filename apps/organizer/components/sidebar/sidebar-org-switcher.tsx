"use client";

import { cn } from "@orgatick/ui/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@orgatick/ui/components/avatar";
import { Button } from "@orgatick/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@orgatick/ui/components/dropdown-menu";
import { IconBuildingCommunity, IconCheck, IconChevronDown, IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import type { SidebarOrganization } from "@/lib/sidebar/nav-config";

function orgInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

type Tone = "success" | "warning" | "destructive" | "muted";

const DOT_TONE: Record<Tone, string> = {
  success: "bg-success",
  warning: "bg-warning",
  destructive: "bg-destructive",
  muted: "bg-muted-foreground/50",
};

const CHIP_TONE: Record<Tone, string> = {
  success: "bg-success/15 text-success",
  warning: "bg-warning/15 text-warning",
  destructive: "bg-destructive/15 text-destructive",
  muted: "bg-muted text-muted-foreground",
};

function verificationTone(status?: string): Tone {
  if (status === "verified") return "success";
  if (status === "rejected") return "destructive";
  if (status === "pending") return "warning";
  return "muted";
}

function membershipTone(status?: string): Tone {
  if (status === "active") return "success";
  if (status === "pending") return "warning";
  if (status === "rejected" || status === "inactive") return "destructive";
  return "muted";
}

function formatCount(value: number | undefined): string {
  if (!value) return "0";
  if (value < 1000) return String(value);
  if (value < 1000000) return `${(value / 1000).toFixed(value < 10000 ? 1 : 0).replace(/\.0$/, "")}k`;
  return `${(value / 1000000).toFixed(1).replace(/\.0$/, "")}m`;
}

function StatusChip({ tone, label }: { tone: Tone; label: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-px font-mono text-[9px] font-semibold uppercase leading-normal tracking-wider",
        CHIP_TONE[tone],
      )}
    >
      <span className={cn("size-1 rounded-full", DOT_TONE[tone])} />
      {label}
    </span>
  );
}

interface SidebarOrgSwitcherProps {
  organizations: SidebarOrganization[];
  activeOrgId: string | number | null;
  onOrgChange: (id: string | number) => void;
  collapsed?: boolean;
  className?: string;
}

export function SidebarOrgSwitcher({
  organizations,
  activeOrgId,
  onOrgChange,
  collapsed = false,
  className,
}: SidebarOrgSwitcherProps) {
  const activeEntry = organizations.find((entry) => entry.organization.id === activeOrgId) ?? organizations[0] ?? null;
  const activeOrg = activeEntry?.organization ?? null;

  const category = activeOrg?.subCategory?.name ?? activeOrg?.category?.name ?? null;
  const verifyTone = verificationTone(activeOrg?.verification?.status);
  const verifyLabel = activeOrg?.verification?.status ?? "unverified";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            className={cn(
              "group h-auto w-full items-center gap-2.5 rounded-xl border border-border/50 bg-card/60 px-2 py-2 text-start shadow-xs transition-colors hover:bg-accent/10 aria-expanded:bg-accent/10",
              collapsed && "justify-center px-0",
              className,
            )}
          />
        }
      >
        {activeOrg ? (
          <Avatar className="size-7 shrink-0 rounded-lg">
            {activeOrg.logo && <AvatarImage src={activeOrg.logo} alt={activeOrg.name} />}
            <AvatarFallback className="rounded-lg bg-primary/15 text-xs font-bold text-primary">
              {orgInitials(activeOrg.name)}
            </AvatarFallback>
          </Avatar>
        ) : (
          <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary">
            <IconBuildingCommunity className="size-4" />
          </span>
        )}

        {!collapsed && (
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-1.5">
              <span className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground">
                {activeOrg?.name ?? "No organization"}
              </span>
              {activeOrg && verifyTone !== "success" && <StatusChip tone={verifyTone} label={verifyLabel} />}
            </span>
            <span className="mt-0.5 flex items-center gap-1.5 text-[11px] leading-tight text-muted-foreground">
              {activeEntry && <span className="shrink-0 font-medium text-foreground/80">{activeEntry.role.name}</span>}
              {activeEntry && category && <span className="truncate">· {category}</span>}
              {!activeEntry && <span className="truncate">Select an organization</span>}
            </span>
          </span>
        )}

        <IconChevronDown className="size-3.5 shrink-0 text-muted-foreground transition-transform duration-200 group-aria-expanded/button:rotate-180" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" sideOffset={8} className="w-72 p-1.5">
        <div className="px-2 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
          Switch organization
        </div>
        <DropdownMenuSeparator />

        {organizations.length === 0 ? (
          <div className="px-2 py-4 text-center text-xs text-muted-foreground">
            You are not a member of any organization yet.
          </div>
        ) : (
          organizations.map((entry) => {
            const org = entry.organization;
            const isActive = org.id === activeOrg?.id;
            const orgVerifyTone = verificationTone(org.verification?.status);
            const orgSubtitle = org.subCategory?.name ?? org.category?.name ?? null;

            return (
              <DropdownMenuItem
                key={org.id}
                onClick={() => onOrgChange(org.id)}
                className={cn("items-start gap-2.5 py-2 ps-2", isActive && "bg-primary/10 focus:bg-primary/10")}
              >
                <span className="relative mt-px shrink-0">
                  <Avatar className="size-7 rounded-lg">
                    {org.logo && <AvatarImage src={org.logo} alt={org.name} />}
                    <AvatarFallback className="rounded-lg bg-primary/15 text-[10px] font-bold text-primary">
                      {orgInitials(org.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className={cn(
                      "absolute -end-0.5 -bottom-0.5 size-2.5 rounded-full border-2 border-popover",
                      DOT_TONE[membershipTone(entry.status)],
                    )}
                  />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5">
                    <span className={cn("min-w-0 flex-1 truncate text-sm", isActive && "font-semibold")}>
                      {org.name}
                    </span>
                    {isActive && <IconCheck className="size-4 shrink-0 text-primary" />}
                  </span>

                  {orgSubtitle && (
                    <span className="block truncate text-[11px] text-muted-foreground">{orgSubtitle}</span>
                  )}

                  <span className="mt-1 flex flex-wrap items-center gap-1">
                    <span className="rounded-md bg-secondary/15 px-1.5 py-px font-mono text-[9px] font-semibold uppercase leading-normal tracking-wider text-secondary">
                      {entry.role.name}
                    </span>
                    {org.verification?.status && orgVerifyTone !== "success" && (
                      <StatusChip tone={orgVerifyTone} label={org.verification.status} />
                    )}
                    {org.status && org.status !== "active" && (
                      <StatusChip tone={membershipTone(org.status)} label={org.status} />
                    )}
                  </span>

                  <span className="mt-1 flex items-center gap-2 font-mono text-[10px] text-muted-foreground/80">
                    <span>{formatCount(org.stats?.totalEvents)} events</span>
                    <span aria-hidden="true">·</span>
                    <span>{formatCount(org.stats?.totalParticipants)} attendees</span>
                  </span>
                </span>
              </DropdownMenuItem>
            );
          })
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem render={<Link href="/create" />} className="gap-2.5 py-2 ps-2">
          <IconPlus className="size-4 text-muted-foreground" />
          <span className="text-sm">Create new organization</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
