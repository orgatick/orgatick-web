"use client";

import { LinkButton } from "@/components/ui/link-button";
import { Badge } from "@orgatick/ui/components/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import { IconArrowRight, IconCheck } from "@tabler/icons-react";
import { useState } from "react";
import { PRICING_PLANS } from "./pricing-constants";

export function PricingCards() {
  const [billingCycle, setBillingCycle] = useState<"event" | "annual">("event");

  return (
    <section className="py-16 sm:py-24 border-b border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Interactive Billing Mode Switcher */}
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="inline-flex items-center rounded-2xl border border-border/80 bg-muted/40 p-1.5 shadow-inner">
            <button
              type="button"
              onClick={() => setBillingCycle("event")}
              className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                billingCycle === "event"
                  ? "bg-background text-foreground shadow-sm ring-1 ring-border/50"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Per-Event Pass
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("annual")}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                billingCycle === "annual"
                  ? "bg-background text-foreground shadow-sm ring-1 ring-border/50"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>Annual Campus Pass</span>
              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                Save 25%
              </span>
            </button>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            {billingCycle === "event"
              ? "Pay per individual festival or summit with no recurring commitments."
              : "Unlimited events across all student bodies, clubs, and campus departments."}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const price = billingCycle === "event" ? plan.pricePerEvent : plan.priceAnnual;
            const period = billingCycle === "event" ? plan.periodPerEvent : plan.periodAnnual;

            return (
              <Card
                key={plan.id}
                className={`relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl transition-all duration-300 bg-card border ${
                  plan.popular
                    ? "border-primary/60 shadow-2xl shadow-primary/10 ring-2 ring-primary/20 lg:-translate-y-2"
                    : "border-border/70 hover:border-border/90 shadow-sm hover:shadow-md"
                }`}
              >
                {/* Popular Pill */}
                {plan.popular && (
                  <div className="absolute top-[-3.5] left-1/2 items-center -translate-x-1/2 bg-linear-to-r from-primary to-indigo-600 text-primary-foreground text-xs font-bold px-4 py-1 rounded-full shadow-lg shadow-primary/25 flex gap-1.5 z-10 shrink-0">
                    <span>RECOMMENDED FOR FESTS</span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Card Header */}
                  <CardHeader className="p-0 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <CardTitle className="text-2xl font-bold tracking-tight text-foreground">{plan.name}</CardTitle>
                      <Badge variant="outline" className="text-[11px] font-mono shrink-0">
                        {plan.badge}
                      </Badge>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{plan.tagline}</p>
                  </CardHeader>

                  {/* Pricing Display */}
                  <div className="space-y-2 rounded-2xl border border-border/60 bg-muted/20 p-4">
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-4xl font-extrabold tracking-tight text-foreground">{price}</span>
                      <span className="text-xs text-muted-foreground font-medium">{period}</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-mono font-medium text-primary">
                      <span>{plan.fee}</span>
                    </div>
                  </div>

                  {/* Feature List */}
                  <CardContent className="p-0 space-y-3 pt-2">
                    <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-bold">
                      Included Capabilities:
                    </p>
                    <ul className="space-y-3">
                      {plan.features.map((feat) => (
                        <li key={feat.text} className="flex items-start justify-between gap-2 text-xs sm:text-sm">
                          <div className="flex items-start gap-2.5">
                            <div className="flex size-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                              <IconCheck className="size-3.5 font-bold" />
                            </div>
                            <span className={feat.highlight ? "font-semibold text-foreground" : "text-foreground/80"}>
                              {feat.text}
                            </span>
                          </div>
                          {feat.tag && (
                            <span className="rounded-md border border-border/80 bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground shrink-0">
                              {feat.tag}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </div>

                {/* Card CTA */}

                <LinkButton
                  href={plan.ctaHref}
                  variant={plan.ctaVariant}
                  size="lg"
                  className={`w-full  font-semibold rounded-xl text-sm transition-all hover:scale-[1.01] active:scale-[0.99] ${
                    plan.popular ? "shadow-lg shadow-primary/25 bg-primary text-primary-foreground" : "border-border/80"
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <IconArrowRight className="size-4 ml-1.5 shrink-0" />
                </LinkButton>
              </Card>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-medium text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            No credit card required for free events
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Instant WhatsApp &amp; scanner activation
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Direct automated bank settlement
          </span>
        </div>
      </div>
    </section>
  );
}
