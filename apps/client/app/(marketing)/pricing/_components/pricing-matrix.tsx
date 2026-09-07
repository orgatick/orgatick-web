import { SectionHeader } from "@/app/(marketing)/_components/section-header";
import { IconCheck, IconMinus } from "@tabler/icons-react";
import { Fragment } from "react";
import { PRICING_MATRIX } from "./pricing-constants";

export function PricingMatrix() {
  return (
    <section className="py-16 sm:py-24 bg-muted/15 border-b border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          badge="Feature Comparison"
          title="Compare Plans &amp; Capabilities"
          description="Everything included across tiers for event organizers, ticketing admins, and university deans."
        />

        <div className="overflow-x-auto rounded-2xl border border-border/80 bg-card shadow-xs">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-border/80 bg-muted/40">
                <th className="p-4 sm:p-5 font-bold text-foreground w-1/3">Feature</th>
                <th className="p-4 sm:p-5 font-bold text-foreground text-center">Club Starter</th>
                <th className="p-4 sm:p-5 font-bold text-primary text-center">Fest &amp; Summit Pro</th>
                <th className="p-4 sm:p-5 font-bold text-foreground text-center">University Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {PRICING_MATRIX.map((group) => (
                <Fragment key={group.category}>
                  <tr className="bg-muted/30">
                    <td
                      colSpan={4}
                      className="p-3 sm:px-5 font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      {group.category}
                    </td>
                  </tr>
                  {group.rows.map((row) => (
                    <tr key={row.name} className="hover:bg-muted/20 transition-colors">
                      <td className="p-4 sm:p-5 font-medium text-foreground">{row.name}</td>
                      <td className="p-4 sm:p-5 text-center text-xs sm:text-sm text-muted-foreground">
                        {renderCell(row.starter)}
                      </td>
                      <td className="p-4 sm:p-5 text-center text-xs sm:text-sm font-semibold text-foreground bg-primary/5">
                        {renderCell(row.pro)}
                      </td>
                      <td className="p-4 sm:p-5 text-center text-xs sm:text-sm text-muted-foreground">
                        {renderCell(row.enterprise)}
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function renderCell(val: string | boolean) {
  if (typeof val === "boolean") {
    return val ? (
      <IconCheck className="size-5 text-emerald-500 mx-auto" />
    ) : (
      <IconMinus className="size-5 text-muted-foreground/40 mx-auto" />
    );
  }
  return <span>{val}</span>;
}
