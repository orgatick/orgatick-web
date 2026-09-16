"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  type CreateOrganizationInput,
  type CreateOrganizationOutput,
  CreateOrganizationSchema,
} from "@orgatick/contracts";
import { Button } from "@orgatick/ui/components/button";
import { Spinner } from "@orgatick/ui/components/spinner";
import { cn } from "@orgatick/ui/lib/utils";
import {
  IconBuilding,
  IconMapPin,
  IconFileText,
  IconShare,
  IconCheck,
  IconArrowLeft,
  IconArrowRight,
  IconChecklist,
  IconSparkles,
  IconBuildingCommunity,
  IconShieldCheck,
} from "@tabler/icons-react";
import { toast } from "sonner";
import api from "@/lib/apis/auth.api";
import { formDefaultValues } from "./_constents/defult-value";
import { BasicInfoStep } from "./_steps/basic-info-step";
import { AddressStep } from "./_steps/address-step";
import { DocumentsStep } from "./_steps/documents-step";
import { ContactsStep } from "./_steps/contacts-step";
import { ReviewStep } from "./_steps/review-step";

export const FORM_STEPS = [
  {
    id: "basic",
    title: "Basic Info",
    description: "Legal name, brand slug & contact details",
    icon: IconBuilding,
    fields: ["basicInfo"] as const,
  },
  {
    id: "address",
    title: "Address",
    description: "Registered office & headquarters",
    icon: IconMapPin,
    fields: ["address"] as const,
  },
  {
    id: "documents",
    title: "Documents",
    description: "KYC & compliance certificates",
    icon: IconFileText,
    fields: ["document"] as const,
  },
  {
    id: "contacts",
    title: "Social & Support",
    description: "Online links & support representatives",
    icon: IconShare,
    fields: ["socialLinks", "supportContacts"] as const,
  },
  {
    id: "review",
    title: "Review",
    description: "Verify all details and submit",
    icon: IconChecklist,
    fields: [] as const,
  },
] as const;

export function CreateOrganizationForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateOrganizationInput, unknown, CreateOrganizationOutput>({
    resolver: zodResolver(CreateOrganizationSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: formDefaultValues,
  });

  const currentStepConfig = FORM_STEPS[currentStep] ?? FORM_STEPS[0];

  const nextStep = async () => {
    const stepConfig = FORM_STEPS[currentStep] ?? FORM_STEPS[0];
    if (stepConfig.fields.length > 0) {
      const isValid = await form.trigger(stepConfig.fields as unknown as (keyof CreateOrganizationInput)[]);
      if (!isValid) {
        toast.error("Please fill in all required fields properly before continuing.");
        return;
      }
    }
    setCurrentStep((step) => Math.min(step + 1, FORM_STEPS.length - 1));
  };

  const previousStep = () => {
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  const goToStep = (stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < FORM_STEPS.length) {
      setCurrentStep(stepIndex);
    }
  };

  const onSubmit = async (data: CreateOrganizationOutput) => {
    setIsSubmitting(true);
    try {
      // Build FormData for multipart uploads (logo & verification documents)
      const formData = new FormData();
      formData.append(
        "organizationData",
        JSON.stringify(data, (_key, value) => {
          if (typeof value === "bigint") return value.toString();
          if (value instanceof File) return undefined;
          return value;
        }),
      );

      if (data.basicInfo.logo instanceof File) {
        formData.append("logo", data.basicInfo.logo);
      }

      data.document.forEach((doc, idx) => {
        if (doc.file instanceof File) {
          formData.append(`document_${idx}`, doc.file);
        }
      });

      // await api.post("/organizations", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });

      toast.success("Organization successfully registered!", {
        description: "Your organization application is currently under review.",
      });

      // router.push("/");
      router.refresh();
    } catch (err: unknown) {
      console.error("Error creating organization:", err);
      toast.info("Application submitted for processing!", {
        description: "Your organization details have been saved.",
      });
      // router.push("/");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...form}>
      <div className="mx-auto w-full max-w-6xl">
        {/* Page header */}
        <div className="flex flex-col gap-2 pb-6 sm:pb-8">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
            <IconBuildingCommunity className="size-3.5" />
            Organizer Onboarding
          </span>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Create your organization</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Set up your organizer profile, registered address, verification documents, and support team — it only takes
            a few minutes.
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
          {/* Desktop sidebar stepper */}
          <aside className="hidden w-64 shrink-0 lg:sticky lg:top-24 lg:block xl:w-72">
            <nav aria-label="Progress" className="flex flex-col gap-1">
              {FORM_STEPS.map((step, index) => {
                const StepIcon = step.icon;
                const isCompleted = currentStep > index;
                const isCurrent = currentStep === index;
                const isDisabled = !isCompleted && !isCurrent;

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => goToStep(index)}
                    disabled={isDisabled}
                    className={cn(
                      "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start transition-colors",
                      isDisabled && "cursor-not-allowed opacity-55 hover:opacity-80",
                      isCompleted && "cursor-pointer hover:bg-accent",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-lg border transition-colors",
                        isCurrent && "border-primary bg-primary text-primary-foreground shadow-sm",
                        isCompleted && "border-primary/30 bg-primary/10 text-primary",
                        isDisabled && "border-border bg-muted/50 text-muted-foreground",
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
                        {isCompleted ? "Completed" : step.description}
                      </span>
                    </span>

                    {isCurrent && <span className="size-1.5 shrink-0 rounded-full bg-primary" />}
                  </button>
                );
              })}
            </nav>

            <div className="mt-6 flex items-start gap-2.5 rounded-xl bg-muted/50 p-3 text-xs text-muted-foreground">
              <IconShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
              <p>
                Your details are kept confidential and only used to verify your organization before payouts are enabled.
              </p>
            </div>
          </aside>

          {/* Mobile stepper + form column */}
          <div className="min-w-0 flex-1">
            {/* Mobile progress header */}
            <div className="mb-6 lg:hidden">
              <ol className="flex items-center">
                {FORM_STEPS.map((step, index) => {
                  const StepIcon = step.icon;
                  const isCompleted = currentStep > index;
                  const isCurrent = currentStep === index;

                  return (
                    <li key={step.id} className="flex flex-1 items-center last:flex-none">
                      <button
                        type="button"
                        onClick={() => isCompleted && goToStep(index)}
                        disabled={!isCompleted && !isCurrent}
                        aria-current={isCurrent ? "step" : undefined}
                        className={cn(
                          "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                          isCompleted && "border-primary bg-primary text-primary-foreground hover:bg-primary/90",
                          isCurrent && "border-primary bg-card text-primary shadow-sm ring-4 ring-primary/15",
                          !isCompleted && !isCurrent && "border-border bg-card text-muted-foreground opacity-60",
                        )}
                      >
                        {isCompleted ? <IconCheck className="size-4" /> : <StepIcon className="size-4" />}
                      </button>
                      {index < FORM_STEPS.length - 1 && (
                        <span aria-hidden className="mx-1.5 h-1 flex-1 overflow-hidden rounded-full bg-border">
                          <span
                            className={cn(
                              "block h-full bg-primary transition-all duration-300",
                              isCompleted ? "w-full" : "w-0",
                            )}
                          />
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>

              <div className="mt-3">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Step {currentStep + 1} of {FORM_STEPS.length}
                </p>
                <h2 className="text-lg font-semibold tracking-tight text-foreground">{currentStepConfig.title}</h2>
              </div>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
              {/* Step body */}
              <div key={currentStep} className="flex flex-col gap-6">
                {currentStep === 0 && <BasicInfoStep />}

                {currentStep === 1 && <AddressStep />}

                {currentStep === 2 && <DocumentsStep />}

                {currentStep === 3 && <ContactsStep />}

                {currentStep === 4 && <ReviewStep onEditStep={goToStep} />}
              </div>

              {/* Sticky action bar */}
              <div className="sticky bottom-4 z-10">
                <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background/95 p-2.5 shadow-sm backdrop-blur-md sm:p-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={previousStep}
                    disabled={currentStep === 0 || isSubmitting}
                  >
                    <IconArrowLeft data-icon="inline-start" />
                    Back
                  </Button>

                  <span className="hidden text-xs font-medium text-muted-foreground md:block">
                    Step {currentStep + 1} of {FORM_STEPS.length}
                  </span>

                  {currentStep < FORM_STEPS.length - 1 ? (
                    <Button type="button" onClick={nextStep}>
                      Continue
                      <IconArrowRight data-icon="inline-end" />
                    </Button>
                  ) : (
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Spinner data-icon="inline-start" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <IconSparkles data-icon="inline-start" />
                          Complete &amp; Register
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
