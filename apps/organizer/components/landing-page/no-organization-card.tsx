import { LinkButton } from "@/components/ui/link-button";
import { IconAlertTriangle, IconArrowRight, IconBuildingCommunity, IconShieldLock } from "@tabler/icons-react";

export default function NoOrganizationCard() {
  const createOrgHref = "/create";

  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-background">
      {/* Background Grid */}
      <div className="bg-grid-pattern absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" />

      {/* Background Fade */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-background/80 to-background" />

      <div className="container relative z-10 mx-auto px-6 py-24">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          {/* Security Context */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border bg-card/60 px-4 py-2 backdrop-blur-sm">
            <IconShieldLock className="size-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Admin System</span>
          </div>

          {/* Alert Icon */}
          <div className="mb-6 flex size-16 items-center justify-center rounded-2xl border bg-card shadow-sm">
            <IconBuildingCommunity className="size-8 text-muted-foreground" />
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">No Organization Found</h1>

          {/* Description */}
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
            Your admin account is not currently associated with an organization. Create an organization to start
            managing your events, registrations, payments, and other operations.
          </p>

          {/* Alert */}
          <div className="mt-8 flex w-full max-w-xl items-start gap-3 rounded-xl border bg-muted/40 p-4 text-left">
            <IconAlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-500" />

            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">Organization access required</p>

              <p className="text-sm leading-6 text-muted-foreground">
                You need to belong to at least one organization before you can access the admin dashboard.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <LinkButton href={createOrgHref} size="lg" className="w-full gap-2 px-8 text-base sm:w-auto">
              Create Organization
              <IconArrowRight className="size-5" />
            </LinkButton>

            <LinkButton
              href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/about`}
              variant="outline"
              size="lg"
              className="w-full px-8 text-base sm:w-auto"
            >
              Learn More
            </LinkButton>
          </div>

          {/* System Information */}
          <div className="mt-12 border-t pt-6">
            <p className="text-xs text-muted-foreground/60">admin.orgatick.in · Internal Admin System</p>

            <p className="mt-1 text-xs text-muted-foreground/50">Authorized access only</p>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-background to-transparent" />
    </section>
  );
}
