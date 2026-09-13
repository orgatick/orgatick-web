import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import * as motion from "motion/react-client";
import type { SessionResponse } from "@orgatick/contracts";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@orgatick/ui/components/breadcrumb";
import { IconChevronRight, IconDevices, IconHome } from "@tabler/icons-react";
import { createServerApiClient } from "@/lib/apis/server-auth-api";
import { CurrentSessionCard } from "./_components/current-session-card";
import { SessionsHeader } from "./_components/sessions-header";
import { SessionsList } from "./_components/sessions-list";
import { SessionsNavigationCard } from "./_components/sessions-navigation-card";
import { SessionsOverviewCard } from "./_components/sessions-overview-card";
import { SessionsSecurityAdvisory } from "./_components/sessions-security-advisory";

export const metadata: Metadata = {
  title: "Active Sessions & Devices | Orgatick",
  description:
    "Review and manage devices where you are signed in. Revoke inactive or unfamiliar sessions across browsers and devices.",
};

export default async function SessionsPage() {
  // Fetch initial active sessions on the server with user's cookies
  const cookieStore = await cookies();
  const serverApi = createServerApiClient({ cookieStore });
  let initialSessions: SessionResponse[] = [];

  try {
    const response = await serverApi.get("/auth/sessions");
    if (Array.isArray(response.data?.data)) {
      initialSessions = response.data.data as SessionResponse[];
    } else if (Array.isArray(response.data)) {
      initialSessions = response.data as unknown as SessionResponse[];
    }
  } catch (error) {
    const status = (error as { response?: { status?: number } })?.response?.status;
    throw new Error(`Failed to fetch sessions. Status: ${status || "unknown"}`);
  }

  const currentSession = initialSessions.find((s) => s.isCurrent) || null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative min-h-full w-full"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Navigation Breadcrumbs */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  render={
                    <Link
                      href="/"
                      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    />
                  }
                >
                  <IconHome className="size-3.5" />
                  <span>Home</span>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator>
                <IconChevronRight className="size-3 text-muted-foreground" />
              </BreadcrumbSeparator>

              <BreadcrumbItem>
                <BreadcrumbLink
                  render={
                    <Link
                      href="/profile"
                      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    />
                  }
                >
                  <span>Account</span>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator>
                <IconChevronRight className="size-3 text-muted-foreground" />
              </BreadcrumbSeparator>

              <BreadcrumbItem>
                <BreadcrumbPage className="inline-flex items-center gap-1 text-xs font-semibold text-foreground">
                  <IconDevices className="size-3.5 text-primary" />
                  <span>Active Sessions</span>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </motion.div>

        {/* Sessions Header Banner (Server Presentation) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
        >
          <SessionsHeader sessionCount={initialSessions.length} />
        </motion.div>

        {/* Main Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Main Sessions Management Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-8 space-y-6"
          >
            {/* Current Active Session Presentation (Server Component) */}
            <CurrentSessionCard session={currentSession} />

            {/* Other Sessions List & Danger Zone (Client Component) */}
            <SessionsList initialSessions={initialSessions} />
          </motion.div>

          {/* Sidebar Summary & Security Cards (Server Components) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-4 space-y-6"
          >
            <SessionsOverviewCard sessions={initialSessions} />
            <SessionsSecurityAdvisory />
            <SessionsNavigationCard />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
