import { Badge } from "@orgatick/ui/components/badge";
import { Card, CardContent } from "@orgatick/ui/components/card";
import { IconUserCheck as IconOrganizer, IconUserCheck } from "@tabler/icons-react";
import * as motion from "motion/react-client";

export function UserJourneySection() {
  const attendeeSteps = [
    {
      num: "01",
      title: "Discover",
      desc: "Browse campus events matching interests and schedule.",
    },
    {
      num: "02",
      title: "Register",
      desc: "Select individual or group ticket options & submit details.",
    },
    {
      num: "03",
      title: "Pay",
      desc: "Complete payment via supported gateway with instant confirmation.",
    },
    {
      num: "04",
      title: "Receive Pass",
      desc: "Get encrypted digital ticket & QR code on WhatsApp & Email.",
    },
    {
      num: "05",
      title: "Attend & Scan",
      desc: "Present QR code at venue entrance for instant <4s scan.",
    },
    {
      num: "06",
      title: "Engage",
      desc: "Receive live schedule alerts, announcements, and certificates.",
    },
  ];

  const organizerSteps = [
    {
      num: "01",
      title: "Event Setup",
      desc: "Set up event identity, multi-day schedule, venue, and rules.",
    },
    {
      num: "02",
      title: "Configure Tickets",
      desc: "Define pricing tiers, capacity caps, group limits, and sales windows.",
    },
    {
      num: "03",
      title: "Publish & Track",
      desc: "Launch event link, track registrations, and monitor real-time sales.",
    },
    {
      num: "04",
      title: "Promote & Coupons",
      desc: "Issue referral codes, discount coupons, and track conversion sources.",
    },
    {
      num: "05",
      title: "Delegate Roles",
      desc: "Assign team members, volunteers, and gate checkers with granular access.",
    },
    {
      num: "06",
      title: "QR Entry Ops",
      desc: "Deploy phone-based QR scanners at gate turnstiles for fast entry.",
    },
    {
      num: "07",
      title: "Live Gate Analytics",
      desc: "Monitor live check-in counts, entry velocity, and venue capacity.",
    },
    {
      num: "08",
      title: "Financial Settlement",
      desc: "Review attendance reports, complete financial ledgers & issue certificates.",
    },
  ];

  return (
    <section id="lifecycle" className="py-20 md:py-28 border-b border-border/40 relative bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10">
            End-to-End Workflows
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            Designed for Both Sides of the Gate
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            A frictionless digital pass journey for attendees paired with a powerful operational command center for
            organizers.
          </p>
        </motion.div>

        {/* Journey Grid */}
        <div className="mt-16 space-y-16">
          {/* Attendee Journey */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold shrink-0">
                <IconUserCheck className="size-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">The Attendee Journey</h3>
                <p className="text-xs text-muted-foreground font-normal">Frictionless 6-Step Digital Experience</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
              {attendeeSteps.map((step) => (
                <Card
                  key={step.num}
                  className="bg-card border-border/60 p-4 rounded-xl space-y-2 relative group hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 shadow-xs"
                >
                  <CardContent className="p-0 space-y-2">
                    <span className="font-mono text-2xl font-black text-primary/30 group-hover:text-primary transition-colors duration-200 block">
                      {step.num}
                    </span>
                    <h4 className="font-bold text-sm text-foreground">{step.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Organizer Journey */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 pt-4 border-t border-border/40"
          >
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-bold shrink-0">
                <IconOrganizer className="size-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">The Organizer Operational Lifecycle</h3>
                <p className="text-xs text-muted-foreground font-normal">Full 8-Stage Command & Control System</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {organizerSteps.map((step) => (
                <Card
                  key={step.num}
                  className="bg-card border-border/60 p-5 rounded-xl space-y-2 relative group hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1 shadow-xs"
                >
                  <CardContent className="p-0 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl font-black text-indigo-500/30 group-hover:text-indigo-600 transition-colors duration-200">
                        {step.num}
                      </span>
                      <span className="size-2 rounded-full bg-indigo-500 shrink-0" />
                    </div>
                    <h4 className="font-bold text-base text-foreground">{step.title}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
