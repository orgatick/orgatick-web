export function FeaturesHero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-border/40">
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.12]">
          Everything You Need to Host Resilient, High-Volume Events
        </h1>

        <p className="mx-auto max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          From custom multi-tier registration forms to sub-second offline gate scanners, audited ledgers, and instant
          WhatsApp pass delivery.
        </p>

        {/* Feature quick badges */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono text-muted-foreground">
          <span className="rounded-lg border border-border/70 bg-card px-3 py-1.5 font-semibold text-foreground">
            ✓ Offline QR Scanner
          </span>
          <span className="rounded-lg border border-border/70 bg-card px-3 py-1.5 font-semibold text-foreground">
            ✓ WhatsApp Web API
          </span>
          <span className="rounded-lg border border-border/70 bg-card px-3 py-1.5 font-semibold text-foreground">
            ✓ Multi-Gate Live Sync
          </span>
          <span className="rounded-lg border border-border/70 bg-card px-3 py-1.5 font-semibold text-foreground">
            ✓ Automated Certificates
          </span>
        </div>
      </div>
    </section>
  );
}
