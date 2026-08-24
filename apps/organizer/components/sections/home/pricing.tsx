import { LinkButton } from "@/components/ui/link-button";
import { Badge } from "@orgatick/ui/components/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import { IconArrowRight, IconCheck, IconSparkles } from "@tabler/icons-react";
import * as motion from "motion/react-client";

export function PricingSection() {
  const plans = [
    {
      name: "Club Starter",
      badge: "For Student Clubs",
      price: "Free",
      period: "for free events",
      fee: "+ 2% on paid tickets",
      description:
        "Everything needed to host student workshops, webinars, and single-session club meetups.",
      features: [
        "Up to 500 Attendees per event",
        "Digital Ticket Pass Generation",
        "Basic QR Gate Entry Verification",
        "Email Ticket Delivery",
        "Export Registrations to CSV",
        "Standard Payment Gateway",
      ],
      ctaText: "Start Free Event",
      ctaVariant: "outline" as const,
      highlighted: false,
    },
    {
      name: "Fest & Summit Pro",
      badge: "Most Popular for Flagship Fests",
      price: "$49",
      period: "per flagship event",
      fee: "+ 1.5% low transaction fee",
      description:
        "The complete operational stack for college hackathons, cultural carnivals, and tech summits.",
      features: [
        "Unlimited Attendees & Custom Capacity",
        "Official WhatsApp API Announcements",
        "Sub-second Offline QR Scanners",
        "Multi-Tier & Group Registration",
        "Coupon, Referral & Early-Bird Engine",
        "Role-Based Access for Gate Volunteers",
        "Live Attendance Velocity Dashboard",
        "Automated PDF Certificates",
      ],
      ctaText: "Get Pro Fest Pass",
      ctaVariant: "default" as const,
      highlighted: true,
    },
    {
      name: "University Enterprise",
      badge: "Campus-Wide SaaS",
      price: "Custom",
      period: "annual university plan",
      fee: "volume-based pricing",
      description:
        "Dedicated SaaS infrastructure for University Dean offices, managing 100+ campus events annually.",
      features: [
        "Unlimited Events & Student Bodies",
        "Custom Institutional SSO / SAML",
        "Dedicated Organizer Wallets",
        "PostgreSQL Financial Audit Ledger",
        "99.99% Guaranteed SLA Uptime",
        "Custom Payment Gateway Integration",
        "On-Ground Technical Support Team",
        "Alumni & Career Fair Tracking",
      ],
      ctaText: "Contact Institutional Sales",
      ctaVariant: "outline" as const,
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 bg-muted/20 border-b border-border/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10">
            Transparent SaaS Pricing
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            Simple Plans for Every College Event Scale
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            No hidden setup costs or manual reconciliation pain. Pay only for the operational
            capabilities your event demands.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="flex"
            >
              <Card
                className={`relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl transition-all duration-300 bg-card border w-full ${
                  plan.highlighted
                    ? "border-primary/60 shadow-2xl shadow-primary/15 ring-2 ring-primary/20 scale-[1.02] hover:scale-[1.04]"
                    : "border-border/60 hover:border-border hover:-translate-y-1 shadow-md"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-linear-to-r from-primary to-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md flex items-center gap-1 z-10 shrink-0">
                    <IconSparkles className="size-3.5" />
                    <span>RECOMMENDED FOR COLLEGE FESTS</span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Title & Badge */}
                  <CardHeader className="p-0 space-y-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl font-bold text-foreground">
                        {plan.name}
                      </CardTitle>
                      <Badge variant="outline" className="text-[11px] font-mono">
                        {plan.badge}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed font-normal">
                      {plan.description}
                    </p>
                  </CardHeader>

                  {/* Price Display */}
                  <div className="space-y-1 pb-4 border-b border-border/40">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-extrabold text-foreground font-mono">
                        {plan.price}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">
                        {plan.period}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-primary font-medium">{plan.fee}</p>
                  </div>

                  {/* Features List */}
                  <CardContent className="p-0 space-y-3">
                    <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                      Included Operational Tools:
                    </p>
                    <ul className="space-y-2.5">
                      {plan.features.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground"
                        >
                          <IconCheck className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </div>

                {/* Card Footer CTA */}
                <CardFooter className="p-0 pt-8 mt-6 border-t border-border/40">
                  <LinkButton
                    href="#"
                    variant={plan.ctaVariant}
                    size="lg"
                    className={`w-full h-11 font-semibold rounded-xl transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                      plan.highlighted ? "shadow-lg shadow-primary/25" : ""
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <IconArrowRight className="size-4 ml-1.5 shrink-0" />
                  </LinkButton>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
