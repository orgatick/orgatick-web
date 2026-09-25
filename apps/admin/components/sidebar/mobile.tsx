"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@orgatick/ui/components/avatar";
import { Button } from "@orgatick/ui/components/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@orgatick/ui/components/sheet";
import { IconMenu2, IconShieldCheck } from "@tabler/icons-react";
import type { AdminUser } from "@/lib/types";
import { SidebarBrand } from "./brand";
import { SidebarNav } from "./nav";
import { SidebarUserCard } from "./user-card";
import { ThemeOptions, ThemeToggle } from "./theme-toggle";

interface SidebarMobileSheetProps {
  user: AdminUser;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SidebarMobileSheet({ user, open, onOpenChange }: SidebarMobileSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[300px] gap-0 p-0">
        <SheetHeader className="h-16 flex-row items-center gap-3 pe-12">
          <SheetTitle className="sr-only">Admin navigation</SheetTitle>
          <SidebarBrand className="w-full" onClick={() => onOpenChange(false)} />
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 py-4">
          <SidebarNav collapsed={false} onNavigate={() => onOpenChange(false)} />

          <div className="flex flex-col gap-1 border-t border-border/60 pt-4">
            <p className="px-3 pb-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
              Appearance
            </p>
            <ThemeOptions />
          </div>
        </div>

        <div className="shrink-0 border-t border-border/40 p-3">
          <SidebarUserCard user={user} onSignedOut={() => onOpenChange(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function SidebarMobileTopbar({ user, onMenuClick }: { user: AdminUser; onMenuClick: () => void }) {
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
        <IconShieldCheck className="size-4.5" />
      </span>
      <span className="font-heading text-base font-bold tracking-tight text-foreground">Admin</span>

      <div className="ms-auto flex items-center gap-1">
        <ThemeToggle compact align="end" className="text-muted-foreground" />

        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open account menu"
          className="ms-1 rounded-full outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Avatar className="size-8">
            {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
            <AvatarFallback className="bg-linear-to-br from-primary to-indigo-600 font-mono text-xs font-bold text-white">
              {user.name
                .trim()
                .split(/\s+/)
                .slice(0, 2)
                .map((part) => part[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </button>
      </div>
    </div>
  );
}
