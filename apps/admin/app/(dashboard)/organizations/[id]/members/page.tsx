import type { Metadata } from "next";
import { getOrganizationOr404 } from "@/lib/server-org";
import { MembersPanel } from "./_components/members-panel";

export const metadata: Metadata = { title: "Organization Members" };

export default async function OrganizationMembersPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const organization = await getOrganizationOr404(id);

  return <MembersPanel organization={organization} />;
}
