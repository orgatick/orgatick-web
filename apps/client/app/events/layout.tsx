import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Explore Events, Hackathons & Summits | Orgatick",
  description:
    "Discover and register for top campus hackathons, technical conferences, cultural fests, and workshops powered by Orgatick.",
  alternates: { canonical: "/events" },
  openGraph: {
    title: "Explore Events, Hackathons & Summits | Orgatick",
    description:
      "Discover and register for top campus hackathons, technical conferences, cultural fests, and workshops powered by Orgatick.",
    url: "https://orgatick.in/events",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore Events, Hackathons & Summits | Orgatick",
    description:
      "Discover and register for top campus hackathons, technical conferences, cultural fests, and workshops powered by Orgatick.",
  },
};

export default function EventsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main className="flex-1 min-w-0">{children}</main>
      <Footer />
    </div>
  );
}
