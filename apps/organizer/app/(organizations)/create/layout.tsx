export default function CreateOrganizationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-full flex-col bg-background lg:h-dvh lg:overflow-hidden">
      {/* Main Content Area */}
      <main className="min-h-0 flex-1 py-2">{children}</main>
    </div>
  );
}
