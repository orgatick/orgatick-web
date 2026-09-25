import type { Metadata } from "next";
import Link from "next/link";
import {
  IconBuildingStore,
  IconBuildingSkyscraper,
  IconChevronRight,
  IconLock,
  IconShieldCheck,
  IconUsers,
} from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@orgatick/ui/components/avatar";
import { Badge } from "@orgatick/ui/components/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import { serverFetchDashboardStats } from "@/lib/admin.api";
import type { AdminOrganization, AdminUser } from "@/lib/types";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import Image from "next/image";

export const metadata: Metadata = { title: "Dashboard" };

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function RecentUsers({ users }: { users: AdminUser[] }) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2 space-y-0">
        <CardTitle className="text-base">Recent Users</CardTitle>
        <Link
          href="/users"
          className="inline-flex items-center gap-0.5 text-xs font-medium text-primary hover:underline"
        >
          View all <IconChevronRight className="size-3.5" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-1">
        {users.length === 0 && <p className="py-4 text-center text-sm text-muted-foreground">No users yet.</p>}
        {users.map((user) => (
          <Link
            key={user.id}
            href={`/users/${user.id}`}
            className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted/60"
          >
            <Avatar className="size-8 shrink-0">
              {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
              <AvatarFallback className="bg-linear-to-br from-primary to-indigo-600 font-mono text-[10px] font-bold text-white">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">{user.name}</p>
              <p className="truncate text-xs text-muted-foreground">{user.email}</p>
            </div>
            <Badge variant="secondary" className="shrink-0 px-1.5 py-0 font-mono text-[9px] capitalize">
              {user.role}
            </Badge>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}

function RecentOrganizations({ organizations }: { organizations: AdminOrganization[] }) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2 space-y-0">
        <CardTitle className="text-base">Recent Organizations</CardTitle>
        <Link
          href="/organizations"
          className="inline-flex items-center gap-0.5 text-xs font-medium text-primary hover:underline"
        >
          View all <IconChevronRight className="size-3.5" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-1">
        {organizations.length === 0 && (
          <p className="py-4 text-center text-sm text-muted-foreground">No organizations yet.</p>
        )}
        {organizations.map((organization) => (
          <Link
            key={organization.id}
            href={`/organizations/${organization.id}`}
            className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted/60"
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-secondary text-secondary-foreground">
              {organization.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <Image src={organization.logo} alt="" className="size-6 rounded object-cover" />
              ) : (
                <IconBuildingStore className="size-4" />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">{organization.name}</p>
              <p className="truncate text-xs text-muted-foreground">@{organization.slug}</p>
            </div>
            <Badge variant="secondary" className="shrink-0 px-1.5 py-0 font-mono text-[9px] capitalize">
              {organization.status}
            </Badge>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}

export default async function DashboardPage() {
  let stats: Awaited<ReturnType<typeof serverFetchDashboardStats>> | null = null;
  try {
    stats = await serverFetchDashboardStats();
  } catch {
    stats = null;
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 md:p-6">
      <PageHeader
        title="Platform Overview"
        description="Monitor users and organizations across the Orgatick platform."
      />

      {!stats ? (
        <Card>
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            Unable to load platform stats. Please try again later.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Total Users"
              value={stats.users.total}
              icon={IconUsers}
              accent="primary"
              hint={`${stats.users.admins} platform admins`}
            />
            <StatCard
              label="Organizations"
              value={stats.organizations.total}
              icon={IconBuildingSkyscraper}
              accent="default"
            />
            <StatCard label="Active Orgs" value={stats.organizations.active} icon={IconShieldCheck} accent="success" />
            <StatCard
              label="Suspended Orgs"
              value={stats.organizations.suspended + stats.organizations.inactive}
              icon={IconLock}
              accent="danger"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <RecentUsers users={stats.recentUsers} />
            <RecentOrganizations organizations={stats.recentOrganizations} />
          </div>
        </div>
      )}
    </div>
  );
}
