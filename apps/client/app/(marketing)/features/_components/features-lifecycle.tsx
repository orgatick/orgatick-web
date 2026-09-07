import { SectionHeader } from "@/app/(marketing)/_components/section-header";
import { Card, CardContent } from "@orgatick/ui/components/card";

const LIFECYCLE_STEPS = [
  {
    step: "01",
    title: "Configure & Launch",
    description:
      "Design custom registration forms, set early-bird quotas, and publish your branded event link in minutes.",
  },
  {
    step: "02",
    title: "Automate Pass Delivery",
    description:
      "As tickets are booked, attendees instantly receive encrypted digital passes with calendar invites via WhatsApp & email.",
  },
  {
    step: "03",
    title: "Sub-Second Gate Entry",
    description:
      "Equip volunteers with our offline scanner app to verify hundreds of passes per minute with zero double-entry fraud.",
  },
  {
    step: "04",
    title: "Settle & Certify",
    description:
      "Track audited financial revenue, process direct bank payouts, and dispatch digitally verified certificates automatically.",
  },
];

export function FeaturesLifecycle() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          badge="Event Lifecycle"
          title="From Pre-Event Launch to Post-Event Settlement"
          description="How the Orgatick operational pipeline coordinates every step of your event."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LIFECYCLE_STEPS.map((step) => (
            <Card
              key={step.step}
              className="border-border/70 bg-card p-6 rounded-2xl relative shadow-xs hover:border-primary/40 transition-colors space-y-3"
            >
              <CardContent className="p-0 space-y-3">
                <span className="font-mono text-3xl font-extrabold text-primary">{step.step}</span>
                <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
