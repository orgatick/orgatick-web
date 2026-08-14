import { IconBriefcase, IconBuildingCommunity, IconUser, IconUsers } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function PersonaMatrixSection() {
  const personas = [
    {
      role: "Attendee",
      icon: IconUser,
      color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      needs: "Discover events, register in 2 clicks, pay securely, receive digital passes instantly, enjoy <4s venue check-in.",
      value: "Frictionless digital journey with calendar integration and real-time event alerts on WhatsApp.",
    },
    {
      role: "Event Organizer",
      icon: IconBriefcase,
      color: "bg-purple-500/10 text-purple-600 border-purple-500/20",
      needs: "Configure ticket tiers, manage capacity windows, collect payments, dispatch WhatsApp updates, and track live check-in progress.",
      value: "Centralized operational workspace eliminating 5 separate tool handoffs and manual spreadsheet reconciliation.",
    },
    {
      role: "Team Member / Volunteer",
      icon: IconUsers,
      color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      needs: "Scan QR tickets at gate entrances, handle manual fallback check-in, monitor gate queues, and assist attendees.",
      value: "Role-based operational mobile interface with real-time sync and anti-duplicate pass validation.",
    },
    {
      role: "Campus Organization",
      icon: IconBuildingCommunity,
      color: "bg-amber-500/10 text-amber-600 border-amber-500/20",
      needs: "Manage multiple college events throughout the academic year, oversee club budgets, standardise ticketing, and track alumni metrics.",
      value: "Reusable enterprise SaaS infrastructure with institutional compliance, financial ledgers, and team governance.",
    },
  ];

  return (
    <section className="py-20 md:py-28 border-b border-border/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10">
            Stakeholder Value Matrix
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">Tailored Power for Every Role</h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Whether you are a student attendee, a fest president, a gate volunteer, or a university dean, Orgatick provides customized interfaces for your
            needs.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {personas.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.role} className="bg-card border border-border/60 p-6 rounded-2xl space-y-4 hover:border-primary/40 transition-colors shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`size-11 rounded-xl flex items-center justify-center ${item.color}`}>
                      <Icon className="size-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-foreground">{item.role}</h3>
                      <p className="text-xs text-muted-foreground font-mono">Primary Ecosystem Actor</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="bg-muted/40 p-3.5 rounded-xl border border-border/40 space-y-1">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">Primary Operational Needs</p>
                    <p className="text-xs sm:text-sm text-foreground leading-relaxed">{item.needs}</p>
                  </div>

                  <div className="bg-primary/5 p-3.5 rounded-xl border border-primary/20 space-y-1">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-primary font-semibold">Orgatick Platform Value</p>
                    <p className="text-xs sm:text-sm font-medium text-foreground leading-relaxed">{item.value}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
