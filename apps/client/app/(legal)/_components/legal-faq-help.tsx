import { IconMail, IconShieldQuestion } from "@tabler/icons-react";
import { Card, CardContent } from "@orgatick/ui/components/card";

export function LegalFaqHelp() {
  return (
    <Card className="border-border/70 bg-linear-to-r from-card via-muted/30 to-card shadow-xs overflow-hidden">
      <CardContent className="p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-primary font-semibold text-sm">
            <IconShieldQuestion className="size-5" />
            <span>Have Questions About Our Legal Policies?</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We believe in complete transparency. If any clause or condition is unclear, reach out to our team anytime.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="mailto:support@orgatick.in"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all hover:scale-[1.02]"
          >
            <IconMail className="size-4" />
            <span>Contact Support</span>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
