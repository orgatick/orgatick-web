"use client";

import { cn } from "@orgatick/ui/lib/utils";
import { IconChevronsLeft, IconChevronsRight } from "@tabler/icons-react";
import type { AdminUser } from "@/lib/types";
import { SidebarBrand } from "./brand";
import { SidebarNav } from "./nav";
import { SidebarUserCard } from "./user-card";

interface SidebarDesktopProps {
  user: AdminUser;
  collapsed: boolean;
  onToggleCollapsed: () => void;
}

export function SidebarDesktop({ user, collapsed, onToggleCollapsed }: SidebarDesktopProps) {
  return (
    <aside
      className={cn(
        "relative z-30 hidden shrink-0 flex-col border-e border-border/70 bg-card/50 backdrop-blur-sm transition-[width] duration-300 ease-in-out lg:flex",
        collapsed ? "w-[76px]" : "w-[264px]",
      )}
    >
      <div
        className={cn(
          "flex h-16 shrink-0 items-center border-b border-border/40 px-3 transition-opacity duration-300",
          collapsed && "justify-center px-0",
        )}
      >
        <SidebarBrand collapsed={collapsed} className="w-full" />
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-3 py-4">
        <SidebarNav collapsed={collapsed} />
      </div>

      <div className="shrink-0 border-t border-border/40 p-3">
        <SidebarUserCard user={user} collapsed={collapsed} />
      </div>

      <button
        type="button"
        onClick={onToggleCollapsed}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute -end-3 top-16 z-10 grid size-6 place-items-center rounded-full border border-border bg-background text-muted-foreground shadow-sm transition-colors hover:border-primary/40 hover:text-primary"
      >
        {collapsed ? <IconChevronsRight className="size-3.5" /> : <IconChevronsLeft className="size-3.5" />}
      </button>
    </aside>
  );
}
