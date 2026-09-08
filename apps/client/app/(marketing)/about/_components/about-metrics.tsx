import { Card, CardContent } from "@orgatick/ui/components/card";
import { ABOUT_METRICS } from "./about-constants";

export function AboutMetrics() {
  return (
    <section className="py-16 sm:py-20 bg-muted/20 border-b border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT_METRICS.map((metric) => (
            <Card
              key={metric.label}
              className="border-border/70 bg-card p-6 rounded-2xl shadow-xs transition-transform hover:-translate-y-1"
            >
              <CardContent className="p-0 space-y-2">
                <div className="font-mono text-3xl sm:text-4xl font-extrabold tracking-tight text-primary">
                  {metric.value}
                </div>
                <div className="font-bold text-base text-foreground">{metric.label}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{metric.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
