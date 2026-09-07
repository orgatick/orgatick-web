import { SectionHeader } from "@/app/(marketing)/_components/section-header";
import { Card, CardContent } from "@orgatick/ui/components/card";
import { CORE_VALUES } from "./about-constants";

export function AboutPillars() {
  return (
    <section className="py-16 sm:py-24 border-b border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-14">
        <SectionHeader
          badge="Architectural Pillars"
          title="Engineered for Zero Failure Under Peak Load"
          description="Every component of the Orgatick stack is engineered around reliability, offline resilience, and operational security."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CORE_VALUES.map((val) => {
            const Icon = val.icon;
            return (
              <Card
                key={val.title}
                className="border-border/70 bg-card p-6 rounded-2xl flex flex-col justify-between hover:border-primary/40 transition-colors shadow-xs"
              >
                <CardContent className="p-0 space-y-4">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{val.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{val.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
