"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { handleApiError } from "@/lib/apis/api-error";
import { useOrganizationCreateStore } from "../_store";
import { organizationService } from "../_services";
import type { CategoryOption, FormStep } from "../_types";
import { StepIndicator } from "./step-indicator";
import { DraftBanner } from "./draft-banner";
import { Step1BasicInfo } from "./step-1-basic-info";
import { Step2Address } from "./step-2-address";
import { Step3Documents } from "./step-3-documents";
import { Step4SocialSupport } from "./step-4-social-support";
import { Step5Review } from "./step-5-review";
import { CreateOrganization, CreateOrganizationSchema } from "@orgatick/contracts";

interface CreateOrganizationFormProps {
  initialCategories?: CategoryOption[];
}

export function CreateOrganizationForm({ initialCategories = [] }: CreateOrganizationFormProps) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [categories, setCategories] = useState<CategoryOption[]>(initialCategories);

  const {
    currentStep,
    completedSteps,
    draftData,
    lastSavedAt,
    hasRestoredDraft,
    logoFile,
    documentFiles,
    isSubmitting,
    setCurrentStep,
    nextStep,
    prevStep,
    markStepCompleted,
    updateDraft,
    setLogoFile,
    setDocumentFile,
    setIsSubmitting,
    dismissDraftNotification,
    resetDraft,
  } = useOrganizationCreateStore();

  const form = useForm<CreateOrganization>({
    resolver: zodResolver(CreateOrganizationSchema),
    mode: "onChange",
    defaultValues: {
      name: draftData.name || "",
      slug: draftData.slug || "",
      categoryId: draftData.categoryId || null,
      subCategoryId: draftData.subCategoryId || (0 as unknown as number),
      description: draftData.description || "",
      email: draftData.email || "",
      phoneNumber: draftData.phoneNumber || "",
      allowPaidEvents: draftData.allowPaidEvents ?? false,
      commissionPercentage: draftData.commissionPercentage ?? 7.0,
      address: {
        countryId: draftData.address.countryId || 1,
        divisionId: draftData.address.divisionId || null,
        cityId: draftData.address.cityId || null,
        addressLine1: draftData.address.addressLine1 || "",
        addressLine2: draftData.address.addressLine2 || "",
        landmark: draftData.address.landmark || "",
        postalCode: draftData.address.postalCode || "",
        latitude: draftData.address.latitude || null,
        longitude: draftData.address.longitude || null,
        formattedAddress: draftData.address.formattedAddress || "",
      },
      document: draftData.document.map((d) => ({
        type: d.type,
        file: null,
      })),
      socialLinks: draftData.socialLinks.map((s) => ({
        platform: s.platform,
        url: s.url,
      })),
      supportContacts: draftData.supportContacts.map((c) => ({
        name: c.name,
        email: c.email,
        phoneNumber: c.phoneNumber,
        isPrimary: c.isPrimary,
      })),
    },
  });

  // Client hydration sync
  useEffect(() => {
    setIsMounted(true);
    // Fetch categories if not passed
    if (initialCategories.length === 0) {
      organizationService.getCategories().then((cats) => {
        if (cats.length > 0) setCategories(cats);
      });
    }
  }, [initialCategories]);

  // Subscribe to form value changes and sync to Zustand draft
  useEffect(() => {
    const subscription = form.watch((value: CreateOrganization) => {
      if (value) {
        updateDraft({
          name: value.name || "",
          slug: value.slug || "",
          categoryId: value.categoryId !== undefined ? (value.categoryId ? Number(value.categoryId) : null) : null,
          subCategoryId:
            value.subCategoryId !== undefined ? (value.subCategoryId ? Number(value.subCategoryId) : null) : null,
          description: value.description || "",
          email: value.email || "",
          phoneNumber: value.phoneNumber || "",
          allowPaidEvents: Boolean(value.allowPaidEvents),
          commissionPercentage: Number(value.commissionPercentage) || 7.0,
          address: {
            countryId: value.address?.countryId ? Number(value.address.countryId) : 1,
            divisionId: value.address?.divisionId ? Number(value.address.divisionId) : null,
            cityId: value.address?.cityId ? Number(value.address.cityId) : null,
            addressLine1: value.address?.addressLine1 || "",
            addressLine2: value.address?.addressLine2 || "",
            landmark: value.address?.landmark || "",
            postalCode: value.address?.postalCode || "",
            latitude: value.address?.latitude || null,
            longitude: value.address?.longitude || null,
            formattedAddress: value.address?.formattedAddress || "",
          },
          socialLinks: (value.socialLinks || []).map((s) => ({
            platform: s?.platform!,
            url: s?.url || "",
          })),
          supportContacts: (value.supportContacts || []).map((c) => ({
            name: c?.name || "",
            email: c?.email || "",
            phoneNumber: c?.phoneNumber || "",
            isPrimary: Boolean(c?.isPrimary),
          })),
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [form, updateDraft]);

  // Step 1 Validation & Next
  const handleStep1Next = async () => {
    const isValid = await form.trigger([
      "name",
      "slug",
      "categoryId",
      "subCategoryId",
      "email",
      "phoneNumber",
      "description",
      "allowPaidEvents",
    ]);

    if (isValid) {
      markStepCompleted(1);
      nextStep();
    } else {
      toast.error("Please fill in the required fields with valid details.");
    }
  };

  // Step 2 Validation & Next
  const handleStep2Next = async () => {
    const isValid = await form.trigger([
      "address.addressLine1",
      "address.addressLine2",
      "address.landmark",
      "address.postalCode",
    ]);

    if (isValid) {
      markStepCompleted(2);
      nextStep();
    } else {
      toast.error("Please complete your registered address details.");
    }
  };

  // Step 3 Validation & Next
  const handleStep3Next = async () => {
    const isValid = await form.trigger(["document"]);

    if (isValid) {
      markStepCompleted(3);
      nextStep();
    } else {
      toast.error("Please provide at least 2 valid verification documents.");
    }
  };

  // Step 4 Validation & Next
  const handleStep4Next = async () => {
    const isValid = await form.trigger(["socialLinks", "supportContacts"]);

    if (isValid) {
      markStepCompleted(4);
      nextStep();
    } else {
      toast.error("Please provide valid social links and support contact details.");
    }
  };

  // Step 5: Final Submission
  const handleFinalSubmit = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      toast.error("Some form fields have errors. Please review each step.");
      return;
    }

    setIsSubmitting(true);
    try {
      const values = form.getValues();
      await organizationService.createOrganization(values, logoFile, documentFiles);

      toast.success("Organization created successfully! Redirecting to Dashboard...");
      resetDraft();
      router.push("/");
    } catch (error) {
      handleApiError(error, "Failed to create organization. Please review the details and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearDraft = () => {
    resetDraft();
    form.reset({
      name: "",
      slug: "",
      categoryId: null,
      subCategoryId: 0 as unknown as number,
      description: "",
      email: "",
      phoneNumber: "",
      allowPaidEvents: false,
      commissionPercentage: 7.0,
      address: {
        countryId: BigInt(1),
        divisionId: null,
        cityId: null,
        addressLine1: "",
        addressLine2: "",
        landmark: "",
        postalCode: "",
      },
      document: [
        { type: draftData.document[0]?.type!, file: null },
        { type: draftData.document[1]?.type!, file: null },
      ],
      socialLinks: [{ platform: draftData.socialLinks[0]?.platform!, url: "" }],
      supportContacts: [{ name: "", email: "", phoneNumber: "", isPrimary: true }],
    });
    toast.info("Draft cleared. Starting fresh.");
  };

  if (!isMounted) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8">
      {/* Draft Notification Banner */}
      {hasRestoredDraft && lastSavedAt && (
        <DraftBanner lastSavedAt={lastSavedAt} onClearDraft={handleClearDraft} onDismiss={dismissDraftNotification} />
      )}

      {/* Stepper Navigation Indicator */}
      <StepIndicator
        currentStep={currentStep}
        completedSteps={completedSteps}
        onStepClick={(step: FormStep) => setCurrentStep(step)}
      />

      {/* Multi-Step Form Body */}
      <div className="rounded-3xl border border-border/80 bg-card/60 p-6 shadow-xs backdrop-blur-sm sm:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            {currentStep === 1 && (
              <Step1BasicInfo
                form={form}
                onNext={handleStep1Next}
                logoFile={logoFile}
                onLogoChange={(file) => setLogoFile(file)}
                categories={categories}
              />
            )}

            {currentStep === 2 && <Step2Address form={form} onNext={handleStep2Next} onPrev={prevStep} />}

            {currentStep === 3 && (
              <Step3Documents
                form={form}
                onNext={handleStep3Next}
                onPrev={prevStep}
                documentFiles={documentFiles}
                onDocumentFileChange={(idx, file) => setDocumentFile(idx, file)}
              />
            )}

            {currentStep === 4 && <Step4SocialSupport form={form} onNext={handleStep4Next} onPrev={prevStep} />}

            {currentStep === 5 && (
              <Step5Review
                form={form}
                onPrev={prevStep}
                onEditStep={(step) => setCurrentStep(step)}
                onSubmit={handleFinalSubmit}
                isSubmitting={isSubmitting}
                logoFile={logoFile}
                documentFiles={documentFiles}
                categories={categories}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
