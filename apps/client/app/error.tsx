"use client";

import { LinkButton } from "@/components/ui/link-button";
import ServerError500 from "@orgatick/ui/assets/illustration/server-error";
import { Button } from "@orgatick/ui/components/button";
import { IconCheck, IconCopy, IconHelpCircle, IconHome, IconRefresh } from "@tabler/icons-react";
import * as motion from "motion/react-client";
import { useEffect, useState } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const [copied, setCopied] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    console.error("Unhandled Application Error:", error);
  }, [error]);

  const handleCopyDigest = () => {
    if (error.digest) {
      navigator.clipboard.writeText(error.digest);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setIsRetrying(true);
    reset();
    setTimeout(() => setIsRetrying(false), 800);
  };

  return (
    <div className="relative flex min-h-full flex-col items-center justify-center p-6 sm:p-12 overflow-hidden bg-background text-foreground">
      {/* Subtle Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <motion.div
        className="relative z-10 flex max-w-lg w-full flex-col items-center text-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Illustration */}
        <motion.div
          className="mb-6 w-full max-w-[260px] sm:max-w-[320px] drop-shadow-xs"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <ServerError500 className="w-full h-auto" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3 text-destructive"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          An unexpected error occurred
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 max-w-md"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
        >
          Our servers ran into a temporary glitch. We&apos;re already looking into it. Please try refreshing or return
          to the home.
        </motion.p>

        {/* Copyable Error Reference ID */}
        {error.digest && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="mb-8 flex items-center gap-2 rounded-lg border border-border bg-card/60 backdrop-blur-xs px-3 py-1.5 text-xs text-muted-foreground font-mono shadow-xs"
          >
            <span className="text-muted-foreground/70">Ref:</span>
            <span className="text-foreground select-all">{error.digest}</span>
            <button
              type="button"
              onClick={handleCopyDigest}
              className="ml-1 rounded p-1 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              title="Copy Reference ID"
            >
              {copied ? <IconCheck className="h-3.5 w-3.5 text-emerald-500" /> : <IconCopy className="h-3.5 w-3.5" />}
            </button>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.4 }}
        >
          <Button
            onClick={handleReset}
            disabled={isRetrying}
            size="lg"
            className="w-full sm:w-auto px-6 font-medium shadow-xs"
          >
            <IconRefresh className={`mr-2 h-4 w-4 ${isRetrying ? "animate-spin" : ""}`} />
            Try again
          </Button>

          <LinkButton
            href="/"
            variant="outline"
            size="lg"
            icon={<IconHome className="mr-2 h-4 w-4" />}
            className="w-full sm:w-auto px-6 font-medium"
          >
            Go to home
          </LinkButton>
        </motion.div>

        {/* SaaS Footer Bar */}
        <motion.div
          className="mt-12 pt-6 w-full flex items-center justify-between text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Systems operational</span>
          </div>

          <LinkButton
            variant="link"
            size="sm"
            href="/contact"
            icon={<IconHelpCircle className="mr-1 h-3.5 w-3.5" />}
            className="p-0 h-auto font-normal text-muted-foreground hover:text-foreground"
          >
            Contact Support
          </LinkButton>
        </motion.div>
      </motion.div>
    </div>
  );
}
