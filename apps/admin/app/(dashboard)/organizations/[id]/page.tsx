import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconArrowLeft, IconArrowUpRight, IconBuildingStore, IconCircleCheck, IconUsers } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@orgatick/ui/components/avatar";
import { Badge } from "@orgatick/ui/components/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import { serverFetchOrganizationDetail } from "@/lib/admin.api";
import type { AdminOrganization } from "@/lib/types";
import { PageHeader } from "@/components/page-header";
import { StatusSwitch } from "@/components/organizations/status-switch";

export const metadata: Metadata = { title: "Organization Details" };

const statusBadgeClass: Record<AdminOrganization["status"], string> = {
  active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  suspended: "bg-destructive/10 text-destructive",
  inactive: "bg-muted text-muted-foreground",
};

function DetailItem({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 text-sm text-foreground">{value || "-"}</dd>
    </div>
  );
}

function formatVerifiedAt(verification: AdminOrganization["verification"]): string {
  if (verification?.status === "verified" && verification.verifiedAt) {
    return new Date(verification.verifiedAt).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  return "Not verified";
}

function StatsGrid({ organization }: { organization: AdminOrganization }) {
  if (!organization.stats) return null;
  const { totalEvents, totalParticipants, totalPaidRegistrations, totalRevenue } = organization.stats;
  const items = [
    { label: "Total Events", value: Number(totalEvents ?? 0) },
    { label: "Participants", value: Number(totalParticipants ?? 0) },
    { label: "Paid Registrations", value: Number(totalPaidRegistrations ?? 0) },
    {
      label: "Revenue",
      value: Number(totalRevenue ?? 0).toLocaleString(undefined, {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 0,
      }),
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="rounded-xl border border-border/60 bg-card p-3">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{item.label}</p>
          <p className="mt-1 font-heading text-lg font-bold text-foreground tabular-nums">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

function MembersCard({ organization }: { organization: AdminOrganization }) {
  const members = organization.members ?? [];
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <IconUsers className="size-4 text-muted-foreground" />
          Members <span className="text-muted-foreground">({members.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {members.length === 0 && <p className="py-6 text-center text-sm text-muted-foreground">No members found.</p>}
        {members.map((member) => (
          <div key={member.id} className="flex items-center gap-3 rounded-lg px-2 py-2">
            <Avatar className="size-8 shrink-0">
              {member.user?.avatar ? (
                <AvatarImage src={member.user.avatar} alt={member.user.name} />
              ) : (
                <AvatarFallback className="bg-gradient-to-br from-primary to-indigo-600 font-mono text-[9px] font-bold text-white">
                  {member.user?.name
                    .trim()
                    .split(/\s+/)
                    .slice(0, 2)
                    .map((part) => part[0])
                    .join("")
                    .toUpperCase() ?? "?"}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">{member.user?.name ?? "Unknown user"}</p>
              <p className="truncate text-xs text-muted-foreground">
                {member.role?.name ?? member.role?.key ?? "Member"} ·{" "}
                {new Date(member.joinedAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <Badge variant="secondary" className="shrink-0 px-1.5 py-0 font-mono text-[9px] capitalize">
              {member.status}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default async function OrganizationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let organization: AdminOrganization;
  try {
    organization = await serverFetchOrganizationDetail(id);
  } catch {
    return notFound();
  }

  const verification = organization.verification;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 md:p-6">
      <div>
        <Link
          href="/organizations"
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          <IconArrowLeft className="size-3.5" /> Back to organizations
        </Link>
      </div>

      <PageHeader
        title="Organization Details"
        description="Full overview of the organization, its status and activity."
        actions={<StatusSwitch organizationId={organization.id} currentStatus={organization.status} />}
      />

      <Card>
        <CardContent className="flex flex-wrap items-center gap-4 p-4 md:p-6">
          <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-secondary text-secondary-foreground">
            {organization.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={organization.logo} alt="" className="size-16 rounded-2xl object-cover" />
            ) : (
              <IconBuildingStore className="size-8" />
            )}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-heading text-xl font-bold tracking-tight text-foreground">{organization.name}</h2>
              <Badge
                variant="secondary"
                className={`px-1.5 py-0 font-mono text-[10px] capitalize ${statusBadgeClass[organization.status]}`}
              >
                {organization.status}
              </Badge>
              {verification?.status === "verified" && (
                <Badge className="gap-1 bg-emerald-500/10 px-1.5 py-0 font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                  <IconCircleCheck className="size-3" /> Verified
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">@{organization.slug}</p>
            <p className="mt-0.5 font-mono text-xs text-muted-foreground">Organization ID: #{organization.id}</p>
          </div>
          {organization.creator && (
            <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-muted/40 px-3 py-2">
              <Avatar className="size-8 shrink-0">
                {organization.creator.avatar ? (
                  <AvatarImage src={organization.creator.avatar} alt={organization.creator.name} />
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-primary to-indigo-600 font-mono text-[9px] font-bold text-white">
                    {organization.creator.name
                      .trim()
                      .split(/\s+/)
                      .slice(0, 2)
                      .map((part) => part[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="leading-tight">
                <p className="text-xs text-muted-foreground">Owner</p>
                <p className="text-sm font-semibold text-foreground">{organization.creator.name}</p>
              </div>
              <Link
                href={`/users/${organization.creator.id}`}
                className="ml-1 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                Profile <IconArrowUpRight className="size-3" />
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      <StatsGrid organization={organization} />

      {organization.description && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">{organization.description}</p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DetailItem label="Category" value={organization.category?.name ?? null} />
            <DetailItem label="Sub-category" value={organization.subCategory?.name ?? null} />
            <DetailItem label="Email" value={organization.email} />
            <DetailItem label="Phone" value={organization.phoneNumber} />
            <DetailItem
              label="Paid Events"
              value={
                organization.allowPaidEvents == null ? null : organization.allowPaidEvents ? "Allowed" : "Not allowed"
              }
            />
            <DetailItem
              label="Created"
              value={
                organization.createdAt
                  ? new Date(organization.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : null
              }
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Verification</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DetailItem label="Status" value={verification?.status ?? null} />
            <DetailItem label="Verified At" value={formatVerifiedAt(verification)} />
            <div className="sm:col-span-2">
              <DetailItem label="Rejection Reason" value={verification?.rejectionReason ?? null} />
            </div>
          </CardContent>
        </Card>
      </div>

      {organization.address && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Address</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <DetailItem label="Line 1" value={organization.address.addressLine1} />
            <DetailItem label="Line 2" value={organization.address.addressLine2} />
            <DetailItem label="Landmark" value={organization.address.landmark} />
            <DetailItem label="Postal Code" value={organization.address.postalCode} />
            <DetailItem
              label="City"
              value={
                organization.address.city?.name
                  ? `${organization.address.city.name}${organization.address.division?.name ? `, ${organization.address.division.name}` : ""}`
                  : null
              }
            />
            <DetailItem label="Country" value={organization.address.country?.name ?? null} />
            <div className="lg:col-span-2">
              <DetailItem label="Formatted" value={organization.address.formattedAddress} />
            </div>
          </CardContent>
        </Card>
      )}

      <MembersCard organization={organization} />
    </div>
  );
}
