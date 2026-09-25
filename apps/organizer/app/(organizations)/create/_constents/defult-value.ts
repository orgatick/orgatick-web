import {
  type CreateOrganizationInput,
  OrganizationDocumentType,
  OrganizationSocialPlatform,
} from "@orgatick/contracts";

/** Bridge fields consumed by the reusable AddressForm widget (uuid-string keys),
 * kept in step with the bigint `*Id` fields required by CreateOrganizationSchema.
 * uuid values are the string form of the numeric ids ("1" <-> 1n). */
type OrganizationAddressDefaults = CreateOrganizationInput["address"] & {
  countryUuid: string;
  divisionUuid: string | null;
  divisionUuid2: string | null;
  cityUuid: string | null;
};

export type CreateOrganizationFormDefaults = Omit<CreateOrganizationInput, "address"> & {
  address: OrganizationAddressDefaults;
};

export const formDefaultValues: CreateOrganizationFormDefaults = {
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
    divisionId2: null,
    cityId: null,
    countryUuid: "1",
    divisionUuid: null,
    divisionUuid2: null,
    cityUuid: null,
    addressLine1: "",
    addressLine2: null,
    landmark: null,
    postalCode: "",
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
