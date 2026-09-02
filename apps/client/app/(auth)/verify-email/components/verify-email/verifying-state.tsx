"use client";

import * as motion from "motion/react-client";
import { IconLoader2 } from "@tabler/icons-react";

interface VerifyingStateProps {
  email?: string;
}

export default function VerifyingState({ email }: VerifyingStateProps) {
  return (
    <motion.div
      key="verifying"
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.96 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="w-full rounded-2xl border border-border bg-card/80 p-6 sm:p-8 space-y-5 shadow-sm text-center"
    >
      <div className="relative mx-auto h-16 w-16 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-primary/20"
        />
        <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
          <IconLoader2 className="size-7 animate-spin" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Verifying your email</h2>
        <p className="text-sm text-muted-foreground">Please wait a moment while we verify and activate your account.</p>
      </div>

      {email && (
        <div className="rounded-xl border border-border/70 bg-muted/30 px-3 py-2 text-sm font-medium text-muted-foreground break-all">
          {email}
        </div>
      )}
    </motion.div>
  );
}
