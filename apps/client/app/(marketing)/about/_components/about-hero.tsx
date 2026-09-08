import { Badge } from "@orgatick/ui/components/badge";

export function AboutHero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-border/40">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl max-w-4xl mx-auto leading-[1.12]">
          Built for High-Stakes Gates and Seamless Event Operations
        </h1>

        <p className="mx-auto max-w-3xl text-base sm:text-xl text-muted-foreground leading-relaxed">
          Orgatick is the mission-critical event operating system engineered to eliminate gate queues, fake paper
          passes, spreadsheet chaos, and payout delays for universities, student bodies, and summits.
        </p>

        {/* Quick Highlights */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm font-medium text-foreground">
          <Badge>Sub-second QR entry</Badge>
          <Badge>WhatsApp pass delivery</Badge>
          <Badge>Offline cryptographic sync</Badge>
          <Badge>Zero-error financial ledgers</Badge>
        </div>
      </div>
    </section>
  );
}
