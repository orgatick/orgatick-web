"use client";

import { cn } from "@orgatick/ui/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MAIN_NAV_LINKS } from "./navbar-constants";

export function NavbarLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
      {MAIN_NAV_LINKS.map((link) => {
        const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`));

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
              isActive
                ? "text-primary font-semibold bg-primary/10 shadow-xs"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
            )}
          >
            <span>{link.label}</span>
            {link.badge && (
              <span className="ml-1.5 rounded-full bg-primary/15 px-1.5 py-0.2 text-[9px] font-mono text-primary">
                {link.badge}
              </span>
            )}
            {isActive && (
              <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-0.5 rounded-full bg-primary" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
