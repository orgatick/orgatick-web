import type { Metadata } from "next";
import { getOrganizationOr404 } from "@/lib/server-org";
import { NotesPanel } from "./_components/notes-panel";

export const metadata: Metadata = { title: "Organization Notes" };

export default async function OrganizationNotesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const organization = await getOrganizationOr404(id);

  return <NotesPanel organization={organization} />;
}
