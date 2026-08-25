import { IconCheck, IconLoader2, IconMail } from "@tabler/icons-react";
import { Button } from "@orgatick/ui/components/button";
import { LinkButton } from "@/components/ui/link-button";

interface Step2FormProps {
  email: string;
  onResend: () => void | Promise<void>;
  isResending: boolean;
  setStep: (step: number) => void;
}

export default function Step2Form({ email, onResend, isResending, setStep }: Step2FormProps) {
  return (
    <div className="w-full rounded-2xl border border-border bg-card/80 p-5 space-y-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <IconMail size={22} />
        </div>
        <div>
          <p className="text-base font-semibold">Check your email</p>
          <p className="text-sm text-muted-foreground">Password reset link sent to</p>
        </div>
      </div>

      <div className="rounded-xl border border-border/70 bg-muted/30 px-3 py-2 text-sm font-medium break-all">
        {email}
      </div>

      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm flex items-start gap-2">
        <IconCheck size={16} className="mt-0.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <span className="text-emerald-700 dark:text-emerald-400 text-xs sm:text-sm">
          The link usually arrives within a minute. Check spam/junk if you do not see it. This works only for email
          addresses that already have an account.
        </span>
      </div>

      <div className="flex flex-col gap-2 pt-1">
        <Button type="button" className="w-full rounded-full text-base h-11" disabled={isResending} onClick={onResend}>
          {isResending ? <IconLoader2 className="animate-spin" /> : "Resend link"}
        </Button>

        <LinkButton href="/login" className="w-full rounded-full text-base h-11">
          Back to login
        </LinkButton>

        <Button
          type="button"
          variant="ghost"
          className="w-full text-sm text-muted-foreground hover:text-foreground"
          onClick={() => setStep(1)}
        >
          Try a different email
        </Button>
      </div>
    </div>
  );
}
