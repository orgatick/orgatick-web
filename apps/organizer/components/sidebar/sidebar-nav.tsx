import { NAV_EASE, SIDEBAR_NAV_GROUPS, SIDEBAR_PRIMARY_ACTION, type SidebarNavItem } from "@/lib/sidebar/nav-config";
import { cn } from "@orgatick/ui/lib/utils";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

export function SidebarNav({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();

  return (
    <motion.nav
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={cn("w-full space-y-3", collapsed && "space-y-4")}
      aria-label="Sidebar"
    >
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
                <motion.div key={item.href} variants={itemVariants}>
                  <Link
                    href={item.href}
                    title={collapsed ? item.label : undefined}
                    className={cn(
                      "group relative flex items-center rounded-xl text-sm font-medium outline-hidden transition-colors focus-visible:ring-2 focus-visible:ring-ring",
                      collapsed ? "justify-center py-2.5" : "gap-3 px-3 py-2",
                      active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="sidebar-active-pill"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        className="absolute inset-0 rounded-xl bg-primary/10"
                      />
                    )}
                    <span
                      className={cn("relative flex size-5 shrink-0 items-center justify-center", collapsed && "size-5")}
                    >
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

      <div className={cn(!collapsed && "border-t border-border/60 pt-2")}>
        <motion.div variants={itemVariants}>
          <Link
            href={SIDEBAR_PRIMARY_ACTION.href}
            className={cn(
              "group relative flex items-center rounded-xl bg-primary font-semibold text-primary-foreground shadow-sm shadow-primary/25 outline-hidden transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring",
              collapsed ? "justify-center py-2.5" : "gap-2 px-3 py-2",
            )}
          >
            <SIDEBAR_PRIMARY_ACTION.icon className="size-5 shrink-0" />
            {!collapsed && <span className="min-w-0 flex-1 truncate">{SIDEBAR_PRIMARY_ACTION.label}</span>}
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  );
}
