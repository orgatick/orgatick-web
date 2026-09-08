import type { Metadata } from "next";
import Link from "next/link";
import * as motion from "motion/react-client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@orgatick/ui/components/breadcrumb";
import { IconChevronRight, IconHome, IconSettings } from "@tabler/icons-react";
import { userService } from "../_services/user.service";
import { SettingsHeader } from "./_components/settings-header";
import { SettingsForm } from "./_components/settings-form";
import { ProfileOverviewCard } from "../profile/_components/profile-overview-card";
import { ProfileSecurityCard } from "../profile/_components/profile-security-card";

export const metadata: Metadata = {
  title: "Account Settings | Orgatick",
  description: "Update your Orgatick account profile, avatar, contact information, and personal settings.",
};

export default async function SettingsPage() {
  // Fetch initial user profile on the server
  const initialUser = await userService.getServerProfile();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative min-h-[calc(100vh-4rem)] w-full py-6 sm:py-10"
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
                  <span>Profile</span>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator>
                <IconChevronRight className="size-3 text-muted-foreground" />
              </BreadcrumbSeparator>

              <BreadcrumbItem>
                <BreadcrumbPage className="inline-flex items-center gap-1 text-xs font-semibold text-foreground">
                  <IconSettings className="size-3.5 text-primary" />
                  <span>Account Settings</span>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </motion.div>

        {/* Settings Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
        >
          <SettingsHeader />
        </motion.div>

        {/* Main Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Main Edit Form Column (Client Component) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-8"
          >
            <SettingsForm initialUser={initialUser} />
          </motion.div>

          {/* Sidebar Summary & Security Cards (Server Presentation) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-4 space-y-6"
          >
            <ProfileOverviewCard user={initialUser} />
            <ProfileSecurityCard user={initialUser} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
