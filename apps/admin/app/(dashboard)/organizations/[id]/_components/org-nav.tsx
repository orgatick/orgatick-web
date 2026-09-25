"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconArchive,
  IconCertificate,
  IconFileText,
  IconHistory,
  IconLayoutDashboard,
  IconNotebook,
  IconShieldLock,
  IconUsers,
} from "@tabler/icons-react";
import { cn } from "@orgatick/ui/lib/utils";

const NAV = [
  { href: "", label: "Overview", icon: IconLayoutDashboard },
  { href: "/access", label: "Access", icon: IconShieldLock },
  { href: "/verification", label: "Verification", icon: IconCertificate },
  { href: "/members", label: "Members", icon: IconUsers },
  { href: "/documents", label: "Documents", icon: IconFileText },
  { href: "/notes", label: "Notes", icon: IconNotebook },
  { href: "/history", label: "History", icon: IconHistory },
  { href: "/closure", label: "Closure", icon: IconArchive },
] as const;

interface OrgNavProps {
  organizationId: string | number;
}

export function OrgNav({ organizationId }: OrgNavProps) {
  const pathname = usePathname();
  const base = `/organizations/${organizationId}`;

  return (
    <nav className="space-y-1 rounded-xl border border-border/60 bg-card p-2">
      {NAV.map((item) => {
        const Icon = item.icon;
        const target = item.href ? `${base}${item.href}` : base;
        const isActive = pathname === target;
        return (
          <Link
            key={item.label}
            href={target}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors",
              isActive ? "bg-primary/10 text-primary" : "hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
