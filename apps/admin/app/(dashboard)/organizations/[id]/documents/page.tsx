import type { Metadata } from "next";
import { getOrganizationOr404 } from "@/lib/server-org";
import { DocumentsPanel } from "./_components/documents-panel";

export const metadata: Metadata = { title: "Organization Documents" };

export default async function OrganizationDocumentsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const organization = await getOrganizationOr404(id);

  return <DocumentsPanel organization={organization} />;
}
