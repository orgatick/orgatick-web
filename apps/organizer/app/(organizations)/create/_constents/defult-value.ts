import {
  type CreateOrganizationInput,
  OrganizationDocumentType,
  OrganizationSocialPlatform,
} from "@orgatick/contracts";

export const formDefaultValues: CreateOrganizationInput = {
  basicInfo: {
    name: "",
    slug: "",
    categoryId: 1,
    subCategoryId: 101,
    description: "",
    logo: null,
    email: "",
    phoneNumber: "",
  },
  address: {
    countryId: 1n,
    divisionId: null,
    cityId: null,
    addressLine1: "",
    addressLine2: null,
    landmark: null,
    postalCode: null,
    latitude: null,
    longitude: null,
    formattedAddress: null,
  },
  document: [
    {
      type: OrganizationDocumentType.PAN,
      file: null,
    },
    {
      type: OrganizationDocumentType.GST,
      file: null,
    },
  ],
  socialLinks: [
    {
      platform: OrganizationSocialPlatform.WEBSITE,
      url: "",
    },
  ],
  supportContacts: [
    {
      name: "",
      email: "",
      phoneNumber: "",
      isPrimary: true,
    },
  ],
};
