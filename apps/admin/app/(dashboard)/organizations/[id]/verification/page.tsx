import type { Metadata } from "next";
import { getOrganizationOr404 } from "@/lib/server-org";
import { VerificationPanel } from "./_components/verification-panel";

export const metadata: Metadata = { title: "Organization Verification" };

export default async function OrganizationVerificationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const organization = await getOrganizationOr404(id);

  return <VerificationPanel organization={organization} />;
}
