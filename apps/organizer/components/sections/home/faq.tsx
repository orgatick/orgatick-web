import { Badge } from "@orgatick/ui/components/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import * as motion from "motion/react-client";

export function FAQSection() {
  const faqs = [
    {
      q: "What happens if venue internet fails during gate QR check-in?",
      a: "Orgatick's mobile QR scanner application supports full offline verification mode. Passes are validated locally using encrypted cryptographic tokens and automatically synchronize with the central Redis server once connectivity is restored.",
    },
    {
      q: "How does the WhatsApp ticket delivery system work?",
      a: "Once a student completes registration or payment, Orgatick dispatches an official WhatsApp message containing their personalized digital pass, QR code, event schedule, and calendar invite automatically.",
    },
    {
      q: "Can we configure complex ticket models like Group passes and Early-Bird discounts?",
      a: "Yes! Orgatick supports free passes, paid tickets, early-bird sales windows, group team registrations, referral promo codes, and custom registration questionnaires for any event type.",
    },
    {
      q: "How does payment reconciliation and refund handling work?",
      a: "All transaction orders flow into an audited ledger system. Organizers can track revenues in real time, view split commission calculations, and process instant refunds directly from the dashboard.",
    },
    {
      q: "Can multiple team members and gate volunteers operate simultaneously?",
      a: "Absolutely. Orgatick provides role-based access control (RBAC). You can assign dedicated Gate Volunteer accounts restricted strictly to scanning passes without granting access to financial reports.",
    },
  ];

  return (
    <section id="faq" className="py-20 md:py-28 bg-muted/20 border-b border-border/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10">
            Frequently Asked Questions
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            Got Questions? We Have Answers.
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Everything you need to know about deploying Orgatick for your next college fest or
            community event.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="mt-14 space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <Card className="bg-card border-border/60 p-6 rounded-2xl space-y-2 hover:border-primary/40 transition-all duration-300 shadow-xs">
                <CardHeader className="p-0 space-y-0">
                  <CardTitle className="font-bold text-base sm:text-lg text-foreground flex items-start gap-3">
                    <span className="text-primary font-mono text-sm font-semibold mt-0.5 shrink-0">
                      0{idx + 1}.
                    </span>
                    <span>{faq.q}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 pl-8">
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
