import { IconArrowRight, IconLock, IconShieldLock, IconShieldX } from "@tabler/icons-react";
import { Alert, AlertDescription, AlertTitle } from "@orgatick/ui/components/alert";
import { Badge } from "@orgatick/ui/components/badge";
import { Separator } from "@orgatick/ui/components/separator";
import { cn } from "@orgatick/ui/lib/utils";
import { LinkButton } from "@/components/link-button";

export function RestrictedAccess({ className }: { className?: string }) {
  return (
    <main
      className={cn(
        "flex min-h-full flex-col items-center justify-center gap-8 overflow-hidden px-6 py-16 text-center",
        className,
      )}
    >
      <Badge variant="destructive">
        <IconShieldLock data-icon="inline-start" className="size-3" />
        Internal system
      </Badge>

      <div className="flex flex-col items-center gap-6">
        <span className="grid size-16 place-items-center rounded-full bg-destructive/10 text-destructive">
          <IconShieldX className="size-8" />
        </span>

        <div className="space-y-3">
          <h1 className="font-heading text-balance text-3xl font-bold tracking-tight sm:text-5xl">Restricted access</h1>
          <p className="mx-auto max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
            This web service is used exclusively by the internal Orgatick team and is not intended for public access.
          </p>
        </div>
      </div>

      <Alert variant="destructive" className="mx-auto w-full max-w-lg text-start">
        <IconShieldX />
        <AlertTitle>Why did I land here?</AlertTitle>
        <AlertDescription>
          You reached a page reserved for Orgatick staff. Access is strictly limited and monitored. If you aren&apos;t
          part of the team, you can continue to the public Orgatick site.
        </AlertDescription>
      </Alert>

      <LinkButton href={`${process.env.NEXT_PUBLIC_CLIENT_URL}`} size="lg" className="gap-2 px-8 text-base">
        Go to orgatick.in
        <IconArrowRight data-icon="inline-end" />
      </LinkButton>

      <div className="flex flex-col items-center gap-3">
        <Separator className="w-40" />
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <IconLock className="size-3 shrink-0" />
          Authorized internal use only. All access is monitored.
        </p>
      </div>
    </main>
  );
}
