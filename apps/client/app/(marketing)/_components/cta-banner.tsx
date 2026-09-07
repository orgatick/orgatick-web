import { LinkButton } from "@/components/ui/link-button";
import { IconArrowUpRight, IconBrandWhatsapp } from "@tabler/icons-react";
import * as motion from "motion/react-client";

interface CtaBannerProps {
  badge?: string;
  title?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
}

export function CtaBanner({
  badge = "Ready to Launch?",
  title = "Host Your Next Event With Zero Operational Stress",
  description = "Join 200+ colleges and technical summits using Orgatick for instant WhatsApp passes, sub-second gate check-ins, and audited payouts.",
  primaryCtaText = "Host an Event Free",
  primaryCtaHref = "/contact",
  secondaryCtaText = "Chat on WhatsApp",
  secondaryCtaHref = "https://wa.me/918539863808?text=Hi%20Orgatick%20Team%2C%20I%20want%20to%20learn%20more%20about%20hosting%20an%20event.",
}: CtaBannerProps) {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-border/80 bg-linear-to-b from-primary/10 via-card to-card p-8 text-center sm:p-14 md:p-16 shadow-2xl shadow-primary/5"
        >
          {/* Subtle Background Glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 size-96 rounded-full bg-primary/15 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
              <span>{badge}</span>
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">{title}</h2>

            <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg leading-relaxed">
              {description}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <LinkButton
                href={primaryCtaHref}
                variant="default"
                size="lg"
                className="h-12 px-7 text-sm font-semibold shadow-lg shadow-primary/25 rounded-xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{primaryCtaText}</span>
                <IconArrowUpRight className="ml-1.5 size-4" />
              </LinkButton>

              <a
                href={secondaryCtaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border/80 bg-background/80 px-6 text-sm font-semibold text-foreground backdrop-blur-xs transition-colors hover:bg-muted"
              >
                <IconBrandWhatsapp className="size-4.5 text-emerald-600" />
                <span>{secondaryCtaText}</span>
              </a>
            </div>

            {/* Reassurance pills */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Free for student clubs
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Offline gate scanner included
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Live setup in &lt; 5 minutes
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
