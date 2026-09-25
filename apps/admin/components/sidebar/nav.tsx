"use client";

import { cn } from "@orgatick/ui/lib/utils";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_EASE, SIDEBAR_NAV_GROUPS, type SidebarNavItem } from "@/lib/nav-config";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035, delayChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: NAV_EASE } },
};

function isNavActive(pathname: string, item: SidebarNavItem): boolean {
  return item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);
}

interface SidebarNavProps {
  collapsed: boolean;
  onNavigate?: () => void;
}

export function SidebarNav({ collapsed, onNavigate }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <motion.nav
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={cn("flex w-full flex-col gap-5", collapsed && "gap-4")}
      aria-label="Admin navigation"
    >
      {SIDEBAR_NAV_GROUPS.map((group) => (
        <div key={group.label} className="flex flex-col gap-1">
          {!collapsed && (
            <p className="px-3 pb-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
              {group.label}
            </p>
          )}
          <div className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const active = isNavActive(pathname, item);
              const Icon = item.icon;
              return (
                <motion.div key={item.href} variants={itemVariants}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    title={collapsed ? item.label : undefined}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative flex items-center rounded-xl text-sm font-medium outline-hidden transition-colors focus-visible:ring-2 focus-visible:ring-ring",
                      collapsed ? "justify-center py-2.5" : "gap-3 px-3 py-2",
                      active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="admin-sidebar-active-pill"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        className="absolute inset-0 rounded-xl bg-primary/10"
                      />
                    )}
                    <span className="relative flex size-5 shrink-0 items-center justify-center">
                      <Icon className="size-5" />
                    </span>
                    {!collapsed && (
                      <>
                        <span className="relative min-w-0 flex-1 truncate">{item.label}</span>
                        {item.badge && (
                          <span className="relative rounded-full bg-primary/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold leading-none text-primary">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </motion.nav>
  );
}
