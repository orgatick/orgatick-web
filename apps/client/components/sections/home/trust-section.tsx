import { Badge } from "@orgatick/ui/components/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@orgatick/ui/components/card";
import { IconStarFilled } from "@tabler/icons-react";
import * as motion from "motion/react-client";

export function TrustSection() {
  const testimonials = [
    {
      quote:
        "Orgatick completely transformed our annual tech fest. We checked in over 4,500 participants across 3 gates in less than two hours with zero entry queues or ticket disputes.",
      author: "Aarav Sharma",
      title: "Convener, Techfest 2026",
      college: "IIT Bombay",
      stat: "4,500+ Scanned Passes",
    },
    {
      quote:
        "The automated WhatsApp integration saved our team from endless manual messaging. Attendance notifications and schedule changes went out instantaneously.",
      author: "Priya Nair",
      title: "President, Cultural Committee",
      college: "BITS Pilani",
      stat: "99.2% Broadcast Delivery",
    },
    {
      quote:
        "Managing ticketing, group discounts, and financial reconciliation used to take our treasurer two weeks post-event. With Orgatick, our ledger was audited in 10 minutes.",
      author: "Rohan Verma",
      title: "Head of Operations",
      college: "DTU Delhi",
      stat: "100% Financial Accuracy",
    },
  ];

  return (
    <section className="py-20 md:py-28 border-b border-border/40 relative bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <Badge
            variant="outline"
            className="border-primary/30 text-primary bg-primary/10"
          >
            Validated on Ground
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            Trusted by Top Student Bodies & Fest Committees
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            See how leading colleges use Orgatick to replace fragmented chaos
            with streamlined event operations.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="flex"
            >
              <Card className="bg-card border-border/60 p-6 sm:p-8 rounded-2xl flex flex-col justify-between space-y-6 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 shadow-xs w-full">
                <CardHeader className="p-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-0.5 text-amber-500">
                      {["first", "second", "third", "fourth", "fifth"].map(
                        (starName) => (
                          <IconStarFilled
                            key={`${t.author}-star-${starName}`}
                            className="size-4"
                          />
                        ),
                      )}
                    </div>
                    <Badge
                      variant="outline"
                      className="text-[10px] font-mono border-emerald-500/30 text-emerald-600 bg-emerald-500/10"
                    >
                      {t.stat}
                    </Badge>
                  </div>

                  <CardContent className="p-0">
                    <p className="text-xs sm:text-sm text-foreground leading-relaxed italic">
                      "{t.quote}"
                    </p>
                  </CardContent>
                </CardHeader>

                <CardFooter className="p-0 pt-4 border-t border-border/40 flex items-center gap-3">
                  <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-foreground">
                      {t.author}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {t.title}{" "}
                      <span className="font-semibold text-primary">
                        {t.college}
                      </span>
                    </p>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
