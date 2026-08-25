import { IconBulb, IconCheck } from "@tabler/icons-react";
import { Card, CardContent } from "@orgatick/ui/components/card";

interface PlainEnglishSummaryProps {
  bullets: string[];
}

export function PlainEnglishSummary({ bullets }: PlainEnglishSummaryProps) {
  return (
    <Card className="border-accent/30 bg-linear-to-br from-accent/5 via-card to-primary/5 shadow-xs overflow-hidden">
      <CardContent className="p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2 text-primary font-semibold text-sm sm:text-base">
          <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <IconBulb className="size-4" />
          </div>
          <span>Summary in Plain English (TL;DR)</span>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-muted-foreground">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2 rounded-xl bg-background/80 p-3 border border-border/50">
              <IconCheck className="size-4 text-emerald-500 shrink-0 mt-0.5" />
              <span className="leading-snug text-foreground/90">{bullet}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
