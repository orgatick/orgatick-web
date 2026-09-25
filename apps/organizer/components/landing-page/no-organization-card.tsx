import { LinkButton } from "@/components/ui/link-button";
import HappyWorkspace from "@orgatick/ui/assets/illustration/happy-workspace";
import { IconAlertTriangle, IconArrowRight, IconShieldLock } from "@tabler/icons-react";

export default function NoOrganizationCard() {
  const createOrgHref = "/create";

  return (
    <section className="relative isolate flex min-h-dvh items-center justify-center overflow-hidden bg-background px-4 py-16 sm:px-6 sm:py-24">
      {/* Grid pattern */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-grid-pattern opacity-[0.02] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black,transparent)] dark:opacity-[0.05]"
      />

      {/* Background fade */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-background via-background/80 to-background" />

      <div className="container relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        {/* Admin Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 py-2 shadow-sm backdrop-blur-md">
          <IconShieldLock className="size-4 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">Admin System</span>
        </div>

        {/* Illustration Hero */}
        <div className="relative mt-12 mb-10 w-full max-w-2xl sm:mt-14 flex items-center justify-center">
          <HappyWorkspace className="h-34" />
        </div>

        {/* Main Headline */}
        <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
          No Organization Found.
          <br />
          <span className="bg-linear-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
            Build your workspace.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          Your admin account isn&apos;t linked to an organization yet. Create one to start managing events,
          registrations, payments, and approvals — all from a single dashboard.
        </p>

        {/* Alert */}
        <div className="mt-8 flex w-full max-w-2xl items-start gap-3 rounded-xl border bg-card/60 p-4 text-left shadow-sm">
          <IconAlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-500" />

          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">Organization access required</p>

            <p className="text-sm leading-6 text-muted-foreground">
              You need to belong to at least one organization before you can access the admin dashboard.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
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

        {/* System Notice */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-muted-foreground/60">
          admin.orgatick.in
          <span aria-hidden>·</span>
          Internal Admin System
          <span aria-hidden>·</span>
          Authorized Access Only
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 -z-10 h-24 bg-linear-to-t from-background to-transparent" />
    </section>
  );
}
