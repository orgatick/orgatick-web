import * as motion from "motion/react-client";
import { IconArrowUpRight, IconClock, IconMail, IconMapPin, IconMessageCircle2, IconPhone } from "@tabler/icons-react";

const channels = [
  {
    title: "Email us",
    description: "For product questions, support, and everything in between.",
    detail: "support@orgatick.in",
    href: "mailto:support@orgatick.in",
    icon: IconMail,
  },
  {
    title: "Talk to sales",
    description: "Planning a large event or evaluating Orgatick for your team?",
    detail: "+91 85398 63808",
    href: "tel:+918539863808",
    icon: IconPhone,
  },
  {
    title: "Live chat",
    description: "Get a quick answer from the team while you explore the platform.",
    detail: "Start a conversation",
    href: "mailto:support@orgatick.in?subject=Live%20chat%20request",
    icon: IconMessageCircle2,
  },
];

export function ContactDetails() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col gap-8 lg:pt-5"
    >
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Contact Orgatick</p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          A real team, ready to solve real event problems.
        </h2>
        <p className="max-w-xl leading-relaxed text-muted-foreground">
          Choose the channel that works best for you. We&apos;re available Monday through Friday, 9:00 AM–6:00 PM IST.
        </p>
      </div>

      <div className="grid gap-3">
        {channels.map(({ title, description, detail, href, icon: Icon }) => (
          <a
            key={title}
            href={href}
            className="group flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-4 shadow-xs transition-all hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-md"
          >
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
              <Icon className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{description}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                {detail}{" "}
                <IconArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>
          </a>
        ))}
      </div>

      <div className="grid gap-4 rounded-2xl border border-border/60 bg-muted/35 p-5 sm:grid-cols-2">
        <div className="flex gap-3">
          <IconClock className="mt-0.5 size-5 shrink-0 text-primary" />
          <div>
            <p className="font-semibold">Fast response</p>
            <p className="mt-1 text-sm text-muted-foreground">Most messages receive a reply in one business day.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <IconMapPin className="mt-0.5 size-5 shrink-0 text-primary" />
          <div>
            <p className="font-semibold">Based in Delhi</p>
            <p className="mt-1 text-sm text-muted-foreground">Building better event operations from India.</p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
