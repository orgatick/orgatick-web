import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconArrowLeft, IconBuildingStore } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@orgatick/ui/components/avatar";
import { Badge } from "@orgatick/ui/components/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import { serverFetchUserDetail, type UserDetail } from "@/lib/admin.api";
import type { Membership } from "@/lib/types";
import { PageHeader } from "@/components/page-header";
import { RoleSwitch } from "@/components/users/role-switch";

export const metadata: Metadata = { title: "User Details" };

function DetailItem({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 text-sm text-foreground">{value || "-"}</dd>
    </div>
  );
}

function formatDate(value?: string | null): string {
  if (!value) return "Never";
  return new Date(value).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function MembershipsList({ memberships }: { memberships: Membership[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Organization Memberships</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {memberships.length === 0 && (
          <p className="py-6 text-center text-sm text-muted-foreground">Not a member of any organization.</p>
        )}
        {memberships.map((membership) => (
          <Link
            key={membership.id}
            href={membership.organization ? `/organizations/${membership.organization.id}` : "#"}
            className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted/60"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-secondary text-secondary-foreground">
              {membership.organization?.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={membership.organization.logo} alt="" className="size-7 rounded object-cover" />
              ) : (
                <IconBuildingStore className="size-4" />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">
                {membership.organization?.name ?? "Unknown organization"}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {membership.role?.name ?? membership.role?.key ?? "No role"} · joined {formatDate(membership.joinedAt)}
              </p>
            </div>
            <Badge variant="secondary" className="shrink-0 px-1.5 py-0 font-mono text-[9px] capitalize">
              {membership.status}
            </Badge>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}

export default async function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let detail: UserDetail;
  try {
    detail = await serverFetchUserDetail(id);
  } catch {
    return notFound();
  }

  const { user, memberships } = detail;
  const initials = user.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 md:p-6">
      <div>
        <Link href="/users" className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
          <IconArrowLeft className="size-3.5" /> Back to users
        </Link>
      </div>

      <PageHeader
        title="User Details"
        description={`Detailed view of the platform user.`}
        actions={<RoleSwitch userId={user.id} currentRole={user.role} />}
      />

      <Card>
        <CardContent className="flex flex-wrap items-center gap-4 p-4 md:p-6">
          <Avatar className="size-16 shrink-0">
            {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
            <AvatarFallback className="bg-linear-to-br from-primary to-indigo-600 font-mono text-lg font-bold text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-heading text-xl font-bold tracking-tight text-foreground">{user.name}</h2>
              <Badge variant="secondary" className="px-1.5 py-0 font-mono text-[10px] capitalize">
                {user.role}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <p className="mt-0.5 font-mono text-xs text-muted-foreground">User ID: #{user.id}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Account</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <DetailItem label="Auth Provider" value={user.userAccount?.provider ?? null} />
          <DetailItem label="Last Login" value={formatDate(user.userAccount?.lastLoginAt)} />
          <DetailItem label="Joined" value={formatDate(user.createdAt)} />
          <DetailItem label="Gender" value={user.gender} />
          <DetailItem label="Phone" value={user.phoneNumber} />
          <DetailItem label="Address" value={user.address} />
        </CardContent>
      </Card>

      {user.bio && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Bio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">{user.bio}</p>
          </CardContent>
        </Card>
      )}

      <MembershipsList memberships={memberships} />
    </div>
  );
}
