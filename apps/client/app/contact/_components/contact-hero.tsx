import * as motion from "motion/react-client";
import { Badge } from "@orgatick/ui/components/badge";
import { IconHeadset } from "@tabler/icons-react";

export function ContactHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border/50 bg-muted/20 py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_90%_at_12%_0%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_70%)]" />
      <div className="pointer-events-none absolute -right-32 top-12 -z-10 size-96 rounded-full bg-primary/10 blur-3xl" />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="mx-auto flex max-w-7xl flex-col gap-5 px-4 text-center sm:px-6 lg:px-8"
      >
        <Badge
          variant="outline"
          className="mx-auto w-fit border-primary/25 bg-background/70 px-3 py-1 text-primary shadow-xs backdrop-blur"
        >
          <IconHeadset className="size-3.5" />
          Here when you need us
        </Badge>
        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-balance sm:text-6xl">
          Let&apos;s make your next event <span className="text-primary">unforgettable.</span>
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Whether you&apos;re hosting your first campus fest or running a high-volume event, the Orgatick team is ready
          to help.
        </p>
      </motion.div>
    </section>
  );
}
