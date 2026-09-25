import type { Metadata } from "next";
import { getOrganizationOr404 } from "@/lib/server-org";
import { HistoryPanel } from "./_components/history-panel";

export const metadata: Metadata = { title: "Organization History" };

export default async function OrganizationHistoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const organization = await getOrganizationOr404(id);

  return <HistoryPanel organization={organization} />;
}
