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
import { IconChevronRight, IconHome, IconUser } from "@tabler/icons-react";
import { userService } from "../_services/user.service";
import { ProfileViewHeader } from "./_components/profile-view-header";
import { ProfileDetailsCard } from "./_components/profile-details-card";
import { ProfileOverviewCard } from "./_components/profile-overview-card";
import { ProfileSecurityCard } from "./_components/profile-security-card";

export const metadata: Metadata = {
  title: "My Profile | Orgatick",
  description: "View your Orgatick account profile, contact information, bio, and personal details.",
};

export default async function ProfilePage() {
  // Fetch profile data on the server with user's cookies
  const user = await userService.getServerProfile();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 h-full">
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
              <span className="text-xs text-muted-foreground">Account</span>
            </BreadcrumbItem>

            <BreadcrumbSeparator>
              <IconChevronRight className="size-3 text-muted-foreground" />
            </BreadcrumbSeparator>

            <BreadcrumbItem>
              <BreadcrumbPage className="inline-flex items-center gap-1 text-xs font-semibold text-foreground">
                <IconUser className="size-3.5 text-primary" />
                <span>My Profile</span>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </motion.div>

      {/* Profile View Header (Server Presentation) */}
      <ProfileViewHeader user={user} />

      {/* Main Content Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Main Profile Info Column (Server Presentation) */}

        <ProfileDetailsCard user={user} />

        {/* Sidebar Summary & Security Cards (Server Presentation) */}
        <ProfileOverviewCard user={user} />
        <ProfileSecurityCard user={user} />
      </div>
    </div>
  );
}
