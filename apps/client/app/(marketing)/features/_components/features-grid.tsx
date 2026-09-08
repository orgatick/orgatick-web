import { SectionHeader } from "@/app/(marketing)/_components/section-header";
import { Badge } from "@orgatick/ui/components/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import { IconCheck } from "@tabler/icons-react";
import { FEATURE_MODULES } from "./features-constants";

export function FeaturesGrid() {
  return (
    <section className="py-16 sm:py-24 border-b border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-14">
        <SectionHeader
          badge="Platform Capabilities"
          title="Modular Infrastructure for Every Event Phase"
          description="Designed to eliminate friction before, during, and after your event."
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {FEATURE_MODULES.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.id}
                id={feature.id}
                className="border-border/70 bg-card p-6 sm:p-7 rounded-2xl flex flex-col justify-between hover:border-primary/40 transition-all duration-200 shadow-xs group"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-105 transition-transform">
                      <Icon className="size-6" />
                    </div>
                    <Badge variant="outline" className="text-[11px] font-mono">
                      {feature.badge}
                    </Badge>
                  </div>

                  <CardHeader className="p-0 space-y-1.5">
                    <CardTitle className="text-xl font-bold text-foreground">{feature.title}</CardTitle>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardHeader>

                  <CardContent className="p-0 pt-2 space-y-2.5 border-t border-border/40">
                    <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground pt-2">
                      Key Highlights:
                    </p>
                    <ul className="space-y-2">
                      {feature.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2 text-xs text-foreground/90">
                          <IconCheck className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </div>

                <div className="pt-5 mt-4 border-t border-border/40">
                  <span className="font-mono text-[10px] text-primary/80 font-medium truncate block">
                    {feature.techSpec}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
