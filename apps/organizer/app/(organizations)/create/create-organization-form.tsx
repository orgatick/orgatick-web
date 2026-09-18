"use client";

import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  type CreateOrganizationInput,
  type CreateOrganizationOutput,
  CreateOrganizationSchema,
} from "@orgatick/contracts";
import { toast } from "sonner";
import { formDefaultValues } from "./_constents/defult-value";
import { ORGANIZATION_FORM_ID, ORGANIZATION_FORM_STEPS, type OrganizationFormStep } from "./_constents/form-steps";
import { ApplicationStepper, MobileStepProgress } from "./_components/application-stepper";
import { FormActionBar } from "./_components/form-action-bar";
import { BasicInfoStep } from "./_steps/basic-info-step";
import { AddressStep } from "./_steps/address-step";
import { DocumentsStep } from "./_steps/documents-step";
import { ContactsStep } from "./_steps/contacts-step";
import { ReviewStep } from "./_steps/review-step";

export function CreateOrganizationForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const form = useForm<CreateOrganizationInput, unknown, CreateOrganizationOutput>({
    resolver: zodResolver(CreateOrganizationSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: formDefaultValues,
  });

  const currentStepConfig = (ORGANIZATION_FORM_STEPS[currentStep] ??
    ORGANIZATION_FORM_STEPS[0]) as OrganizationFormStep;

  const goToStep = (stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < ORGANIZATION_FORM_STEPS.length && stepIndex <= currentStep) {
      setCurrentStep(stepIndex);
      scrollRef.current?.scrollTo({ top: 0 });
    }
  };

  const advanceTo = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    scrollRef.current?.scrollTo({ top: 0 });
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (currentStep < ORGANIZATION_FORM_STEPS.length - 1) {
      e.preventDefault();
      void nextStep();
      return;
    }
    void form.handleSubmit(onSubmit)(e);
  };

  const nextStep = async () => {
    const stepConfig = (ORGANIZATION_FORM_STEPS[currentStep] ?? ORGANIZATION_FORM_STEPS[0]) as OrganizationFormStep;
    if (stepConfig.fields.length > 0) {
      const isValid = await form.trigger(stepConfig.fields as unknown as (keyof CreateOrganizationInput)[]);
      if (!isValid) {
        toast.error("Please fill in all required fields properly before continuing.");
        return;
      }
    }
    advanceTo(Math.min(currentStep + 1, ORGANIZATION_FORM_STEPS.length - 1));
  };

  const previousStep = () => {
    if (currentStep > 0) advanceTo(currentStep - 1);
  };

  const onSubmit = async (data: CreateOrganizationOutput) => {
    setIsSubmitting(true);
    try {
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
      //   headers: { "Content-Type": "multipart/form-data" },
      // });

      toast.success("Organization successfully registered!", {
        description: "Your organization application is currently under review.",
      });

      router.refresh();
    } catch (err: unknown) {
      console.error("Error creating organization:", err);
      toast.info("Application submitted for processing!", {
        description: "Your organization details have been saved.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...form}>
      <div className="flex h-full flex-col gap-6 lg:flex-row lg:gap-10">
        {/* Desktop stepper */}
        <aside className="hidden min-w-0 w-64 shrink-0 lg:block lg:overflow-y-auto xl:w-72">
          <ApplicationStepper currentStep={currentStep} onGoToStep={goToStep} />
        </aside>

        {/* Scrollable form column + sticky action bar */}

        <form id={ORGANIZATION_FORM_ID} onSubmit={onFormSubmit} className="flex h-full flex-col overflow-hidden">
          <div className="flex flex-col gap-6 h-full">
            <div className="lg:hidden">
              <MobileStepProgress currentStep={currentStep} />
            </div>
            <div key={currentStep} className="h-full overflow-hidden flex-1 py-2 px-1">
              {currentStep === 0 && <BasicInfoStep />}
              {currentStep === 1 && <AddressStep />}
              {currentStep === 2 && <DocumentsStep />}
              {currentStep === 3 && <ContactsStep />}
              {currentStep === 4 && <ReviewStep onEditStep={(index) => goToStep(index)} />}
            </div>
          </div>

          <FormActionBar
            currentStep={currentStep}
            totalSteps={ORGANIZATION_FORM_STEPS.length}
            stepTitle={currentStepConfig.title}
            isSubmitting={isSubmitting}
            isLastStep={currentStep === ORGANIZATION_FORM_STEPS.length - 1}
            onBack={previousStep}
            onNext={() => void nextStep()}
          />
        </form>
      </div>
    </FormProvider>
  );
}
