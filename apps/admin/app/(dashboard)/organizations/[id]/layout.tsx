import Link from "next/link";
import { notFound } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { serverFetchOrganizationDetail } from "@/lib/admin.api";
import { IdentityCard } from "./_components/identity-card";
import { OrgNav } from "./_components/org-nav";

export default async function OrganizationDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let organization: Awaited<ReturnType<typeof serverFetchOrganizationDetail>>;
  try {
    organization = await serverFetchOrganizationDetail(id);
  } catch {
    return notFound();
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 md:p-6">
      <Link
        href="/organizations"
        className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
      >
        <IconArrowLeft className="size-3.5" /> Back to organizations
      </Link>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr] lg:items-start">
        <aside className="space-y-4 lg:sticky lg:top-6">
          <IdentityCard organization={organization} />
          <OrgNav organizationId={organization.id} />
        </aside>
        <main className="min-w-0 space-y-6">{children}</main>
      </div>
    </div>
  );
}
