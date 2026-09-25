import type { Metadata } from "next";
import { getOrganizationOr404 } from "@/lib/server-org";
import { OverviewSections } from "./_components/overview-sections";

export const metadata: Metadata = { title: "Organization Overview" };

export default async function OrganizationOverviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const organization = await getOrganizationOr404(id);

  return <OverviewSections organization={organization} />;
}
