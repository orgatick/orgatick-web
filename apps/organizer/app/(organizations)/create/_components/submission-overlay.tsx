"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import OrgatickLogo from "@orgatick/ui/assets/logo/orgatick-logo";
import { IconBuildingCommunity, IconClipboardCheck, IconLock, IconShieldLock, IconUpload } from "@tabler/icons-react";

type StageIcon = React.ElementType;

interface SubmissionStage {
  icon: StageIcon;
  title: string;
  description: string;
}

const SUBMISSION_STAGES: SubmissionStage[] = [
  {
    icon: IconUpload,
    title: "Uploading your documents",
    description: "Sending your files securely…",
  },
  {
    icon: IconShieldLock,
    title: "Verifying your details",
    description: "Validating your information…",
  },
  {
    icon: IconClipboardCheck,
    title: "Registering your organization",
    description: "Setting up your profile and workspace…",
  },
  {
    icon: IconBuildingCommunity,
    title: "Preparing your dashboard",
    description: "Almost done — just a few seconds…",
  },
];

const STAGE_INTERVAL_MS = 2600;

export function SubmissionOverlay() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const id = setInterval(() => {
      setTick((t) => (t + 1) % SUBMISSION_STAGES.length);
    }, STAGE_INTERVAL_MS);
    return () => {
      clearInterval(id);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const stage = SUBMISSION_STAGES[tick] as SubmissionStage;
  const StageIcon = stage.icon;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-busy="true"
      aria-label="Submitting organization"
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <motion.div
        className="w-full max-w-sm rounded-xl border bg-card p-6 text-center shadow-lg"
        initial={{ scale: 0.97, y: 8 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.97, y: 8, opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-lg border bg-muted/40">
          <OrgatickLogo className="size-7" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tick}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center gap-2">
              <span className="flex size-6 items-center justify-center">
                <StageIcon className="size-4 text-primary" />
              </span>
              <h2 className="text-sm font-semibold text-foreground">{stage.title}</h2>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{stage.description}</p>
          </motion.div>
        </AnimatePresence>

        <div aria-hidden className="mt-5 h-1 w-full overflow-hidden rounded-full bg-border/60">
          <motion.div
            className="h-full rounded-full bg-primary"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <IconLock className="size-3.5" />
          Please keep this tab open.
        </p>
      </motion.div>
    </motion.div>
  );
}
