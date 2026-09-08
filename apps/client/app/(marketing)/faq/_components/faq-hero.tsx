export function FaqHero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-14 sm:pt-20 sm:pb-20 border-b border-border/40">
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.12]">
          Got Questions? We Have Answers.
        </h1>

        <p className="mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          Find answers to common questions about gate check-ins, offline scanners, WhatsApp pass delivery, payout
          settlements, and volunteer security.
        </p>
      </div>
    </section>
  );
}
