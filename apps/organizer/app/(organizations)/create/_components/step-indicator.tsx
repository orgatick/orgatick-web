"use client";

import {
  IconBuildingCommunity,
  IconCheck,
  IconFileCheck,
  IconMapPin,
  IconRocket,
  IconShare,
} from "@tabler/icons-react";
import { cn } from "@orgatick/ui/lib/utils";
import type { FormStep, StepConfig } from "../_types";

export const STEPS: StepConfig[] = [
  {
    id: 1,
    title: "Basic Info",
    subtitle: "Identity & Details",
    description: "Name, category, branding, and contact details",
    icon: IconBuildingCommunity,
  },
  {
    id: 2,
    title: "Address",
    subtitle: "Headquarters / Venue",
    description: "Official location and geographic address",
    icon: IconMapPin,
  },
  {
    id: 3,
    title: "Verification",
    subtitle: "Legal Documents",
    description: "Upload GST, PAN, MSME, or Bank proofs",
    icon: IconFileCheck,
  },
  {
    id: 4,
    title: "Social & Team",
    subtitle: "Online Presence",
    description: "Public social handles and support personnel",
    icon: IconShare,
  },
  {
    id: 5,
    title: "Review",
    subtitle: "Final Confirmation",
    description: "Verify all details and submit organization",
    icon: IconRocket,
  },
];

interface StepIndicatorProps {
  currentStep: FormStep;
  completedSteps: FormStep[];
  onStepClick?: (step: FormStep) => void;
}

export function StepIndicator({ currentStep, completedSteps, onStepClick }: StepIndicatorProps) {
  const currentStepIndex = currentStep - 1;
  const progressPercentage = (currentStepIndex / (STEPS.length - 1)) * 100;

  return (
    <div className="w-full space-y-4">
      {/* Mobile Step Header */}
      <div className="flex items-center justify-between rounded-xl border border-border/80 bg-card p-4 shadow-xs md:hidden">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm shadow-xs">
            {currentStep} / {STEPS.length}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Step {currentStep} of {STEPS.length}
            </p>
            <h3 className="font-bold text-foreground text-sm">{STEPS[currentStepIndex]?.title}</h3>
          </div>
        </div>
        <span className="rounded-full bg-primary/10 px-2.5 py-1 font-semibold text-primary text-xs">
          {Math.round((currentStep / STEPS.length) * 100)}% Done
        </span>
      </div>

      {/* Desktop Stepper */}
      <div className="hidden rounded-2xl border border-border/80 bg-card/80 p-6 shadow-xs backdrop-blur-sm md:block">
        {/* Progress Line */}
        <div className="relative mb-6">
          <div className="absolute top-1/2 left-6 right-6 h-1 -translate-y-1/2 rounded-full bg-muted" />
          <div
            className="absolute top-1/2 left-6 h-1 -translate-y-1/2 rounded-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `calc(${progressPercentage}% * 0.9 + 12px)` }}
          />

          <div className="relative z-10 flex items-center justify-between">
            {STEPS.map((step) => {
              const isCurrent = currentStep === step.id;
              const isCompleted = completedSteps.includes(step.id) || currentStep > step.id;
              const isAccessible = isCompleted || isCurrent;
              const StepIcon = step.icon;

              return (
                <button
                  key={step.id}
                  type="button"
                  disabled={!isAccessible}
                  onClick={() => isAccessible && onStepClick?.(step.id)}
                  className={cn(
                    "group flex flex-col items-center gap-2 focus:outline-none disabled:cursor-not-allowed",
                    isAccessible && "cursor-pointer",
                  )}
                >
                  <div
                    className={cn(
                      "relative flex size-11 items-center justify-center rounded-full border-2 font-bold text-sm transition-all duration-300 shadow-xs",
                      isCompleted && "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/20",
                      isCurrent && "border-primary bg-background text-primary ring-4 ring-primary/20 scale-110",
                      !isCompleted &&
                        !isCurrent &&
                        "border-border bg-muted/60 text-muted-foreground group-hover:border-muted-foreground/40",
                    )}
                  >
                    {isCompleted ? <IconCheck className="size-5 stroke-[2.5]" /> : <StepIcon className="size-5" />}
                  </div>
                  <div className="text-center">
                    <span
                      className={cn(
                        "block text-xs font-semibold tracking-tight transition-colors",
                        isCurrent
                          ? "text-primary font-bold"
                          : isCompleted
                            ? "text-foreground"
                            : "text-muted-foreground",
                      )}
                    >
                      {step.title}
                    </span>
                    <span className="hidden lg:block text-[11px] text-muted-foreground">{step.subtitle}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
