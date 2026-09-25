import OrgatickLogo from "@orgatick/ui/assets/logo/orgatick-logo";
import Link from "next/link";
import { cn } from "@orgatick/ui/lib/utils";

export function SidebarBrand({ collapsed, className }: { collapsed?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group flex shrink-0 select-none items-center gap-2.5", collapsed && "justify-center", className)}
    >
      <span className="relative inline-flex">
        <span className="absolute inset-0 -m-1.5 rounded-xl bg-primary/10 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
        <span className="relative flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/20 transition-transform duration-300 group-hover:-translate-y-px group-hover:scale-[1.04]">
          <OrgatickLogo className="size-5" />
        </span>
      </span>
      {!collapsed && (
        <span className="min-w-0">
          <span className="block truncate font-heading text-sm font-bold leading-tight tracking-tight text-foreground">
            Orgatick
          </span>
          <span className="block truncate font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Organizer
          </span>
        </span>
      )}
    </Link>
  );
}
