import type { Metadata } from "next";
import { CreateOrganizationForm } from "./create-organization-form";

export const metadata: Metadata = {
  title: "Create Organization | Orgatick Organizer",
  description: "Set up your organization, configure payout settings, and start publishing events on Orgatick.",
};

export default function CreateOrganizationPage() {
  return (
    <div className="container mx-auto">
      <CreateOrganizationForm />
    </div>
  );
}
