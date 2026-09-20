import { IconArrowRight, IconShieldLock, IconShieldCheck, IconLock } from "@tabler/icons-react";
import * as motion from "motion/react-client";
import { LinkButton } from "../ui/link-button";
import { RestrictedAccessIllustration } from "@orgatick/ui/assets/illustration/restricted-access";

export function RestrictedAccess() {
  return (
    <section className="relative isolate flex min-h-dvh items-center justify-center overflow-hidden px-4 py-16 sm:px-6 sm:py-24">
      {/* Grid pattern */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-grid-pattern opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black,transparent)]"
      />

      <div className="container relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        {/* Security Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 py-2 shadow-sm backdrop-blur-md">
          <IconShieldLock className="size-4 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">Secured Admin System</span>
        </div>

        {/* Illustration Hero */}
        <div className="relative mt-12 mb-10 sm:mt-14">
          {/* Glow behind */}
          <div aria-hidden className="absolute -inset-10 -z-10 rounded-full bg-primary/20 blur-3xl" />
          {/* Ring accent */}
          <div
            aria-hidden
            className="absolute -inset-4 -z-10 rounded-full border border-primary/10 bg-background/40 backdrop-blur-sm"
          />

          <RestrictedAccessIllustration className="size-48 drop-shadow-xl sm:size-60" />

          {/* Floating chip: verified */}
          <motion.div
            aria-hidden
            className="absolute -right-8 top-3 flex size-12 items-center justify-center rounded-2xl border border-border/70 bg-card p-2.5 shadow-lg sm:-right-12"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <IconShieldCheck className="size-6 text-emerald-500" />
          </motion.div>

          {/* Floating chip: locked */}
          <motion.div
            aria-hidden
            className="absolute -left-8 bottom-4 flex size-12 items-center justify-center rounded-2xl border border-border/70 bg-card p-2.5 shadow-lg sm:-left-12"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <IconLock className="size-6 text-secondary" />
          </motion.div>
        </div>

        {/* Main Headline */}
        <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
          Control your events.
          <br />
          <span className="bg-linear-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
            Securely. At scale.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          A centralized admin dashboard to manage events, registrations, payments, approvals, and system operations —
          built for reliability and security.
        </p>

        {/* CTA Buttons */}
        <div className="mt-9 flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:w-auto">
          <LinkButton
            href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/login`}
            size="lg"
            className="w-full gap-2 px-8 text-base sm:w-auto"
          >
            Login
            <IconArrowRight className="size-5" />
          </LinkButton>
          <LinkButton
            href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/about`}
            variant="outline"
            size="lg"
            className="w-full px-8 text-base sm:w-auto"
          >
            Know More
          </LinkButton>
        </div>

        {/* System Notice */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-muted-foreground/70">
          <IconShieldLock className="size-4" />
          admin.orgatick.in
          <span aria-hidden>·</span>
          Internal Admin System
          <span aria-hidden>·</span>
          Authorized Access Only
        </div>
      </div>
    </section>
  );
}
