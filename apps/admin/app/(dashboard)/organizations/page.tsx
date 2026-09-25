import type { Metadata } from "next";
import { Card, CardContent } from "@orgatick/ui/components/card";
import { serverFetchOrganizations } from "@/lib/admin.api";
import type { AdminOrganization, OrganizationListQuery } from "@/lib/types";
import { PageHeader } from "@/components/page-header";
import { PaginationControls } from "@/components/data-tools/pagination";
import { SearchInput } from "@/components/data-tools/search-input";
import { StatusFilter } from "./_components/status-filter";
import { AccessFilter, VerificationFilter } from "./_components/org-filters";
import { OrganizationRow } from "./_components/organization-row";

export const metadata: Metadata = { title: "Organizations" };

type OrganizationsSearchParams = {
  search?: string;
  status?: string;
  verification?: string;
  access?: string;
  page?: string;
};

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
  const verificationStatus =
    params.verification === "pending" || params.verification === "verified" || params.verification === "rejected"
      ? params.verification
      : undefined;
  const access = params.access === "blocked" ? "blocked" : params.access === "archived" ? "archived" : undefined;

  const data = await serverFetchOrganizations({
    page,
    limit: 20,
    search,
    status,
    verificationStatus,
    ...(access === "blocked" ? { blocked: true } : {}),
    ...(access === "archived" ? { archived: true } : {}),
  });

  const hasFilters = Boolean(search || status || verificationStatus || access);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 md:p-6">
      <PageHeader
        title="Organizations"
        description="All organizations on the platform. You can suspend, verify or block them."
      />

      <div className="flex flex-wrap items-center gap-2">
        <SearchInput placeholder="Search by name or slug..." className="w-full max-w-sm" />
        <StatusFilter value={status} />
        <VerificationFilter value={verificationStatus} />
        <AccessFilter value={access} />
        {hasFilters && (
          <p className="text-xs text-muted-foreground">
            {data.meta.total} result{data.meta.total === 1 ? "" : "s"}
          </p>
        )}
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead>
                <tr className="border-b border-border/60 text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-2.5 font-medium">Organization</th>
                  <th className="px-4 py-2.5 font-medium">ID</th>
                  <th className="px-4 py-2.5 font-medium">Owner</th>
                  <th className="px-4 py-2.5 font-medium">Verification</th>
                  <th className="px-4 py-2.5 font-medium">Access</th>
                  <th className="px-4 py-2.5 font-medium">Status</th>
                  <th className="px-4 py-2.5 font-medium">Created</th>
                  <th className="px-4 py-2.5 font-medium" />
                  <th className="px-4 py-2.5 font-medium" />
                </tr>
              </thead>
              <tbody>
                {data.items.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-sm text-muted-foreground">
                      No organizations found.
                    </td>
                  </tr>
                )}
                {data.items.map((organization: AdminOrganization) => (
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
