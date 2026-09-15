import baseApi from "@/lib/apis/base.api";
import type { CategoryOption } from "../_types";
import type { CreateOrganizationInput } from "../_schemas/create-organization.schema";

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

export const organizationService = {
  /**
   * Fetch categories and subcategories
   */
  getCategories: async (): Promise<CategoryOption[]> => {
    try {
      const response = await baseApi.get<CategoryOption[]>("/organizations/categories");
      if (response.data && response.data.length > 0) {
        return response.data;
      }
      return DEFAULT_CATEGORIES;
    } catch {
      // Fallback to local default categories
      return DEFAULT_CATEGORIES;
    }
  },

  /**
   * Create an organization with multipart/form-data support
   */
  createOrganization: async (
    data: CreateOrganizationInput,
    logoFile: File | null,
    documentFiles: Array<File | null>,
  ) => {
    const formData = new FormData();

    // Basic details
    formData.append("name", data.name);
    if (data.slug) formData.append("slug", data.slug);
    if (data.categoryId) formData.append("categoryId", String(data.categoryId));
    if (data.subCategoryId) formData.append("subCategoryId", String(data.subCategoryId));
    if (data.description) formData.append("description", data.description);
    if (data.email) formData.append("email", data.email);
    if (data.phoneNumber) formData.append("phoneNumber", data.phoneNumber);
    formData.append("allowPaidEvents", String(Boolean(data.allowPaidEvents)));
    if (data.commissionPercentage !== undefined) {
      formData.append("commissionPercentage", String(data.commissionPercentage));
    }

    // Logo file
    if (logoFile) {
      formData.append("logo", logoFile);
    } else if (data.logo instanceof File) {
      formData.append("logo", data.logo);
    }

    // Address object as JSON string
    formData.append("address", JSON.stringify(data.address));

    // Social links and support contacts as JSON strings
    formData.append("socialLinks", JSON.stringify(data.socialLinks));
    formData.append("supportContacts", JSON.stringify(data.supportContacts));

    // Documents metadata and binary files
    const documentsMetadata = data.document.map((doc, index) => ({
      type: doc.type,
      index,
    }));
    formData.append("documentsMetadata", JSON.stringify(documentsMetadata));

    // Append document files with indexed keys
    documentFiles.forEach((file, index) => {
      if (file) {
        formData.append(`document_${index}`, file);
      } else if (data.document[index]?.file instanceof File) {
        formData.append(`document_${index}`, data.document[index].file);
      }
    });

    const response = await baseApi.post("/organizations", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },
};
