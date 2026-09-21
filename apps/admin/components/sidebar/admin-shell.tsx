"use client";

import { useState } from "react";
import type { AdminUser } from "@/lib/types";
import { SidebarDesktop } from "./desktop";
import { SidebarMobileSheet, SidebarMobileTopbar } from "./mobile";

interface AdminShellProps {
  user: AdminUser;
  children: React.ReactNode;
}

export function AdminShell({ user, children }: AdminShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-background">
      <SidebarDesktop user={user} collapsed={collapsed} onToggleCollapsed={() => setCollapsed((value) => !value)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <SidebarMobileTopbar user={user} onMenuClick={() => setMobileOpen(true)} />
        <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
      </div>

      <SidebarMobileSheet user={user} open={mobileOpen} onOpenChange={setMobileOpen} />
    </div>
  );
}
