import { Badge } from "@orgatick/ui/components/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@orgatick/ui/components/card";
import {
  IconBrandWhatsapp,
  IconCalendarEvent,
  IconChartDots,
  IconQrcode,
  IconUsersGroup,
  IconWallet,
} from "@tabler/icons-react";
import * as motion from "motion/react-client";

export function CapabilitiesGrid() {
  const capabilities = [
    {
      icon: IconCalendarEvent,
      title: "Event Lifecycle Engine",
      category: "Management",
      description:
        "Complete control from drafting to post-event reporting. Configure event info, session schedules, ticket pricing, custom registration fields, sales windows, and capacity caps.",
      highlights: [
        "Free, Paid, Individual & Group Passes",
        "Capacity & Ticket-Sales Windows",
        "Custom Form Fields & Team Rosters",
        "Multi-day Session Schedules",
      ],
      badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    },
    {
      icon: IconQrcode,
      title: "Digital Ticketing & QR Verification",
      category: "Operations",
      description:
        "Cryptographically verified digital tickets issued instantly upon registration. Organizers use camera-based venue scanners for entry validation and duplicate prevention.",
      highlights: [
        "Sub-second Camera QR Scanning",
        "Duplicate Entry & Screenshot Prevention",
        "Manual Fallback Check-in Support",
        "Live Attendance Velocity Counters",
      ],
      badgeColor: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    },
    {
      icon: IconWallet,
      title: "Payments & Financial Ledger",
      category: "Finance",
      description:
        "Integrated payment gateways with instant reconciliation. Supports multi-channel payments, coupon discounts, organizer wallet accounting, platform commissions, and automated refunds.",
      highlights: [
        "Multiple Gateway Integrations",
        "Organizer Wallet & Split Ledgers",
        "Coupons, Discounts & Referrals",
        "Automated Refund Workflow",
      ],
      badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    },
    {
      icon: IconBrandWhatsapp,
      title: "Multi-Channel Communication Hub",
      category: "Engagement",
      description:
        "Keep attendees informed before, during, and after the event. Dispatch automated ticket passes, schedule updates, emergency venue alerts, and targeted broadcasts via WhatsApp and Email.",
      highlights: [
        "Official WhatsApp API Integration",
        "Targeted Participant Segmenting",
        "Schedule Change Notifications",
        "Post-event Feedback & Certificates",
      ],
      badgeColor: "bg-green-500/10 text-green-600 border-green-500/20",
    },
    {
      icon: IconChartDots,
      title: "Venue & Operational Analytics",
      category: "Analytics",
      description:
        "Turn raw participant activity into actionable operational intelligence. Monitor registration velocity, revenue breakdowns, gate check-in heatmaps, and referral conversion trees.",
      highlights: [
        "Real-Time Gate Attendance Stream",
        "Revenue & Sales Conversion Charts",
        "Referral & Coupon Performance",
        "Exportable PDF/Excel Reports",
      ],
      badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    },
    {
      icon: IconUsersGroup,
      title: "Organization & Multi-Event Controls",
      category: "Infrastructure",
      description:
        "Built for college clubs, student councils, and university departments. Manage multiple events simultaneously, delegate granular volunteer roles, and maintain reusable event templates.",
      highlights: [
        "Role-Based Access (Admin/Volunteer/Check-in)",
        "Reusable Event & Email Templates",
        "Multi-Event Campus Hub",
        "Audit Trail & Action Logs",
      ],
      badgeColor: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
    },
  ];

  return (
    <section
      id="capabilities"
      className="py-20 md:py-28 bg-muted/20 border-b border-border/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
            Platform Capabilities
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            Engineered for the Full Event Spectrum
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Orgatick is not merely an event listing page. It provides the deep
            backend systems required to manage registrations, money, entry
            gates, communication, and insights.
          </p>
        </motion.div>

        {/* 6 Capabilities Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex"
              >
                <Card className="bg-card border-border/60 shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group w-full">
                  <CardHeader className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0">
                        <Icon className="size-6" />
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-[11px] font-semibold ${cap.badgeColor}`}
                      >
                        {cap.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground">
                      {cap.title}
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {cap.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-2">
                    <div className="space-y-2 border-t border-border/40 pt-4">
                      {cap.highlights.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 text-xs font-medium text-foreground"
                        >
                          <div className="size-1.5 rounded-full bg-primary shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
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
