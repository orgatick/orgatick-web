import type { Metadata } from "next";
import { CreateOrganizationForm } from "./_components/create-organization-form";

export const metadata: Metadata = {
  title: "Create Organization | Orgatick Organizer",
  description: "Set up your organization, configure payout settings, and start publishing events on Orgatick.",
};

export default function CreateOrganizationPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mx-auto max-w-4xl space-y-2 text-center mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Register Your Organization
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Complete the guided setup to establish your organizer entity, verify legal compliance, and launch ticket
          sales.
        </p>
      </div>

      <CreateOrganizationForm />
    </div>
  );
}
