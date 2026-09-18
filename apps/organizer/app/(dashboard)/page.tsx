import { IconCalendarStar, IconTicket, IconUsers, IconWallet } from "@tabler/icons-react";

const STATS = [
  { label: "Total events", value: "—", icon: IconCalendarStar },
  { label: "Tickets sold", value: "—", icon: IconTicket },
  { label: "Attendees", value: "—", icon: IconUsers },
  { label: "Revenue", value: "—", icon: IconWallet },
];

export default async function Home() {
  return (
    <div className="flex min-h-full w-full flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-1">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-primary">Organizer</p>
        <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Welcome back 👋</h1>
        <p className="text-sm text-muted-foreground">Here&apos;s what&apos;s happening across your organization.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex items-center gap-3.5 rounded-2xl border border-border/60 bg-card/60 p-4 shadow-xs"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="font-heading text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="truncate text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-card/30 px-6 py-16 text-center">
        <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
          <IconCalendarStar className="size-6" />
        </span>
        <h2 className="mt-4 font-heading text-lg font-semibold text-foreground">No events yet</h2>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Create your first event to start selling tickets, tracking attendees, and growing your audience.
        </p>
      </div>
    </div>
  );
}
