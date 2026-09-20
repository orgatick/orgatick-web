import { CreateOrganizationForm } from "./create-organization-form";
import OrgatickLogo from "@orgatick/ui/assets/logo/orgatick-logo";
import { Separator } from "@orgatick/ui/components/separator";

export default function CreateOrganizationPage() {
  return (
    <div className="mx-auto flex h-full w-full max-w-7xl flex-col gap-5 px-2 py-6 sm:px-6 sm:py-8 lg:gap-6">
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
