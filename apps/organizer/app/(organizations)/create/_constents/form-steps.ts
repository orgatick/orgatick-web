import type { Icon } from "@tabler/icons-react";
import { IconBuilding, IconChecklist, IconFileText, IconMapPin, IconShare } from "@tabler/icons-react";
import type { CreateOrganizationInput } from "@orgatick/contracts";

export const ORGANIZATION_FORM_ID = "organization-create-form";

export interface OrganizationFormStep {
  id: string;
  title: string;
  description: string;
  icon: Icon;
  fields: readonly (keyof CreateOrganizationInput)[];
}

export const ORGANIZATION_FORM_STEPS: readonly OrganizationFormStep[] = [
  {
    id: "basic",
    title: "Basic Info",
    description: "Legal name, brand slug & contact details",
    icon: IconBuilding,
    fields: ["basicInfo"],
  },
  {
    id: "address",
    title: "Address",
    description: "Registered office & headquarters",
    icon: IconMapPin,
    fields: ["address"],
  },
  {
    id: "documents",
    title: "Documents",
    description: "KYC & compliance certificates",
    icon: IconFileText,
    fields: ["document"],
  },
  {
    id: "contacts",
    title: "Social & Support",
    description: "Online links & support representatives",
    icon: IconShare,
    fields: ["socialLinks", "supportContacts"],
  },
  {
    id: "review",
    title: "Review",
    description: "Verify all details and submit",
    icon: IconChecklist,
    fields: [],
  },
];
