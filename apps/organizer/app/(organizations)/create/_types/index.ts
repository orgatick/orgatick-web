import type { ComponentType } from "react";
import type { Icon } from "@tabler/icons-react";
import type { UseFormReturn } from "react-hook-form";
import type { OrganizationDocumentType, OrganizationSocialPlatform } from "../_constants";

export type FormStep = 1 | 2 | 3 | 4 | 5;

export interface CategorySubOption {
  id: number;
  name: string;
  description?: string;
}

export interface CategoryOption {
  id: number;
  name: string;
  subCategories: CategorySubOption[];
}

export interface AddressFormState {
  countryId: number | string;
  divisionId?: number | string | null;
  cityId?: number | string | null;
  addressLine1: string;
  addressLine2?: string | null;
  landmark?: string | null;
  postalCode?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  formattedAddress?: string | null;
}

export interface DocumentUploadItem {
  type: OrganizationDocumentType;
  file?: File | null;
}

export interface SocialLinkItem {
  platform: OrganizationSocialPlatform;
  url: string;
}

export interface SupportContactItem {
  name: string;
  email: string;
  phoneNumber: string;
  isPrimary: boolean;
}

/**
 * Standard typed form values for React Hook Form
 */
export interface OrganizationFormValues {
  name: string;
  slug?: string;
  categoryId?: number | null;
  subCategoryId: number;
  address: AddressFormState;
  description?: string | null;
  logo?: File | null;
  email?: string | null;
  phoneNumber?: string | null;
  allowPaidEvents: boolean;
  commissionPercentage?: number;
  document: DocumentUploadItem[];
  socialLinks: SocialLinkItem[];
  supportContacts: SupportContactItem[];
}

export type OrganizationFormReturn = UseFormReturn<OrganizationFormValues>;

/**
 * Serializable draft state for localStorage via Zustand persist
 */
export interface SerializedDocumentDraft {
  type: OrganizationDocumentType;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
}

export interface SerializedDraftData {
  name: string;
  slug?: string;
  categoryId?: number | null;
  subCategoryId?: number | null;
  description?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  allowPaidEvents: boolean;
  commissionPercentage?: number;
  logoMeta?: {
    name: string;
    size: number;
    type: string;
  } | null;
  address: AddressFormState;
  document: SerializedDocumentDraft[];
  socialLinks: SocialLinkItem[];
  supportContacts: SupportContactItem[];
}
