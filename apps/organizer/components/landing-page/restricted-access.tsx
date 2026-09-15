import { IconArrowRight, IconShieldLock } from "@tabler/icons-react";
import { LinkButton } from "../ui/link-button";

export function RestrictedAccess() {
  return (
    <section className="relative min-h-dvh flex items-center justify-center overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-background/50 to-background" />

      {/* Content */}
      <div className="container relative z-10 mx-auto py-32">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Security Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-card/50 backdrop-blur-sm">
            <IconShieldLock className="size-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Secured Admin System</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-foreground leading-tight">
            Control your events.
            <br />
            <span className="text-primary">Securely.</span> <span className="text-primary">At scale.</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A centralized admin dashboard to manage events, registrations, payments, approvals, and system operations —
            built for reliability and security.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full">
            <LinkButton href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/login`} size="lg" className="gap-2 text-base px-8">
              Login
              <IconArrowRight className="size-5" />
            </LinkButton>
            <LinkButton
              href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/about`}
              variant="outline"
              size="lg"
              className="text-base px-8"
            >
              Know More
            </LinkButton>
          </div>

          {/* System Notice */}
          <div className="pt-8">
            <p className="text-sm text-muted-foreground/70">
              admin.orgatick.in · Internal Admin System · Authorized Access Only
            </p>
          </div>
        </div>
      </div>

      {/* Subtle Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
