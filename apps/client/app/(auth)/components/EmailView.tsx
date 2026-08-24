import { IconUserCircle } from "@tabler/icons-react";
import { Button } from "@orgatick/ui/components/button";

interface EmailViewProps {
  email: string;
  message?: string;
  name?: string;
  onBack?: () => void;
}

function EmailView({
  message = "Authenticating with email...",
  email,
  name,
  onBack,
}: EmailViewProps) {
  if (!email) return null;

  return (
    <div className="w-full rounded-2xl sm:bg-card/80 space-y-0">
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <IconUserCircle size={24} />
        </div>
        <div className="min-w-0">
          {name && <p className="text-base font-semibold leading-tight truncate">{name}</p>}
          <p
            className={`leading-tight truncate ${name ? "text-secondary text-sm" : "text-base font-semibold"}`}
          >
            {email}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground mt-1">{message}</p>
        <Button
          type="button"
          variant="ghost"
          className="h-8 px-2 text-sm"
          onClick={() => onBack?.()}
        >
          Use different email
        </Button>
      </div>
    </div>
  );
}

export default EmailView;
