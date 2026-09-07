import { SectionHeader } from "@/app/(marketing)/_components/section-header";
import { COMPARISON_ROWS } from "./features-constants";

export function FeaturesComparison() {
  return (
    <section className="py-16 sm:py-24 bg-muted/15 border-b border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          badge="Why Orgatick"
          title="Orgatick vs Traditional Alternatives"
          description="See why universities and flagship summits transition from fragmented tools to Orgatick."
        />

        <div className="overflow-x-auto rounded-2xl border border-border/80 bg-card shadow-xs">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-border/80 bg-muted/40">
                <th className="p-4 sm:p-5 font-bold text-foreground w-1/4">Operational Area</th>
                <th className="p-4 sm:p-5 font-bold text-muted-foreground">Google Forms + UPI</th>
                <th className="p-4 sm:p-5 font-bold text-muted-foreground">Legacy Event Sites</th>
                <th className="p-4 sm:p-5 font-bold text-primary bg-primary/5">Orgatick</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.feature} className="hover:bg-muted/20 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-foreground">{row.feature}</td>
                  <td className="p-4 sm:p-5 text-xs sm:text-sm text-destructive/80 font-medium">{row.googleForms}</td>
                  <td className="p-4 sm:p-5 text-xs sm:text-sm text-muted-foreground">{row.legacyPlatforms}</td>
                  <td className="p-4 sm:p-5 text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-primary/5">
                    {row.orgatick}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
