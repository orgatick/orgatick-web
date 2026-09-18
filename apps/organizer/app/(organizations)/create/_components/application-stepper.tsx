"use client";

import { cn } from "@orgatick/ui/lib/utils";
import { IconCheck, IconShieldCheck } from "@tabler/icons-react";
import { motion } from "motion/react";
import { ORGANIZATION_FORM_STEPS, type OrganizationFormStep } from "../_constents/form-steps";

interface StepperProps {
  currentStep: number;
  onGoToStep: (index: number) => void;
}

function isStepReachable(index: number, currentStep: number): boolean {
  return index <= currentStep;
}

export function ApplicationStepper({ currentStep, onGoToStep }: StepperProps) {
  const progress = Math.round(((currentStep + 1) / ORGANIZATION_FORM_STEPS.length) * 100);

  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-border/60 bg-card/50 p-4">
      <div className="flex items-center justify-between gap-2 px-1">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Application progress
        </p>
        <span className="rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[10px] font-bold text-primary tabular-nums">
          {progress}%
        </span>
      </div>

      <div aria-hidden className="h-1.5 overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
        />
      </div>

      <nav aria-label="Progress" className="mt-2 flex flex-col gap-1">
        {ORGANIZATION_FORM_STEPS.map((step, index) => {
          const StepIcon = step.icon;
          const isCompleted = currentStep > index;
          const isCurrent = currentStep === index;
          const isReachable = isStepReachable(index, currentStep);

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onGoToStep(index)}
              disabled={!isReachable}
              className={cn(
                "group flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-start outline-hidden transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring",
                isReachable ? "cursor-pointer hover:bg-accent/40" : "cursor-not-allowed opacity-45",
                isCurrent && "border-primary/20 bg-primary/5",
              )}
            >
              <span
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-lg border transition-colors",
                  isCurrent && "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/25",
                  isCompleted && "border-primary/30 bg-primary/10 text-primary",
                  !isReachable && "border-border bg-muted/50 text-muted-foreground",
                )}
              >
                {isCompleted ? <IconCheck className="size-4" /> : <StepIcon className="size-4" />}
              </span>

              <span className="min-w-0 flex-1">
                <span
                  className={cn(
                    "block truncate text-sm font-medium",
                    isCurrent ? "text-foreground" : isCompleted ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {step.title}
                </span>
                <span className="block truncate text-xs text-muted-foreground">
                  {isCompleted ? "Completed" : isCurrent ? step.description : step.description}
                </span>
              </span>
            </button>
          );
        })}
      </nav>

      <div className="mt-2 flex items-start gap-2.5 rounded-xl bg-muted/50 p-3 text-xs leading-relaxed text-muted-foreground">
        <IconShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
        <p>Your details are kept confidential and only used to verify your organization before payouts are enabled.</p>
      </div>
    </div>
  );
}

export function MobileStepProgress({ currentStep }: { currentStep: number }) {
  const currentStepConfig =
    ORGANIZATION_FORM_STEPS[currentStep] ?? (ORGANIZATION_FORM_STEPS[0] as OrganizationFormStep);

  return (
    <div className="flex flex-col gap-3 px-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Step {currentStep + 1} of {ORGANIZATION_FORM_STEPS.length}
          </p>
          <h2 className="mt-0.5 text-lg font-semibold tracking-tight text-foreground">{currentStepConfig.title}</h2>
        </div>
        <span className="rounded-full border border-border/60 bg-card/60 px-2.5 py-1 font-mono text-[11px] font-bold text-primary tabular-nums">
          {Math.round(((currentStep + 1) / ORGANIZATION_FORM_STEPS.length) * 100)}%
        </span>
      </div>

      <ol className="flex items-center">
        {ORGANIZATION_FORM_STEPS.map((step: OrganizationFormStep, index) => {
          const StepIcon = step.icon;
          const isCompleted = currentStep > index;
          const isCurrent = currentStep === index;

          return (
            <li key={step.id} className="flex flex-1 items-center last:flex-none">
              <span
                className={cn(
                  "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                  isCompleted && "border-primary bg-primary text-primary-foreground",
                  isCurrent && "border-primary bg-card text-primary shadow-md ring-4 ring-primary/15",
                  !isCompleted && !isCurrent && "border-border bg-card text-muted-foreground opacity-60",
                )}
              >
                {isCompleted ? <IconCheck className="size-4" /> : <StepIcon className="size-4" />}
              </span>
              {index < ORGANIZATION_FORM_STEPS.length - 1 && (
                <span aria-hidden className="mx-1.5 h-1 flex-1 overflow-hidden rounded-full bg-border">
                  <span
                    className={cn(
                      "block h-full rounded-full bg-primary transition-all duration-300",
                      isCompleted ? "w-full" : "w-0",
                    )}
                  />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
