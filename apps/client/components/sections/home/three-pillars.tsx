import { Badge } from "@orgatick/ui/components/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@orgatick/ui/components/card";
import {
  IconAdjustmentsHorizontal,
  IconArrowRight,
  IconChartBar,
  IconCompass,
} from "@tabler/icons-react";
import * as motion from "motion/react-client";

export function ThreePillarsSection() {
  const pillars = [
    {
      id: "discover",
      badge: "Stage 01",
      title: "Discover & Register",
      tagline: "Frictionless Attendee Experience",
      icon: IconCompass,
      color: "from-blue-500 to-indigo-600",
      lightBg: "bg-blue-500/10 text-blue-600",
      borderColor: "border-blue-500/30",
      features: [
        {
          label: "Find Events",
          desc: "Discover curated campus hackathons, cultural fests, and tech workshops.",
        },
        {
          label: "Seamless Registration",
          desc: "Custom forms for individual participants or multi-member team rosters.",
        },
        {
          label: "Receive Instant Updates",
          desc: "Automated ticket delivery to WhatsApp and email with digital calendar sync.",
        },
      ],
      flowSteps: [
        "Browse Catalog",
        "Select Ticket Tier",
        "Instant Pass Issued",
      ],
    },
    {
      id: "operate",
      badge: "Stage 02",
      title: "Operate & Verify",
      tagline: "Total Organizer Command",
      icon: IconAdjustmentsHorizontal,
      color: "from-purple-500 to-indigo-600",
      lightBg: "bg-purple-500/10 text-purple-600",
      borderColor: "border-purple-500/30",
      features: [
        {
          label: "Create & Configure",
          desc: "Set up multi-session schedules, pricing tiers, coupons, and sales windows.",
        },
        {
          label: "Sell Tickets & Payments",
          desc: "Support for free, paid, group, referral, and early-bird ticket models.",
        },
        {
          label: "QR Venue Verification",
          desc: "Sub-second camera scanning with anti-fraud duplicate detection & offline mode.",
        },
      ],
      flowSteps: ["Publish Event", "Manage Sales Windows", "Venue QR Scan"],
    },
    {
      id: "measure",
      badge: "Stage 03",
      title: "Measure & Analyze",
      tagline: "Data-Driven Event Insights",
      icon: IconChartBar,
      color: "from-emerald-500 to-teal-600",
      lightBg: "bg-emerald-500/10 text-emerald-600",
      borderColor: "border-emerald-500/30",
      features: [
        {
          label: "Track Registrations",
          desc: "Monitor ticket sales conversion rates and live capacity utilization.",
        },
        {
          label: "Analyze Attendance",
          desc: "Real-time gate check-in speeds, peak entrance hours, and attendance ratios.",
        },
        {
          label: "Understand Performance",
          desc: "Generate financial ledgers, commission splits, and automated participation certificates.",
        },
      ],
      flowSteps: [
        "Live Metrics Stream",
        "Financial Ledger",
        "Audit Report Export",
      ],
    },
  ];

  return (
    <section
      id="solutions"
      className="py-20 md:py-28 border-b border-border/40 relative bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <Badge
            variant="outline"
            className="border-primary/30 text-primary bg-primary/10"
          >
            Core Architecture
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            Discover. Operate. Measure.
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Orgatick positions itself as the operational layer connecting every
            activity from attendee discovery to post-event financial reporting.
          </p>
        </motion.div>

        {/* 3 Pillars Grid with Motion Stagger */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="flex"
              >
                <Card
                  className={`relative flex flex-col justify-between w-full border ${pillar.borderColor} shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 group overflow-hidden bg-card`}
                >
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${pillar.color}`}
                  />

                  <CardHeader className="space-y-4 pt-6">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs font-mono">
                        {pillar.badge}
                      </Badge>
                      <div
                        className={`size-12 rounded-2xl ${pillar.lightBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shrink-0`}
                      >
                        <Icon className="size-6" />
                      </div>
                    </div>

                    <div>
                      <CardTitle className="text-2xl font-bold text-foreground">
                        {pillar.title}
                      </CardTitle>
                      <CardDescription className="text-xs font-medium text-primary mt-1">
                        {pillar.tagline}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6 pt-2 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      {pillar.features.map((feat) => (
                        <div key={feat.label} className="space-y-1">
                          <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                            <span className="size-1.5 rounded-full bg-primary shrink-0" />
                            {feat.label}
                          </p>
                          <p className="text-xs text-muted-foreground leading-relaxed pl-3.5">
                            {feat.desc}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Flow Pills */}
                    <div className="pt-4 border-t border-border/40">
                      <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider mb-2 font-semibold">
                        Workflow Sequence
                      </p>
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                        {pillar.flowSteps.map((step, stepIdx) => (
                          <span
                            key={step}
                            className="flex items-center gap-1 bg-muted/60 px-2 py-1 rounded-md text-foreground font-medium transition-colors duration-200 hover:bg-muted"
                          >
                            {step}
                            {stepIdx < pillar.flowSteps.length - 1 && (
                              <IconArrowRight className="size-3 text-muted-foreground ml-0.5 shrink-0" />
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
