import { IconAlertTriangle, IconCheck, IconSparkles, IconX } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
export function ProblemSolutionSection() {
  const problems = [
    {
      title: "Scattered Participant Data",
      description: "Data split between Google Forms, spreadsheets, and banking apps. Reconciling ticket types with payments takes hours of manual work.",
    },
    {
      title: "Venue Verification Bottlenecks",
      description: "Paper lists and Excel checks cause long queues at entry gates. Vulnerable to duplicate screenshots, fake passes, and entry fraud.",
    },
    {
      title: "Fragmented Announcements",
      description: "Urgent schedule updates or venue changes fail to reach participants when relying on informal WhatsApp groups or general email blasts.",
    },
    {
      title: "Zero Post-Event Analytics",
      description: "Once the fest ends, valuable attendee insights, referral metrics, and turnover figures disappear into forgotten spreadsheets.",
    },
  ];

  const solutions = [
    {
      title: "Unified Single Source of Truth",
      description: "Every ticket tier, registration, referral code, and payment transaction updates in one real-time dashboard automatically.",
    },
    {
      title: "Cryptographic QR Check-in System",
      description: "Scan digital passes in <4 seconds with offline-capable QR validation. Prevents duplicate entry and tracks venue check-in speed.",
    },
    {
      title: "Targeted Multi-Channel Communication",
      description: "Dispatch urgent announcements directly via official WhatsApp API and email templates based on ticket type or attendance status.",
    },
    {
      title: "Actionable Venue & Financial Insights",
      description: "Automated real-time reports on sales windows, peak check-in times, referral conversions, and complete ledger reconciliation.",
    },
  ];

  return (
    <section id="problem" className="py-20 md:py-28 bg-muted/30 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="outline" className="border-destructive/30 text-destructive bg-destructive/10">
            <IconAlertTriangle className="size-3.5 mr-1" />
            The Operational Reality
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">Stop Juggling 5 Tools for One College Event</h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            College events are operationally complex even when they look simple to attendees. Orgatick eliminates manual operational handoffs and unites the
            complete workflow.
          </p>
        </div>

        {/* Side-by-side comparison grid */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Legacy Broken Workflow */}
          <div className="rounded-2xl border border-destructive/20 bg-card/60 p-6 sm:p-8 relative overflow-hidden shadow-sm">
            <div className="flex items-center justify-between pb-6 border-b border-border/40">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center">
                  <IconX className="size-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">The Fragmented Chaos</h3>
                  <p className="text-xs text-muted-foreground">Legacy Multi-Tool Handoffs</p>
                </div>
              </div>
              <Badge variant="destructive" className="text-xs">
                High Friction
              </Badge>
            </div>

            <div className="mt-6 space-y-6">
              {problems.map((prob) => (
                <div key={prob.title} className="flex gap-4 items-start">
                  <div className="size-6 rounded-full bg-destructive/15 text-destructive flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-bold">
                    ✕
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">{prob.title}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 leading-relaxed">{prob.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Orgatick Unified Platform */}
          <div className="rounded-2xl border border-primary/40 bg-card p-6 sm:p-8 relative overflow-hidden shadow-lg shadow-primary/5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between pb-6 border-b border-border/40">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-md shadow-primary/30">
                  <IconSparkles className="size-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">The Orgatick Standard</h3>
                  <p className="text-xs text-muted-foreground">Unified SaaS Operating System</p>
                </div>
              </div>
              <Badge variant="default" className="text-xs bg-emerald-600 hover:bg-emerald-700">
                Zero Friction
              </Badge>
            </div>

            <div className="mt-6 space-y-6">
              {solutions.map((sol) => (
                <div key={sol.title} className="flex gap-4 items-start">
                  <div className="size-6 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <IconCheck className="size-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">{sol.title}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 leading-relaxed">{sol.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
