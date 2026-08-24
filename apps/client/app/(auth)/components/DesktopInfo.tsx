function DesktopInfo() {
  return (
    <div className="relative hidden lg:flex lg:flex-col lg:justify-between lg:overflow-hidden lg:border-r lg:border-border/60 lg:bg-linear-to-br lg:from-primary/95 lg:via-primary lg:to-secondary lg:p-10 lg:text-primary-foreground">
      <div className="absolute right-0 top-0 h-52 w-52 translate-x-1/4 -translate-y-1/4 rounded-full border border-primary-foreground/25" />
      <div className="absolute bottom-0 left-0 h-72 w-72 -translate-x-1/3 translate-y-1/4 rounded-full border border-primary-foreground/20" />

      <div className="relative space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-foreground/85">
          Orgatick Access
        </p>
        <h2 className="max-w-sm text-4xl font-semibold leading-tight">
          Join, explore, and manage events from one secure platform.
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-primary-foreground/85">
          Sign in to discover events, book your spot in seconds, or switch to admin tools to create
          and manage everything smoothly.
        </p>
      </div>

      <div className="relative grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-4 backdrop-blur-sm">
          <p className="text-xl font-semibold">Explore</p>
          <p className="text-primary-foreground/80">Find events by interest and city</p>
        </div>
        <div className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-4 backdrop-blur-sm">
          <p className="text-xl font-semibold">Join</p>
          <p className="text-primary-foreground/80">Register fast and track your tickets</p>
        </div>
        <div className="col-span-2 rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-4 backdrop-blur-sm">
          <p className="font-medium">
            Built for attendees and admins: explore events, join confidently, and manage operations
            with ease.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DesktopInfo;
