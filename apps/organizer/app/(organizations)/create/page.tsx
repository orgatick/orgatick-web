import type { Metadata } from "next";
import { CreateOrganizationForm } from "./create-organization-form";

export const metadata: Metadata = {
  title: "Create Organization | Orgatick Organizer",
  description: "Set up your organization, configure payout settings, and start publishing events on Orgatick.",
};

export default function CreateOrganizationPage() {
  return (
    <div className="mx-auto w-full max-w-6xl h-full overflow-y-hidden">
      {/* Page header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Create your organization</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Set up your organizer profile, registered address, verification documents, and support team — it only takes a
          few minutes.
        </p>
      </div>
      <CreateOrganizationForm />
    </div>
  );
}
