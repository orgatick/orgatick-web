import Link from "next/link";
import { IconCheck } from "@tabler/icons-react";
import { buttonVariants } from "@orgatick/ui/components/button";

export default function Step2Form() {
  return (
    <div className="w-full rounded-2xl border border-border bg-card/80 p-6 space-y-4 shadow-sm text-center">
      <div className="mx-auto h-12 w-12 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
        <IconCheck size={26} />
      </div>

      <div className="space-y-1">
        <p className="text-xl font-semibold">Password updated!</p>
        <p className="text-sm text-muted-foreground">
          Your password has been successfully reset. You can now use your new password to sign in.
        </p>
      </div>

      <div className="pt-2">
        <Link
          href="/login"
          className={buttonVariants({
            variant: "default",
            className: "w-full rounded-full text-base h-11",
          })}
        >
          Back to login
        </Link>
      </div>
    </div>
  );
}
