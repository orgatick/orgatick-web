import { z } from "zod";
import { CreateAddressSchema } from "@orgatick/contracts";
import { OrganizationDocumentType, OrganizationSocialPlatform, FORM_LIMITS } from "../_constants";

/**
 * Organization Document Upload Schema
 */
export const OrganizationDocumentUploadSchema = z.object({
  type: z.nativeEnum(OrganizationDocumentType, {
    message: "Invalid document type",
  }),
  file: z
    .custom<File | null | undefined>((val) => {
      if (val === null || val === undefined) return true;
      if (typeof window !== "undefined" && val instanceof File) return true;
      return typeof val === "object";
    })
    .refine((file) => {
      if (!file || !(file instanceof File)) return true;
      return file.size <= FORM_LIMITS.MAX_FILE_SIZE_BYTES;
    }, "File size must not exceed 5MB")
    .refine((file) => {
      if (!file || !(file instanceof File)) return true;
      return [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/jpeg",
        "image/png",
        "image/webp",
      ].includes(file.type);
    }, "Invalid file type. Only PDF, Word, and Image files are allowed.")
    .optional()
    .nullable(),
});

/**
 * Organization Social Link Schema
 */
export const OrganizationSocialLinkInputSchema = z.object({
  platform: z.nativeEnum(OrganizationSocialPlatform, {
    message: "Invalid social platform",
  }),
  url: z.string().min(1, "URL is required").url("Must be a valid URL (e.g. https://twitter.com/yourorg)"),
});

/**
 * Organization Support Contact Schema
 */
export const OrganizationSupportContactInputSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(255, "Name is too long"),
  email: z.string().email("Invalid email format"),
  phoneNumber: z.string().min(5, "Phone number is too short").max(30, "Phone number must not exceed 30 characters"),
  isPrimary: z.boolean().default(false),
});

/**
 * CreateOrganizationSchema
 * Matches orgatick contracts specification exactly
 */
export const CreateOrganizationSchema = z.object({
  name: z
    .string()
    .min(2, "Organization name must be at least 2 characters")
    .max(255, "Organization name must not exceed 255 characters")
    .trim(),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase alphanumeric with hyphens")
    .optional()
    .or(z.literal("")),
  categoryId: z.coerce.number().int().positive("Category ID must be a positive integer").optional().nullable(),
  subCategoryId: z.coerce.number().int().positive("Sub-category ID must be a positive integer"),
  address: CreateAddressSchema,
  description: z.string().max(5000, "Description must not exceed 5000 characters").optional().nullable(),
  logo: z
    .custom<File | null | undefined>((val) => {
      if (val === null || val === undefined) return true;
      if (typeof window !== "undefined" && val instanceof File) return true;
      return typeof val === "object";
    })
    .refine((file) => {
      if (!file || !(file instanceof File)) return true;
      return file.size <= FORM_LIMITS.MAX_FILE_SIZE_BYTES;
    }, "Logo must not exceed 5MB")
    .refine((file) => {
      if (!file || !(file instanceof File)) return true;
      return ["image/jpeg", "image/png", "image/webp"].includes(file.type);
    }, "Logo must be a JPEG, PNG, or WebP image")
    .optional()
    .nullable(),
  email: z.string().email("Invalid email format").max(320).optional().nullable().or(z.literal("")),
  phoneNumber: z.string().max(30, "Phone number is too long").optional().nullable().or(z.literal("")),
  allowPaidEvents: z.boolean().default(false),
  commissionPercentage: z.coerce.number().min(0).max(100).default(FORM_LIMITS.DEFAULT_COMMISSION_PERCENTAGE).optional(),

  document: z
    .array(OrganizationDocumentUploadSchema)
    .min(FORM_LIMITS.MIN_DOCUMENTS, `At least ${FORM_LIMITS.MIN_DOCUMENTS} documents are required`)
    .max(FORM_LIMITS.MAX_DOCUMENTS, `No more than ${FORM_LIMITS.MAX_DOCUMENTS} documents are allowed`),
  socialLinks: z
    .array(OrganizationSocialLinkInputSchema)
    .min(FORM_LIMITS.MIN_SOCIAL_LINKS, `At least ${FORM_LIMITS.MIN_SOCIAL_LINKS} social link is required`)
    .max(FORM_LIMITS.MAX_SOCIAL_LINKS, `No more than ${FORM_LIMITS.MAX_SOCIAL_LINKS} social links allowed`),
  supportContacts: z
    .array(OrganizationSupportContactInputSchema)
    .min(FORM_LIMITS.MIN_SUPPORT_CONTACTS, `At least ${FORM_LIMITS.MIN_SUPPORT_CONTACTS} support contact is required`)
    .max(FORM_LIMITS.MAX_SUPPORT_CONTACTS, `No more than ${FORM_LIMITS.MAX_SUPPORT_CONTACTS} support contacts allowed`),
});

export type CreateOrganization = z.infer<typeof CreateOrganizationSchema>;
export type CreateOrganizationInput = z.input<typeof CreateOrganizationSchema>;
export type CreateOrganizationOutput = z.output<typeof CreateOrganizationSchema>;
