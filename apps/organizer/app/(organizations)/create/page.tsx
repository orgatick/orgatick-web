import type { Metadata } from "next";
import { CreateOrganizationForm } from "./create-organization-form";
import OrgatickLogo from "@orgatick/ui/assets/logo/orgatick-logo";
import { Separator } from "@orgatick/ui/components/separator";

export const metadata: Metadata = {
  title: "Create Organization | Orgatick Organizer",
  description: "Set up your organization, configure payout settings, and start publishing events on Orgatick.",
};

export default function CreateOrganizationPage() {
  return (
    <div className="mx-auto flex h-full w-full max-w-6xl flex-col gap-5 sm:px-6 sm:py-8 lg:gap-6">
      <div className="shrink-0">
        <div className="flex items-center gap-3">
          <OrgatickLogo className="size-9" />
          <div className="flex items-center gap-1">
            <p className="font-mono font-semibold uppercase tracking-widest text-primary">Orgatick</p>
            <Separator orientation="vertical" className={"h-full"} />
            <p className="font-mono font-semibold uppercase tracking-widest text-primary">Onboarding</p>
          </div>
        </div>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Create your organization</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Set up your organizer profile, registered address, verification documents, and support team — it only takes a
          few minutes.
        </p>
      </div>

      <div className="flex-1">
        <CreateOrganizationForm />
      </div>
    </div>
  );
}
