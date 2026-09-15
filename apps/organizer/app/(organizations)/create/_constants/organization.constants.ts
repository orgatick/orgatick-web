import {
  IconBuildingCommunity,
  IconFileCheck,
  IconGlobe,
  IconMapPin,
  IconRocket,
  IconShare,
  IconBrandX,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconBrandYoutube,
  IconBrandGithub,
  IconBrandDiscord,
  IconBrandTelegram,
  IconLink,
} from "@tabler/icons-react";
import type { ComponentType } from "react";
import type { Icon } from "@tabler/icons-react";
import type { FormStep, CategoryOption } from "../_types";

export enum OrganizationDocumentType {
  MSME = "MSME",
  AADHAR = "AADHAR",
  BANK_ACCOUNT = "BANK_ACCOUNT",
  PAN = "PAN",
  GST = "GST",
}

export enum OrganizationSocialPlatform {
  WEBSITE = "website",
  TWITTER = "twitter",
  INSTAGRAM = "instagram",
  FACEBOOK = "facebook",
  LINKEDIN = "linkedin",
  YOUTUBE = "youtube",
  GITHUB = "github",
  DISCORD = "discord",
  TELEGRAM = "telegram",
  OTHER = "other",
}

export interface StepConfig {
  id: FormStep;
  title: string;
  subtitle: string;
  description: string;
  icon: Icon | ComponentType<{ className?: string }>;
}

export const ORGANIZATION_FORM_STEPS: StepConfig[] = [
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

export const DOCUMENT_TYPE_CONFIG: Record<
  OrganizationDocumentType,
  { label: string; description: string; acceptedFormats: string }
> = {
  [OrganizationDocumentType.GST]: {
    label: "GST Certificate",
    description: "Goods and Services Tax Registration Certificate (Form REG-06)",
    acceptedFormats: ".pdf, .jpg, .png",
  },
  [OrganizationDocumentType.PAN]: {
    label: "Company / Trust PAN",
    description: "Permanent Account Number card of the entity or authorized trustee",
    acceptedFormats: ".pdf, .jpg, .png",
  },
  [OrganizationDocumentType.MSME]: {
    label: "MSME / Udyam Certificate",
    description: "Udyam Registration Certificate for micro/small enterprises",
    acceptedFormats: ".pdf, .jpg, .png",
  },
  [OrganizationDocumentType.AADHAR]: {
    label: "Authorized Signatory Aadhaar",
    description: "Identity verification for authorized representative / organizer",
    acceptedFormats: ".pdf, .jpg, .png",
  },
  [OrganizationDocumentType.BANK_ACCOUNT]: {
    label: "Bank Account Proof / Cancelled Cheque",
    description: "Bank statement, passbook copy, or cancelled cheque for payout processing",
    acceptedFormats: ".pdf, .jpg, .png",
  },
};

export const SOCIAL_PLATFORM_CONFIG: Record<
  OrganizationSocialPlatform,
  { label: string; placeholder: string; icon: React.ComponentType<{ className?: string }> }
> = {
  [OrganizationSocialPlatform.WEBSITE]: {
    label: "Official Website",
    placeholder: "https://yourorg.com",
    icon: IconGlobe,
  },
  [OrganizationSocialPlatform.TWITTER]: {
    label: "X (Twitter)",
    placeholder: "https://x.com/yourorg",
    icon: IconBrandX,
  },
  [OrganizationSocialPlatform.INSTAGRAM]: {
    label: "Instagram",
    placeholder: "https://instagram.com/yourorg",
    icon: IconBrandInstagram,
  },
  [OrganizationSocialPlatform.LINKEDIN]: {
    label: "LinkedIn",
    placeholder: "https://linkedin.com/company/yourorg",
    icon: IconBrandLinkedin,
  },
  [OrganizationSocialPlatform.FACEBOOK]: {
    label: "Facebook",
    placeholder: "https://facebook.com/yourorg",
    icon: IconBrandFacebook,
  },
  [OrganizationSocialPlatform.YOUTUBE]: {
    label: "YouTube",
    placeholder: "https://youtube.com/@yourorg",
    icon: IconBrandYoutube,
  },
  [OrganizationSocialPlatform.GITHUB]: {
    label: "GitHub",
    placeholder: "https://github.com/yourorg",
    icon: IconBrandGithub,
  },
  [OrganizationSocialPlatform.DISCORD]: {
    label: "Discord Community",
    placeholder: "https://discord.gg/yourinvite",
    icon: IconBrandDiscord,
  },
  [OrganizationSocialPlatform.TELEGRAM]: {
    label: "Telegram Channel",
    placeholder: "https://t.me/yourorg",
    icon: IconBrandTelegram,
  },
  [OrganizationSocialPlatform.OTHER]: {
    label: "Other Link",
    placeholder: "https://linktr.ee/yourorg",
    icon: IconLink,
  },
};

export const FORM_LIMITS = {
  MIN_DOCUMENTS: 2,
  MAX_DOCUMENTS: 5,
  MIN_SOCIAL_LINKS: 1,
  MAX_SOCIAL_LINKS: 6,
  MIN_SUPPORT_CONTACTS: 1,
  MAX_SUPPORT_CONTACTS: 6,
  MAX_FILE_SIZE_BYTES: 5 * 1024 * 1024, // 5MB
  DEFAULT_COMMISSION_PERCENTAGE: 7.0,
} as const;

export const DEFAULT_CATEGORIES: CategoryOption[] = [
  {
    id: 1,
    name: "Tech & Innovation",
    subCategories: [
      { id: 101, name: "Hackathons & Competitions" },
      { id: 102, name: "Developer Conferences" },
      { id: 103, name: "Workshops & Bootcamps" },
      { id: 104, name: "AI & Data Summits" },
    ],
  },
  {
    id: 2,
    name: "College & Campus",
    subCategories: [
      { id: 201, name: "Cultural Festivals" },
      { id: 202, name: "Technical Symposiums" },
      { id: 203, name: "Sports Meets & Tournaments" },
      { id: 204, name: "Alumni & Fresher Events" },
    ],
  },
  {
    id: 3,
    name: "Music, Arts & Entertainment",
    subCategories: [
      { id: 301, name: "Live Concerts & Gigs" },
      { id: 302, name: "Standup Comedy" },
      { id: 303, name: "Theatre & Drama" },
      { id: 304, name: "Art Exhibitions" },
    ],
  },
  {
    id: 4,
    name: "Business & Networking",
    subCategories: [
      { id: 401, name: "Startup Pitch & Demo Days" },
      { id: 402, name: "Industry Expos" },
      { id: 403, name: "Leadership Summits" },
      { id: 404, name: "Founder Roundtables" },
    ],
  },
  {
    id: 5,
    name: "Sports, Fitness & Gaming",
    subCategories: [
      { id: 501, name: "Marathons & Runs" },
      { id: 502, name: "Esports Tournaments" },
      { id: 503, name: "Yoga & Wellness Retreats" },
      { id: 504, name: "Football & Cricket Leagues" },
    ],
  },
  {
    id: 6,
    name: "Community & Non-Profit",
    subCategories: [
      { id: 601, name: "Charity & Fundraising" },
      { id: 602, name: "Social Awareness Drives" },
      { id: 603, name: "Volunteering Meetups" },
    ],
  },
];
