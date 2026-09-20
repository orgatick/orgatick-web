import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Organization | Orgatick Organizer",
  description: "Set up your organization, configure payout settings, and start publishing events on Orgatick.",
};

export default function CreateOrganizationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-full flex-col">
      {/* Main Content Area */}
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
