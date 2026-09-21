import { Card, CardContent } from "@orgatick/ui/components/card";
import type { Icon } from "@tabler/icons-react";
import { cn } from "@orgatick/ui/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  hint?: string;
  icon?: Icon;
  accent?: "default" | "primary" | "success" | "danger" | "warning";
  className?: string;
}

const accentClasses: Record<NonNullable<StatCardProps["accent"]>, string> = {
  default: "bg-muted/60 text-muted-foreground",
  primary: "bg-primary/10 text-primary",
  success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  danger: "bg-destructive/10 text-destructive",
  warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

export function StatCard({ label, value, hint, icon: Icon, accent = "default", className }: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="flex items-start justify-between gap-3 p-4">
        <div className="min-w-0 space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="font-heading text-2xl font-bold tabular-nums tracking-tight text-foreground">{value}</p>
          {hint && <p className="truncate text-xs text-muted-foreground">{hint}</p>}
        </div>
        {Icon && (
          <span className={cn("grid size-9 shrink-0 place-items-center rounded-xl", accentClasses[accent])}>
            <Icon className="size-4.5" />
          </span>
        )}
      </CardContent>
    </Card>
  );
}
