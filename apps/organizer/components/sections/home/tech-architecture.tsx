import { Badge } from "@orgatick/ui/components/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import { IconCheck, IconGitBranch, IconServer } from "@tabler/icons-react";
import * as motion from "motion/react-client";

export function TechArchitectureSection() {
  const stack = [
    {
      layer: "Web Application",
      tech: "Next.js / React (SSR & Server Components)",
      desc: "Lightning fast page loads and seamless digital ticket rendering.",
    },
    {
      layer: "Backend Microservices",
      tech: "Node.js with TypeScript & REST APIs",
      desc: "Type-safe modular application services with sub-50ms endpoint response times.",
    },
    {
      layer: "Database Layer",
      tech: "MongoDB & PostgreSQL Audit Ledger",
      desc: "Hybrid persistence model: MongoDB for high-write event states, Postgres for financial audit trails.",
    },
    {
      layer: "Caching & Realtime",
      tech: "Redis Caching & Socket.io Streams",
      desc: "Ultra-low latency check-in verification stream and instant capacity decrementing.",
    },
    {
      layer: "Security & Auth",
      tech: "JWT Auth & Cryptographic Pass Signatures",
      desc: "Role-aware authorization, HMAC QR verification tokens, and secure payment webhook signatures.",
    },
    {
      layer: "Infrastructure & Media",
      tech: "Docker, Nginx, Cloudflare & Cloud Storage",
      desc: "Containerized cloud deployment with automated CI/CD pipelines and high-throughput asset delivery.",
    },
  ];

  const stateMachine = [
    { state: "01 Draft", desc: "Configure venue, pricing & schedule" },
    { state: "02 Published", desc: "Public listing & pre-registration active" },
    {
      state: "03 Sales Open",
      desc: "Live payments, referral tracking & ticket issuance",
    },
    {
      state: "04 Check-in Active",
      desc: "Venue QR scanners active & low-latency gate stream",
    },
    {
      state: "05 Audited",
      desc: "Financial ledger settlement & participation certificates",
    },
  ];

  return (
    <section id="architecture" className="py-20 md:py-28 bg-muted/20 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10">
            SaaS Infrastructure & Security
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            Built for Peak Festival Traffic
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Orgatick is built on state-machine architecture to ensure transaction consistency, zero double-bookings, and
            sub-second venue check-in speeds.
          </p>
        </motion.div>

        {/* Stack Table & State Machine Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tech Stack Breakdown (2 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-4"
          >
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              <IconServer className="size-5 text-primary" />
              Core Technology Stack
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stack.map((item) => (
                <Card
                  key={item.layer}
                  className="bg-card border-border/60 p-4 rounded-xl space-y-1.5 hover:border-primary/40 transition-all duration-300 hover:-translate-y-0.5 shadow-xs"
                >
                  <CardContent className="p-0 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-primary uppercase tracking-wider font-semibold">
                        {item.layer}
                      </span>
                      <IconCheck className="size-4 text-emerald-500 shrink-0" />
                    </div>
                    <h4 className="font-bold text-sm text-foreground">{item.tech}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Event State Machine Workflow (1 Col) */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-card border-border/60 p-6 rounded-2xl space-y-6 flex flex-col justify-between shadow-xs h-full hover:border-primary/40 transition-all duration-300">
              <CardHeader className="p-0 space-y-2">
                <CardTitle className="flex items-center gap-2 text-primary font-bold text-lg">
                  <IconGitBranch className="size-5" />
                  State Machine Reliability
                </CardTitle>
                <p className="text-xs text-muted-foreground leading-relaxed font-normal">
                  Every event moves through strict state transitions, keeping ticket counts, payments, and gate passes
                  synchronized across all nodes.
                </p>
              </CardHeader>

              <CardContent className="p-0 space-y-3 my-2">
                {stateMachine.map((sm) => (
                  <div
                    key={sm.state}
                    className="flex items-start gap-3 bg-muted/40 p-2.5 rounded-lg border border-border/40 text-xs transition-colors duration-200 hover:bg-muted/70"
                  >
                    <span className="font-mono font-bold text-primary shrink-0">{sm.state}</span>
                    <span className="text-muted-foreground">{sm.desc}</span>
                  </div>
                ))}
              </CardContent>

              <div className="pt-3 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  Audit-Ready Consistency
                </span>
                <span>100% Uptime</span>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
