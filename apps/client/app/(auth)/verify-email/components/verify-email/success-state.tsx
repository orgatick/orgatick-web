"use client";

import Link from "next/link";
import * as motion from "motion/react-client";
import { IconCheck } from "@tabler/icons-react";
import { buttonVariants } from "@orgatick/ui/components/button";

interface SuccessStateProps {
  email?: string;
}

export default function SuccessState({ email }: SuccessStateProps) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.96 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full rounded-2xl border border-border bg-card/80 p-6 sm:p-8 space-y-5 shadow-sm text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
        className="mx-auto h-16 w-16 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center"
      >
        <IconCheck size={32} />
      </motion.div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Email Verified!</h2>
        <p className="text-sm text-muted-foreground">
          Your email address has been successfully verified. Your account is now active.
        </p>
      </div>

      {email && (
        <div className="rounded-xl border border-border/70 bg-muted/30 px-3 py-2 text-sm font-medium break-all">
          {email}
        </div>
      )}

      <div className="pt-2">
        <Link
          href="/login"
          className={buttonVariants({
            variant: "default",
            className: "w-full rounded-full text-xl h-14",
          })}
        >
          Continue to Log in
        </Link>
      </div>
    </motion.div>
  );
}
