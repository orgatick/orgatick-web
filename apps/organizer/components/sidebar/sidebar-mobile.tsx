"use client";

import type { UserResponse } from "@orgatick/contracts";
import { Button } from "@orgatick/ui/components/button";
import { Avatar, AvatarFallback, AvatarImage } from "@orgatick/ui/components/avatar";
import { Sheet, SheetContent, SheetHeader } from "@orgatick/ui/components/sheet";
import { cn } from "@orgatick/ui/lib/utils";
import { IconBell, IconMenu2, IconSearch } from "@tabler/icons-react";
import type { SidebarOrganization } from "@/lib/sidebar/nav-config";
import { SidebarBrand } from "./sidebar-brand";
import { SidebarNav } from "./sidebar-nav";
import { SidebarOrgSwitcher } from "./sidebar-org-switcher";
import { SidebarUserCard } from "./sidebar-user-card";

interface SidebarMobileProps {
  user: UserResponse;
  organizations: SidebarOrganization[];
  activeOrgId: string | number | null;
  onOrgChange: (id: string | number) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SidebarMobileSheet({
  user,
  organizations,
  activeOrgId,
  onOrgChange,
  open,
  onOpenChange,
}: SidebarMobileProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[300px] gap-0 p-0">
        <SheetHeader className="h-16 flex-row items-center gap-3 pe-12">
          <SidebarBrand className="w-full" />
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 py-4">
          <SidebarOrgSwitcher organizations={organizations} activeOrgId={activeOrgId} onOrgChange={onOrgChange} />
          <SidebarNav collapsed={false} />
        </div>

        <div className="shrink-0 border-t border-border/40 p-3">
          <SidebarUserCard user={user} onSignedOut={() => onOpenChange(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function SidebarMobileTopbar({ user, onMenuClick }: { user: UserResponse; onMenuClick: () => void }) {
  const initials = user.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex h-14 shrink-0 items-center gap-2 border-b border-border/40 bg-background/80 px-3 backdrop-blur-md lg:hidden">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Open menu"
        onClick={onMenuClick}
        className="text-foreground"
      >
        <IconMenu2 className="size-5" />
      </Button>

      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs shadow-primary/20">
        <span className="font-heading text-sm font-bold">O</span>
      </span>
      <span className="font-heading text-base font-bold tracking-tight text-foreground">Orgatick</span>

      <div className="ms-auto flex items-center gap-1">
        <Button type="button" variant="ghost" size="icon-sm" aria-label="Search" className="text-muted-foreground">
          <IconSearch className="size-4.5" />
        </Button>
        <span className="relative inline-flex">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Notifications"
            className="text-muted-foreground"
          >
            <IconBell className="size-4.5" />
          </Button>
          <span className="absolute end-1 top-1 size-1.5 rounded-full bg-destructive" />
        </span>
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Account"
          className={cn("ms-1 rounded-full outline-hidden focus-visible:ring-2 focus-visible:ring-ring")}
        >
          <Avatar className="size-8">
            {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
            <AvatarFallback className="bg-linear-to-br from-primary to-indigo-600 font-mono text-xs font-bold text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
        </button>
      </div>
    </div>
  );
}
