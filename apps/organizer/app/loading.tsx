import OrgatickLogo from "@orgatick/ui/assets/logo/orgatick-logo";
import { IconLoader2 } from "@tabler/icons-react";

export default function Loading() {
  return (
    <div
      className="relative flex min-h-dvh flex-col items-center justify-center p-6 bg-background text-foreground"
      role="status"
      aria-live="polite"
      aria-label="Loading workspace..."
    >
      {/* Centered Loading Container */}
      <div className="flex flex-col items-center text-center max-w-xs w-full">
        {/* Brand Mark */}
        <div className="relative mb-5 flex items-center justify-center">
          <div className="size-14 rounded-2xl bg-card border border-border p-2.5 shadow-xs flex items-center justify-center">
            <OrgatickLogo className="size-full" />
          </div>
        </div>

        {/* Status Text & Spinner */}
        <h2 className="text-base font-semibold tracking-tight text-foreground flex items-center gap-2 mb-1">
          <IconLoader2 className="size-4 animate-spin text-primary" />
          Loading Workspace
        </h2>

        <p className="text-xs text-muted-foreground leading-relaxed">Preparing your organization dashboard...</p>
      </div>
    </div>
  );
}
