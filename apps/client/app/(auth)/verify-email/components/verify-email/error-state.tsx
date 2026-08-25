import Link from "next/link";
import * as motion from "motion/react-client";
import { IconAlertTriangle, IconLoader2 } from "@tabler/icons-react";
import { Button, buttonVariants } from "@orgatick/ui/components/button";

interface ErrorStateProps {
  email?: string;
  errorMessage?: string;
  onResend?: () => Promise<void>;
  isResending?: boolean;
  resendSuccess?: boolean;
}

export default function ErrorState({
  email,
  errorMessage = "This verification link is invalid, incomplete, or has expired.",
  onResend,
  isResending = false,
  resendSuccess = false,
}: ErrorStateProps) {
  return (
    <motion.div
      key="error"
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.96 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="w-full rounded-2xl border border-destructive/30 bg-card/80 p-6 sm:p-8 space-y-5 shadow-sm text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
        className="mx-auto h-16 w-16 rounded-full bg-destructive/15 text-destructive flex items-center justify-center"
      >
        <IconAlertTriangle size={32} />
      </motion.div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Verification Failed</h2>
        <p className="text-sm text-muted-foreground">{errorMessage}</p>
      </div>

      {email && (
        <div className="rounded-xl border border-border/70 bg-muted/30 px-3 py-2 text-sm font-medium break-all">
          {email}
        </div>
      )}

      {resendSuccess && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-400">
          A new verification link has been sent to your email!
        </div>
      )}

      <div className="flex flex-col gap-3 pt-2">
        {onResend && email && (
          <Button
            type="button"
            className="w-full rounded-full text-base h-12"
            disabled={isResending}
            onClick={onResend}
          >
            {isResending ? <IconLoader2 className="animate-spin" /> : "Resend verification email"}
          </Button>
        )}

        <Link
          href="/login"
          className={buttonVariants({
            variant: onResend && email ? "outline" : "default",
            className: "w-full rounded-full text-base h-12",
          })}
        >
          Back to Log in
        </Link>
      </div>
    </motion.div>
  );
}
