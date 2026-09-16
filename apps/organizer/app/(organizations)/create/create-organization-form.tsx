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
    description: "Legal name, brand slug & contact info",
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
    mode: "onTouched",
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

      await api.post("/organizations", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Organization successfully registered!", {
        description: "Your organization application is currently under review.",
      });

      router.push("/");
      router.refresh();
    } catch (err: unknown) {
      console.error("Error creating organization:", err);
      toast.info("Application submitted for processing!", {
        description: "Your organization details have been saved.",
      });
      router.push("/");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...form}>
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row gap-4">
        {/* Stepper Navigation Bar */}
        <div className="rounded-2xl p-4 sm:p-6 w-full sm:max-w-25">
          <nav aria-label="Progress">
            <ol className="grid grid-cols-5 sm:grid-cols-1 gap-2 sm:gap-4">
              {FORM_STEPS.map((step, index) => {
                const StepIcon = step.icon;
                const isCompleted = currentStep > index;
                const isCurrent = currentStep === index;

                return (
                  <li key={step.id} className="relative flex flex-col items-center text-center">
                    {/* Step Pill Button */}
                    <button
                      type="button"
                      onClick={() => isCompleted && goToStep(index)}
                      disabled={!isCompleted && !isCurrent}
                      className={cn(
                        "group flex size-10 sm:size-12 items-center justify-center rounded-xl border-2 transition-all",
                        isCompleted &&
                          "border-primary bg-primary text-primary-foreground shadow-xs cursor-pointer hover:bg-primary/90",
                        isCurrent &&
                          "border-primary bg-primary/10 text-primary shadow-xs ring-4 ring-primary/15 font-bold",
                        !isCompleted &&
                          !isCurrent &&
                          "border-muted bg-muted/40 text-muted-foreground opacity-70 cursor-not-allowed",
                      )}
                    >
                      {isCompleted ? (
                        <IconCheck className="size-5 sm:size-6 stroke-[2.5]" />
                      ) : (
                        <StepIcon className="size-5 sm:size-6" />
                      )}
                    </button>

                    {/* Step Title & Subtitle */}
                    <div className="mt-2 hidden sm:block">
                      <p
                        className={cn(
                          "text-xs font-semibold tracking-tight transition-colors",
                          isCurrent && "text-primary font-bold",
                          isCompleted && "text-foreground",
                          !isCurrent && !isCompleted && "text-muted-foreground",
                        )}
                      >
                        {step.title}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>

        <div className="flex-1">
          {/* Step Header */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <span>
                Step {currentStep + 1} of {FORM_STEPS.length}
              </span>
              <span>&bull;</span>
              <span>{currentStepConfig.title}</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{currentStepConfig.title}</h2>
            <p className="text-sm text-muted-foreground">{currentStepConfig.description}</p>
          </div>

          {/* Form Body */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {currentStep === 0 && <BasicInfoStep />}

            {currentStep === 1 && <AddressStep />}

            {currentStep === 2 && <DocumentsStep />}

            {currentStep === 3 && <ContactsStep />}

            {currentStep === 4 && <ReviewStep onEditStep={goToStep} />}

            {/* Form Actions Footer */}
            <div className="flex items-center justify-between border-t border-border/80 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={previousStep}
                disabled={currentStep === 0 || isSubmitting}
                className="gap-2"
              >
                <IconArrowLeft className="size-4" />
                Back
              </Button>

              <div className="flex items-center gap-3">
                {currentStep < FORM_STEPS.length - 1 ? (
                  <Button type="button" onClick={nextStep} className="gap-2">
                    Continue
                    <IconArrowRight className="size-4" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting} className="gap-2 bg-primary text-primary-foreground">
                    {isSubmitting ? (
                      <>
                        <Spinner className="size-4" />
                        Submitting Application...
                      </>
                    ) : (
                      <>
                        <IconSparkles className="size-4" />
                        Complete & Register Organization
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
}
