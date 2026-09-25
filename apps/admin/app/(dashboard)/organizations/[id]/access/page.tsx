import type { Metadata } from "next";
import { getOrganizationOr404 } from "@/lib/server-org";
import { AccessPanel } from "./_components/access-panel";

export const metadata: Metadata = { title: "Organization Access" };

export default async function OrganizationAccessPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const organization = await getOrganizationOr404(id);

  return <AccessPanel organization={organization} />;
}
