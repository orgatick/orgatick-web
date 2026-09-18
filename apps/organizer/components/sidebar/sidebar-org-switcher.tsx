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
  const activeOrg = organizations.find((org) => org.id === activeOrgId) ?? organizations[0];

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
                <span className="block truncate text-sm font-semibold text-foreground">
                  {activeOrg?.name ?? "No organization"}
                </span>
                <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Switch org
                </span>
              </span>
            )}
            <IconChevronDown className="size-3.5 shrink-0 text-muted-foreground transition-transform duration-200 group-aria-expanded/button:rotate-180" />
          </Button>
        }
      />
      <DropdownMenuContent align="start" sideOffset={8} className="w-64 p-1.5">
        <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Switch organization</div>
        <DropdownMenuSeparator />
        {organizations.map((org) => {
          const isActive = org.id === activeOrg?.id;
          return (
            <DropdownMenuItem
              key={org.id}
              onClick={() => onOrgChange(org.id)}
              className={cn(
                "gap-2.5 py-2 ps-2",
                isActive && "bg-primary/10 font-medium text-primary focus:bg-primary/10 focus:text-primary",
              )}
            >
              <Avatar className="size-6 rounded-md">
                {org.logo && <AvatarImage src={org.logo} alt={org.name} />}
                <AvatarFallback className="rounded-md bg-primary/15 text-[10px] font-bold text-primary">
                  {orgInitials(org.name)}
                </AvatarFallback>
              </Avatar>
              <span className="min-w-0 flex-1 truncate text-sm">{org.name}</span>
              {isActive && <IconCheck className="size-4 shrink-0 text-primary" />}
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem render={<Link href="/create" />} className="gap-2.5 py-2 ps-2">
          <IconPlus className="size-4 text-muted-foreground" />
          <span className="text-sm">Create new organization</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
