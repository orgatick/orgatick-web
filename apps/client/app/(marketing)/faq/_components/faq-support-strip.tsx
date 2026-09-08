import { Card, CardContent } from "@orgatick/ui/components/card";
import { IconArrowUpRight, IconBrandWhatsapp, IconHeadset, IconMail } from "@tabler/icons-react";
import Link from "next/link";

export function FaqSupportStrip() {
  return (
    <section className="py-8 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Card className="border-border/80 bg-muted/20 p-6 sm:p-8 rounded-2xl">
          <CardContent className="p-0 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shrink-0">
                <IconHeadset className="size-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-foreground">Still have questions?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Our event operations team is available on WhatsApp and email with &lt; 2h average response time.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="https://wa.me/918539863808?text=Hi%20Orgatick%20Team%2C%20I%20have%20a%20question%20about%20the%20platform."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700 transition-colors"
              >
                <IconBrandWhatsapp className="size-4" />
                <span>Fast-Track on WhatsApp</span>
                <IconArrowUpRight className="size-3.5" />
              </Link>

              <Link
                href="mailto:support@orgatick.in"
                className="inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-background px-4 py-2.5 text-xs sm:text-sm font-semibold text-foreground hover:bg-muted transition-colors"
              >
                <IconMail className="size-4 text-muted-foreground" />
                <span>support@orgatick.in</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
