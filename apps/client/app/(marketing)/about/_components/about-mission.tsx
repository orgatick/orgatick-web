import { Card, CardContent } from "@orgatick/ui/components/card";
import { IconAlertTriangle, IconChecklist, IconShieldCheck, IconX } from "@tabler/icons-react";

export function AboutMission() {
  return (
    <section className="py-16 sm:py-24 border-b border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
            The Problem We Solved
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Why Generic Forms &amp; Ticketing Platforms Fail at the Gate
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Organizing large-scale events has historically meant juggling disconnected spreadsheets, manual UPI
            verifications, and frantic volunteer coordination when the gate turns into a bottleneck.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* The Broken Way */}
          <Card className="border-destructive/30 bg-destructive/5 p-6 sm:p-8 rounded-2xl relative overflow-hidden">
            <div className="flex items-center gap-3 pb-6 border-b border-destructive/20">
              <div className="flex size-10 items-center justify-center rounded-xl bg-destructive/15 text-destructive">
                <IconAlertTriangle className="size-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">The Fragile Legacy Approach</h3>
                <p className="text-xs text-muted-foreground">Google Forms, UPI screenshots, and printed lists</p>
              </div>
            </div>

            <CardContent className="p-0 pt-6 space-y-3.5 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <IconX className="size-4 text-destructive shrink-0 mt-0.5" />
                <span>Long, frustrated queues at entrance gates due to manual name searching.</span>
              </div>
              <div className="flex items-start gap-3">
                <IconX className="size-4 text-destructive shrink-0 mt-0.5" />
                <span>Counterfeit entries caused by forwarded screenshots and duplicate passes.</span>
              </div>
              <div className="flex items-start gap-3">
                <IconX className="size-4 text-destructive shrink-0 mt-0.5" />
                <span>Hours spent manually reconciling bank statements against registrant lists.</span>
              </div>
              <div className="flex items-start gap-3">
                <IconX className="size-4 text-destructive shrink-0 mt-0.5" />
                <span>Total chaos when venue mobile signals drop and online scanners fail.</span>
              </div>
            </CardContent>
          </Card>

          {/* The Orgatick OS Way */}
          <Card className="border-primary/40 bg-primary/5 p-6 sm:p-8 rounded-2xl relative overflow-hidden ring-1 ring-primary/20">
            <div className="flex items-center gap-3 pb-6 border-b border-primary/20">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/20 text-primary">
                <IconShieldCheck className="size-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">The Orgatick Operating System</h3>
                <p className="text-xs text-muted-foreground">Deterministic, cryptographically secure event tech</p>
              </div>
            </div>

            <CardContent className="p-0 pt-6 space-y-3.5 text-sm text-foreground">
              <div className="flex items-start gap-3">
                <IconChecklist className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Sub-second QR gate scanning with instant visual &amp; audio feedback.</span>
              </div>
              <div className="flex items-start gap-3">
                <IconChecklist className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Zero gate stoppage with offline-first token verification on volunteer devices.</span>
              </div>
              <div className="flex items-start gap-3">
                <IconChecklist className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Instant automated WhatsApp pass delivery with live schedule updates.</span>
              </div>
              <div className="flex items-start gap-3">
                <IconChecklist className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Audited double-entry financial ledger with instant split payouts.</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
