import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { OrganizationDocumentType, OrganizationSocialPlatform } from "@orgatick/contracts";
import type { FormStep, SerializedDraftData } from "../_types";

export const initialDraftData: SerializedDraftData = {
  name: "",
  slug: "",
  categoryId: null,
  subCategoryId: null,
  description: "",
  email: "",
  phoneNumber: "",
  allowPaidEvents: false,
  commissionPercentage: 7.0,
  logoMeta: null,
  address: {
    countryId: 1,
    divisionId: null,
    cityId: null,
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    postalCode: "",
    latitude: null,
    longitude: null,
    formattedAddress: "",
  },
  document: [
    { type: OrganizationDocumentType.GST, fileName: undefined, dataUrl: null },
    { type: OrganizationDocumentType.PAN, fileName: undefined, dataUrl: null },
  ],
  socialLinks: [{ platform: OrganizationSocialPlatform.WEBSITE, url: "" }],
  supportContacts: [{ name: "", email: "", phoneNumber: "", isPrimary: true }],
};

interface OrganizationCreateState {
  currentStep: FormStep;
  completedSteps: FormStep[];
  draftData: SerializedDraftData;
  isSubmitting: boolean;
  hasRestoredDraft: boolean;
  lastSavedAt: string | null;

  // In-memory File objects (cannot be serialized to localStorage)
  logoFile: File | null;
  documentFiles: Array<File | null>;

  // Actions
  setCurrentStep: (step: FormStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  markStepCompleted: (step: FormStep) => void;
  updateDraft: (data: Partial<SerializedDraftData>) => void;
  setLogoFile: (file: File | null, meta?: SerializedDraftData["logoMeta"]) => void;
  setDocumentFile: (index: number, file: File | null, fileName?: string, fileSize?: number, fileType?: string) => void;
  removeDocument: (index: number) => void;
  addDocument: (type?: OrganizationDocumentType) => void;
  addSocialLink: (platform?: OrganizationSocialPlatform) => void;
  removeSocialLink: (index: number) => void;
  addSupportContact: () => void;
  removeSupportContact: (index: number) => void;
  setPrimaryContact: (index: number) => void;
  setIsSubmitting: (submitting: boolean) => void;
  dismissDraftNotification: () => void;
  resetDraft: () => void;
}

export const useOrganizationCreateStore = create<OrganizationCreateState>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      completedSteps: [],
      draftData: initialDraftData,
      isSubmitting: false,
      hasRestoredDraft: false,
      lastSavedAt: null,
      logoFile: null,
      documentFiles: [null, null],

      setCurrentStep: (step) => {
        set({ currentStep: step });
      },

      nextStep: () => {
        const { currentStep, completedSteps } = get();
        const next = Math.min(5, currentStep + 1) as FormStep;
        const newCompleted = completedSteps.includes(currentStep) ? completedSteps : [...completedSteps, currentStep];
        set({ currentStep: next, completedSteps: newCompleted });
      },

      prevStep: () => {
        const { currentStep } = get();
        const prev = Math.max(1, currentStep - 1) as FormStep;
        set({ currentStep: prev });
      },

      markStepCompleted: (step) => {
        const { completedSteps } = get();
        if (!completedSteps.includes(step)) {
          set({ completedSteps: [...completedSteps, step] });
        }
      },

      updateDraft: (data) => {
        const { draftData } = get();
        set({
          draftData: {
            ...draftData,
            ...data,
            address: {
              ...draftData.address,
              ...(data.address || {}),
            },
          },
          lastSavedAt: new Date().toISOString(),
          hasRestoredDraft: true,
        });
      },

      setLogoFile: (file, meta) => {
        set((state) => ({
          logoFile: file,
          draftData: {
            ...state.draftData,
            logoMeta: meta ?? (file ? { name: file.name, size: file.size, type: file.type } : null),
          },
          lastSavedAt: new Date().toISOString(),
        }));
      },

      setDocumentFile: (index, file, fileName, fileSize, fileType) => {
        const { documentFiles, draftData } = get();
        const newDocFiles = [...documentFiles];
        newDocFiles[index] = file;

        const newDocs = [...draftData.document];
        if (newDocs[index]) {
          newDocs[index] = {
            ...newDocs[index],
            fileName: fileName || file?.name,
            fileSize: fileSize || file?.size,
            fileType: fileType || file?.type,
          };
        }

        set({
          documentFiles: newDocFiles,
          draftData: {
            ...draftData,
            document: newDocs,
          },
          lastSavedAt: new Date().toISOString(),
        });
      },

      addDocument: (type = OrganizationDocumentType.GST) => {
        const { draftData, documentFiles } = get();
        if (draftData.document.length >= 5) return;
        set({
          draftData: {
            ...draftData,
            document: [...draftData.document, { type, fileName: undefined, dataUrl: null }],
          },
          documentFiles: [...documentFiles, null],
        });
      },

      removeDocument: (index) => {
        const { draftData, documentFiles } = get();
        if (draftData.document.length <= 2) return;
        const newDocs = draftData.document.filter((_, i) => i !== index);
        const newFiles = documentFiles.filter((_, i) => i !== index);
        set({
          draftData: { ...draftData, document: newDocs },
          documentFiles: newFiles,
          lastSavedAt: new Date().toISOString(),
        });
      },

      addSocialLink: (platform = OrganizationSocialPlatform.WEBSITE) => {
        const { draftData } = get();
        if (draftData.socialLinks.length >= 6) return;
        set({
          draftData: {
            ...draftData,
            socialLinks: [...draftData.socialLinks, { platform, url: "" }],
          },
          lastSavedAt: new Date().toISOString(),
        });
      },

      removeSocialLink: (index) => {
        const { draftData } = get();
        if (draftData.socialLinks.length <= 1) return;
        set({
          draftData: {
            ...draftData,
            socialLinks: draftData.socialLinks.filter((_, i) => i !== index),
          },
          lastSavedAt: new Date().toISOString(),
        });
      },

      addSupportContact: () => {
        const { draftData } = get();
        if (draftData.supportContacts.length >= 6) return;
        set({
          draftData: {
            ...draftData,
            supportContacts: [...draftData.supportContacts, { name: "", email: "", phoneNumber: "", isPrimary: false }],
          },
          lastSavedAt: new Date().toISOString(),
        });
      },

      removeSupportContact: (index) => {
        const { draftData } = get();
        if (draftData.supportContacts.length <= 1) return;
        const removedWasPrimary = draftData.supportContacts[index]?.isPrimary;
        const newContacts = draftData.supportContacts.filter((_, i) => i !== index);
        if (removedWasPrimary && newContacts[0]) {
          newContacts[0].isPrimary = true;
        }
        set({
          draftData: { ...draftData, supportContacts: newContacts },
          lastSavedAt: new Date().toISOString(),
        });
      },

      setPrimaryContact: (index) => {
        const { draftData } = get();
        const newContacts = draftData.supportContacts.map((contact, i) => ({
          ...contact,
          isPrimary: i === index,
        }));
        set({
          draftData: { ...draftData, supportContacts: newContacts },
          lastSavedAt: new Date().toISOString(),
        });
      },

      setIsSubmitting: (submitting) => {
        set({ isSubmitting: submitting });
      },

      dismissDraftNotification: () => {
        set({ hasRestoredDraft: false });
      },

      resetDraft: () => {
        set({
          currentStep: 1,
          completedSteps: [],
          draftData: initialDraftData,
          logoFile: null,
          documentFiles: [null, null],
          hasRestoredDraft: false,
          lastSavedAt: null,
        });
      },
    }),
    {
      name: "orgatick-create-organization-draft",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentStep: state.currentStep,
        completedSteps: state.completedSteps,
        draftData: state.draftData,
        lastSavedAt: state.lastSavedAt,
        hasRestoredDraft: Boolean(state.draftData.name || state.draftData.slug),
      }),
    },
  ),
);
