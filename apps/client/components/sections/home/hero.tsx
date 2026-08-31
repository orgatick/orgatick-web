import { LinkButton } from "@/components/ui/link-button";
import { Badge } from "@orgatick/ui/components/badge";
import { IconArrowRight, IconBolt, IconCheck, IconSparkles } from "@tabler/icons-react";
import * as motion from "motion/react-client";

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden border-b border-border/40 bg-background min-h-dvh">
      {/* Dynamic ambient background glow & refined grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.18),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[32px_32px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Above-the-fold Hero Content - Rendered immediately in SSR HTML for sub-second LCP */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
          {/* Tagline Badge */}
          <div>
            <Badge
              variant="outline"
              className="px-4 py-1.5 rounded-full border-primary/30 bg-primary/10 text-primary text-xs sm:text-sm font-medium backdrop-blur-md shadow-xs hover:bg-primary/15 transition-colors cursor-default"
            >
              <IconSparkles className="size-3.5 mr-1.5 animate-pulse text-primary shrink-0" />
              The Operating Platform for Events
            </Badge>
          </div>

          {/* Hero Main Heading - Immediate SSR paint for LCP */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.08] text-balance">
            One Platform to{" "}
            <span className="bg-linear-to-r from-primary via-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Discover, Operate & Measure
            </span>{" "}
            Events.
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl text-balance leading-relaxed font-normal">
            Eliminate fragmented Google forms, lost payments, chaotic WhatsApp groups, and venue check-in bottlenecks.
            Orgatick unites the complete event lifecycle into one seamless SaaS workspace.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <LinkButton
              href="#pricing"
              size="lg"
              variant="default"
              className="h-12 px-7 text-base font-semibold shadow-lg shadow-primary/25 rounded-xl group transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Launch Your Event</span>
              <IconArrowRight className="size-5 ml-2 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
            </LinkButton>
            <LinkButton
              href="#capabilities"
              size="lg"
              variant="outline"
              className="h-12 px-7 text-base font-medium rounded-xl border-border hover:bg-muted/60 transition-colors duration-200"
            >
              <IconBolt className="size-5 mr-2 text-primary shrink-0" />
              <span>Explore Platform Capabilities</span>
            </LinkButton>
          </div>

          {/* Highlight badges */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <IconCheck className="size-4 text-emerald-500 shrink-0" />
              <span>Instant Digital Tickets & QR Verification</span>
            </div>
            <div className="flex items-center gap-1.5">
              <IconCheck className="size-4 text-emerald-500 shrink-0" />
              <span>Automated WhatsApp & Email Updates</span>
            </div>
            <div className="flex items-center gap-1.5">
              <IconCheck className="size-4 text-emerald-500 shrink-0" />
              <span>Real-Time Attendance Analytics</span>
            </div>
          </div>
        </div>

        {/* Trust Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-border/40 text-center max-w-5xl mx-auto"
        >
          <div className="space-y-1 transition-transform duration-200 hover:-translate-y-0.5">
            <p className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight font-mono">500+</p>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">College Events Hosted</p>
          </div>
          <div className="space-y-1 transition-transform duration-200 hover:-translate-y-0.5">
            <p className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight font-mono">1.2M+</p>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">Digital Tickets Verified</p>
          </div>
          <div className="space-y-1 transition-transform duration-200 hover:-translate-y-0.5">
            <p className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight font-mono">4.2s</p>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">Average Venue Check-In</p>
          </div>
          <div className="space-y-1 transition-transform duration-200 hover:-translate-y-0.5">
            <p className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight font-mono">99.9%</p>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">Reconciliation Accuracy</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
