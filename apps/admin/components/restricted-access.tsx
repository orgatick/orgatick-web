import { IconShieldX } from "@tabler/icons-react";
import { cn } from "@orgatick/ui/lib/utils";
import { LinkButton } from "@/components/link-button";

export function RestrictedAccess({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex min-h-dvh flex-col items-center justify-center gap-4 bg-background p-8 text-center text-foreground",
        className,
      )}
    >
      <span className="grid size-16 place-items-center rounded-2xl bg-destructive/10 text-destructive">
        <IconShieldX className="size-8" />
      </span>
      <div className="space-y-1.5">
        <h1 className="font-heading text-2xl font-bold tracking-tight">Admin access required</h1>
        <p className="mx-auto max-w-md text-sm text-muted-foreground">
          This area is restricted to platform administrators. Sign in with an admin account to continue.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <LinkButton href="https://orgatick.in" variant="outline">
          Go to Orgatick
        </LinkButton>
        <LinkButton href="/login">Sign in</LinkButton>
      </div>
    </div>
  );
}
