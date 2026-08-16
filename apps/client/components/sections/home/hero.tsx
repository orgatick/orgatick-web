import { LinkButton } from "@/components/ui/link-button";
import Glow from "@orgatick/ui/components/glow";
import { Mockup, MockupFrame } from "@orgatick/ui/components/mockup";
import {
  IconArrowRight,
  IconBolt,
  IconBrandWhatsapp,
  IconCheck,
  IconQrcode,
} from "@tabler/icons-react";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden border-b border-border/40">
      {/* Ambient background glow & grid overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(32,75,144,0.25),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs sm:text-sm font-medium backdrop-blur-md shadow-inner">
            <span>The Operating Platform for Events</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1] text-balance">
            One Platform to{" "}
            <span className="bg-linear-to-r from-primary via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Discover, Operate & Measure
            </span>{" "}
            Events.
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl text-balance leading-relaxed font-normal">
            Eliminate fragmented Google forms, lost payments, chaotic WhatsApp
            groups, and venue check-in bottlenecks. Orgatick unites the complete
            event lifecycle into one seamless SaaS workspace.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <LinkButton
              href="#pricing"
              size="lg"
              variant="default"
              className="h-12 px-7 text-base font-semibold shadow-lg shadow-primary/25 rounded-xl group"
            >
              <span>Launch Your Event</span>
              <IconArrowRight className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </LinkButton>
            <LinkButton
              href="#capabilities"
              size="lg"
              variant="outline"
              className="h-12 px-7 text-base font-medium rounded-xl border-border hover:bg-muted/60"
            >
              <IconBolt className="size-5 mr-2 text-primary" />
              <span>Explore Platform Capabilities</span>
            </LinkButton>
          </div>

          {/* Bullet highlights */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <IconCheck className="size-4 text-emerald-500" />
              <span>Instant Digital Tickets & QR Verification</span>
            </div>
            <div className="flex items-center gap-1.5">
              <IconCheck className="size-4 text-emerald-500" />
              <span>Automated WhatsApp & Email Updates</span>
            </div>
            <div className="flex items-center gap-1.5">
              <IconCheck className="size-4 text-emerald-500" />
              <span>Real-Time Attendance Analytics</span>
            </div>
          </div>
        </div>

        {/* Dashboard Product Preview */}
        <div className="mt-14 sm:mt-18 relative max-w-5xl mx-auto">
          {/* Decorative side pill indicators */}
          <div className="hidden lg:flex absolute -left-12 top-1/4 z-20 items-center gap-3 bg-card/90 border border-border/80 p-3 rounded-2xl shadow-xl backdrop-blur-md animate-bounce-slow">
            <div className="size-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <IconQrcode className="size-5" />
            </div>
            <div className="text-left text-xs">
              <p className="font-semibold text-foreground">QR Scanner Active</p>
              <p className="text-muted-foreground font-mono">
                1,304 scanned • 4.2s avg
              </p>
            </div>
          </div>

          <div className="hidden lg:flex absolute -right-10 bottom-1/3 z-20 items-center gap-3 bg-card/90 border border-border/80 p-3 rounded-2xl shadow-xl backdrop-blur-md">
            <div className="size-9 rounded-xl bg-emerald-600/10 flex items-center justify-center text-emerald-600">
              <IconBrandWhatsapp className="size-5" />
            </div>
            <div className="text-left text-xs">
              <p className="font-semibold text-foreground">WhatsApp Hub</p>
              <p className="text-emerald-600 font-medium">
                98.4% Broadcast Delivered
              </p>
            </div>
          </div>

          <MockupFrame
            size="small"
            className="shadow-2xl border border-primary/20 rounded-2xl overflow-hidden bg-card"
          >
            <Mockup
              type="responsive"
              className="bg-background/95 w-full rounded-xl border-0 p-1"
            >
              <Image
                src="/dashboard-mockup.png"
                alt="Orgatick Event Operating System Dashboard"
                width={1200}
                height={675}
                priority
                className="w-full h-auto rounded-lg shadow-2xl object-cover"
              />
            </Mockup>
          </MockupFrame>
          <Glow variant="center" className="opacity-40" />
        </div>

        {/* Trust Metrics Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-border/40 text-center max-w-5xl mx-auto">
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight font-mono">
              500+
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">
              College Events Hosted
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight font-mono">
              1.2M+
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">
              Digital Tickets Verified
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight font-mono">
              4.2s
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">
              Average Venue Check-In
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight font-mono">
              99.9%
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">
              Reconciliation Accuracy
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
