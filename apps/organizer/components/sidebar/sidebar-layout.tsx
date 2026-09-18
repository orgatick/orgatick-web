"use client";

import type { UserResponse } from "@orgatick/contracts";
import { useState } from "react";
import type { SidebarOrganization } from "@/lib/sidebar/nav-config";
import { SidebarDesktop } from "./sidebar-desktop";
import { SidebarMobileSheet, SidebarMobileTopbar } from "./sidebar-mobile";

interface SidebarLayoutProps {
  user: UserResponse;
  organizations: SidebarOrganization[];
  children: React.ReactNode;
}

export function SidebarLayout({ user, organizations, children }: SidebarLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeOrgId, setActiveOrgId] = useState<string | number | null>(organizations[0]?.id ?? null);

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-background">
      <SidebarDesktop
        user={user}
        organizations={organizations}
        activeOrgId={activeOrgId}
        onOrgChange={setActiveOrgId}
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed((value) => !value)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <SidebarMobileTopbar user={user} onMenuClick={() => setMobileOpen(true)} />
        <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
      </div>

      <SidebarMobileSheet
        user={user}
        organizations={organizations}
        activeOrgId={activeOrgId}
        onOrgChange={setActiveOrgId}
        open={mobileOpen}
        onOpenChange={setMobileOpen}
      />
    </div>
  );
}
