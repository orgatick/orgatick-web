import { SectionHeader } from "@/app/(marketing)/_components/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import { PRICING_FAQS } from "./pricing-constants";

export function PricingFaq() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          badge="Billing FAQ"
          title="Frequently Asked Pricing Questions"
          description="Clear answers about fees, payouts, gateway settlements, and student discounts."
        />

        <div className="space-y-4">
          {PRICING_FAQS.map((faq, idx) => (
            <Card
              key={faq.q}
              className="border-border/70 bg-card p-6 rounded-2xl shadow-xs hover:border-primary/40 transition-colors space-y-2"
            >
              <CardHeader className="p-0">
                <CardTitle className="text-base sm:text-lg font-bold text-foreground flex items-start gap-3">
                  <span className="font-mono text-sm text-primary font-semibold shrink-0 mt-0.5">0{idx + 1}.</span>
                  <span>{faq.q}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 pl-8">
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
