import * as motion from "motion/react-client";
import { IconAlertCircle, IconLoader2, IconRefresh } from "@tabler/icons-react";
import { Button } from "@orgatick/ui/components/button";
import { LinkButton } from "@/components/ui/link-button";

interface ErrorStateProps {
  error: string | null;
  onRetry: () => void;
  isRetrying: boolean;
}

export default function ErrorState({ error, onRetry, isRetrying }: ErrorStateProps) {
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
        <IconAlertCircle size={32} />
      </motion.div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Authentication Failed</h2>
        <p className="text-sm text-muted-foreground">
          We could not complete your sign-in with Google.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-destructive/20 bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive font-medium wrap-break-words">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-3 pt-2">
        <Button
          type="button"
          onClick={onRetry}
          disabled={isRetrying}
          className="w-full rounded-full text-base h-12 flex items-center justify-center gap-2"
        >
          {isRetrying ? (
            <IconLoader2 className="size-5 animate-spin" />
          ) : (
            <>
              <IconRefresh size={18} />
              <span>Try again with Google</span>
            </>
          )}
        </Button>

        <LinkButton href="/login" className="w-full rounded-full text-base h-11">
          Back to Log in
        </LinkButton>
      </div>
    </motion.div>
  );
}
