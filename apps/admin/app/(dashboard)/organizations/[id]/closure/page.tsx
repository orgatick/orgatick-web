import type { Metadata } from "next";
import { getOrganizationOr404 } from "@/lib/server-org";
import { ClosurePanel } from "./_components/closure-panel";

export const metadata: Metadata = { title: "Organization Closure" };

export default async function OrganizationClosurePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const organization = await getOrganizationOr404(id);

  return <ClosurePanel organization={organization} />;
}
