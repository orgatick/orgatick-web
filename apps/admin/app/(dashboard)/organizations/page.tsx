import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowUpRight, IconBuildingStore } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@orgatick/ui/components/avatar";
import { Badge } from "@orgatick/ui/components/badge";
import { Card, CardContent } from "@orgatick/ui/components/card";
import { serverFetchOrganizations } from "@/lib/admin.api";
import type { AdminOrganization, OrganizationListQuery } from "@/lib/types";
import { PageHeader } from "@/components/page-header";
import { PaginationControls } from "@/components/data-tools/pagination";
import { SearchInput } from "@/components/data-tools/search-input";
import { StatusFilter } from "@/components/organizations/status-filter";
import { StatusSwitch } from "@/components/organizations/status-switch";

export const metadata: Metadata = { title: "Organizations" };

type OrganizationsSearchParams = {
  search?: string;
  status?: string;
  page?: string;
};

const statusBadgeClass: Record<AdminOrganization["status"], string> = {
  active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  suspended: "bg-destructive/10 text-destructive",
  inactive: "bg-muted text-muted-foreground",
};

function OrganizationRow({ organization }: { organization: AdminOrganization }) {
  return (
    <tr className="border-b border-border/60 last:border-b-0">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-secondary text-secondary-foreground">
            {organization.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={organization.logo} alt="" className="size-7 rounded object-cover" />
            ) : (
              <IconBuildingStore className="size-4" />
            )}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">{organization.name}</p>
            <p className="truncate text-xs text-muted-foreground">@{organization.slug}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
          #{organization.id}
        </code>
      </td>
      <td className="px-4 py-3">
        {organization.creator ? (
          <div className="flex items-center gap-2">
            <Avatar className="size-6 shrink-0">
              {organization.creator.avatar && (
                <AvatarImage src={organization.creator.avatar} alt={organization.creator.name} />
              )}
              <AvatarFallback className="bg-gradient-to-br from-primary to-indigo-600 font-mono text-[8px] font-bold text-white">
                {organization.creator.name
                  .trim()
                  .split(/\s+/)
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="max-w-40 truncate text-sm text-foreground">{organization.creator.name}</span>
          </div>
        ) : (
          <span className="text-xs text-muted-foreground/60">-</span>
        )}
      </td>
      <td className="px-4 py-3">
        <StatusSwitch organizationId={organization.id} currentStatus={organization.status} />
      </td>
      <td className="px-4 py-3">
        <span className="text-xs tabular-nums text-muted-foreground">
          {new Date(organization.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </td>
      <td className="px-4 py-3">
        <Badge
          variant="secondary"
          className={`px-1.5 py-0 font-mono text-[9px] capitalize ${statusBadgeClass[organization.status]}`}
        >
          {organization.status}
        </Badge>
      </td>
      <td className="px-4 py-3 text-right">
        <Link
          href={`/organizations/${organization.id}`}
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          View <IconArrowUpRight className="size-3.5" />
        </Link>
      </td>
    </tr>
  );
}

export default async function OrganizationsPage({
  searchParams,
}: {
  searchParams: Promise<OrganizationsSearchParams>;
}) {
  const params = await searchParams;
  const page = Math.max(Number(params.page) || 1, 1);
  const search = params.search?.trim();
  const status: OrganizationListQuery["status"] =
    params.status === "active" || params.status === "suspended" || params.status === "inactive"
      ? params.status
      : undefined;

  const data = await serverFetchOrganizations({ page, limit: 20, search, status });

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 md:p-6">
      <PageHeader
        title="Organizations"
        description="All organizations on the platform. You can suspend or activate them."
      />

      <div className="flex flex-wrap items-center gap-2">
        <SearchInput placeholder="Search by name or slug..." className="w-full max-w-sm" />
        <StatusFilter value={status} />
        {(search || status) && (
          <p className="text-xs text-muted-foreground">
            {data.meta.total} result{data.meta.total === 1 ? "" : "s"}
          </p>
        )}
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead>
                <tr className="border-b border-border/60 text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-2.5 font-medium">Organization</th>
                  <th className="px-4 py-2.5 font-medium">ID</th>
                  <th className="px-4 py-2.5 font-medium">Owner</th>
                  <th className="px-4 py-2.5 font-medium">Status</th>
                  <th className="px-4 py-2.5 font-medium">Created</th>
                  <th className="px-4 py-2.5 font-medium" />
                  <th className="px-4 py-2.5 font-medium" />
                </tr>
              </thead>
              <tbody>
                {data.items.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-sm text-muted-foreground">
                      No organizations found.
                    </td>
                  </tr>
                )}
                {data.items.map((organization) => (
                  <OrganizationRow key={organization.id} organization={organization} />
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <PaginationControls page={data.meta.page} totalPages={data.meta.totalPages} />
    </div>
  );
}
