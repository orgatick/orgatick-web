"use client";

import { cn } from "@orgatick/ui/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDEBAR_NAV_GROUPS, type SidebarNavItem } from "@/lib/nav-config";

function isNavActive(pathname: string, item: SidebarNavItem): boolean {
  return item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function SidebarNav({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();

  return (
    <nav className={cn("w-full space-y-3", collapsed && "space-y-4")} aria-label="Sidebar">
      {SIDEBAR_NAV_GROUPS.map((group) => (
        <div key={group.label} className="space-y-1">
          {!collapsed && (
            <p className="px-3 pb-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
              {group.label}
            </p>
          )}
          <div className="space-y-0.5">
            {group.items.map((item) => {
              const active = isNavActive(pathname, item);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "group relative flex items-center rounded-xl text-sm font-medium outline-hidden transition-colors focus-visible:ring-2 focus-visible:ring-ring",
                    collapsed ? "justify-center py-2.5" : "gap-3 px-3 py-2",
                    active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {active && <span className="absolute inset-0 rounded-xl bg-primary/10" />}
                  <span className="relative flex size-5 shrink-0 items-center justify-center">
                    <Icon className="size-5" />
                  </span>
                  {!collapsed && <span className="relative min-w-0 flex-1 truncate">{item.label}</span>}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
