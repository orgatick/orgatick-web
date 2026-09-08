import { SectionHeader } from "@/app/(marketing)/_components/section-header";
import { Badge } from "@orgatick/ui/components/badge";
import { TIMELINE_MILESTONES } from "./about-constants";

export function AboutTimeline() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          badge="Our Journey"
          title="From Campus Hackathons to National Scale"
          description="How an operational nightmare at an engineering college fest turned into the definitive platform for events."
        />

        <div className="relative border-l border-border/80 pl-6 sm:pl-8 ml-4 sm:ml-6 space-y-10">
          {TIMELINE_MILESTONES.map((item) => (
            <div key={item.year} className="relative group">
              {/* Bullet node */}
              <div className="absolute left-[-31px] sm:-left-[39px] top-1 flex size-5 items-center justify-center rounded-full bg-background border-2 border-primary ring-4 ring-background" />

              <div className="space-y-2">
                <Badge variant="outline" className="font-mono text-xs font-bold text-primary">
                  {item.year}
                </Badge>
                <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
