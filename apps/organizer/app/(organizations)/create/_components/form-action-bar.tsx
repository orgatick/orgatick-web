"use client";

import { Button } from "@orgatick/ui/components/button";
import { Spinner } from "@orgatick/ui/components/spinner";
import { IconArrowLeft, IconArrowRight, IconCheck } from "@tabler/icons-react";
import { motion } from "motion/react";
import { ORGANIZATION_FORM_ID } from "../_constents/form-steps";

interface FormActionBarProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
  isSubmitting: boolean;
  isLastStep: boolean;
  onBack: () => void;
  onNext: () => void;
}

export function FormActionBar({
  currentStep,
  totalSteps,
  stepTitle,
  isSubmitting,
  isLastStep,
  onBack,
  onNext,
}: FormActionBarProps) {
  const progress = Math.round(((currentStep + 1) / totalSteps) * 100);

  return (
    <div className="sticky bottom-0 z-20 mt-auto border-t border-border/60 bg-background/90 backdrop-blur-md">
      <div aria-hidden className="h-0.5 w-full overflow-hidden bg-border/50">
        <motion.div
          className="h-full bg-primary"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
        />
      </div>

      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Button
          type="button"
          variant={currentStep === 0 ? "ghost" : "outline"}
          onClick={onBack}
          disabled={currentStep === 0 || isSubmitting}
          className="min-w-24"
        >
          <IconArrowLeft data-icon="inline-start" />
          Back
        </Button>

        <div className="flex min-w-0 flex-col items-center">
          <span className="hidden font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground sm:block">
            Step {currentStep + 1} of {totalSteps}
          </span>
          <span className="hidden truncate text-xs font-medium text-muted-foreground sm:block">
            {isLastStep ? "Ready to submit?" : stepTitle}
          </span>
          <span className="font-mono text-[11px] font-bold text-primary tabular-nums sm:hidden">
            {currentStep + 1}/{totalSteps}
          </span>
        </div>

        {isLastStep ? (
          <Button type="submit" form={ORGANIZATION_FORM_ID} disabled={isSubmitting} className="min-w-28">
            {isSubmitting ? (
              <>
                <Spinner data-icon="inline-start" />
                Submitting...
              </>
            ) : (
              <>
                <IconCheck data-icon="inline-start" />
                Register
              </>
            )}
          </Button>
        ) : (
          <Button type="button" onClick={onNext} disabled={isSubmitting} className="min-w-28">
            Continue
            <IconArrowRight data-icon="inline-end" />
          </Button>
        )}
      </div>
    </div>
  );
}
