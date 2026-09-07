import { Badge } from "@orgatick/ui/components/badge";
import { cn } from "@orgatick/ui/lib/utils";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string | ReactNode;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeader({ badge, title, description, align = "center", className }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "space-y-4",
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl text-left",
        className,
      )}
    >
      {badge && (
        <Badge
          variant="outline"
          className="border-primary/30 bg-primary/10 text-primary font-medium tracking-wide text-xs px-3 py-1"
        >
          {badge}
        </Badge>
      )}
      <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">{title}</h2>
      {description && <p className="text-base text-muted-foreground sm:text-lg leading-relaxed">{description}</p>}
    </div>
  );
}
