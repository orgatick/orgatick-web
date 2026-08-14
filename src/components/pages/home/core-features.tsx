import {
  IconBell,
  IconCalendarEvent,
  IconChartBar,
  IconShieldCheck,
  IconTicket,
  IconUsers,
} from "@tabler/icons-react";
import * as motion from "motion/react-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CoreFeatures() {
  const features = [
    {
      id: 1,
      title: "Effortless Event Creation",
      description:
        "Create and publish events in minutes — no technical barriers, just intuitive tools that let you focus on delivering memorable experiences.",
      icon: IconCalendarEvent,
    },
    {
      id: 2,
      title: "Secure Ticketing & Payments",
      description:
        "Integrated with multiples payment gateway for smooth, trusted, and transparent transactions — every ticket purchase is safe and verified.",
      icon: IconTicket,
    },
    {
      id: 3,
      title: "Smart Analytics Dashboard",
      description:
        "Get real-time insights into attendance, engagement, and revenue — helping you make confident, data-driven decisions.",
      icon: IconChartBar,
    },
    {
      id: 4,
      title: "Automated Notifications",
      description:
        "Keep attendees informed with automated email, SMS, and push notifications — ensuring no one misses an update.",
      icon: IconBell,
    },
    {
      id: 5,
      title: "Team Collaboration",
      description:
        "Invite teammates, assign roles, and manage access effortlessly — making event management truly collaborative and secure.",
      icon: IconUsers,
    },
    {
      id: 6,
      title: "Enterprise-Grade Security",
      description:
        "Built with advanced encryption and privacy controls to safeguard every user, payment, and organization record.",
      icon: IconShieldCheck,
    },
  ];

  return (
    <section
      className="relative py-16 sm:py-20 px-2 sm:px-8 bg-linear-to-b from-background via-primary/5 to-card border-t border-border"
      aria-labelledby="core-features-title"
    >
      {/*  Background Elements */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl opacity-30 -z-10" />
      <div className="absolute bottom-0 right-0 w-56 h-56 bg-secondary/20 rounded-full blur-3xl opacity-20 -z-10" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-14"
      >
        <h2
          id="core-features-title"
          className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4"
        >
          <span className="bg-linear-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Everything You Need
          </span>{" "}
          to Host Smarter Events
        </h2>

        <p className="text-muted-foreground text-lg leading-relaxed">
          Manage registrations, payments, analytics, and engagement — all from
          one intuitive platform designed to make events seamless, secure, and
          scalable.
        </p>
      </motion.div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-transparent border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full">
                <CardHeader className="flex flex-row items-center gap-3">
                  <div className="p-3 bg-linear-to-tr from-primary/10 via-accent/10 to-secondary/10 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground leading-tight">
                    {feature.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <CardDescription className="text-base text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
