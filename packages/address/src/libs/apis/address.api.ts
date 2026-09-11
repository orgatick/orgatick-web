import type { AddressDataLoader, CityQueryOptions, DivisionQueryOptions } from "@orgatick/address";
import type {
  AddressCityRef,
  AddressCountryRef,
  AddressDivisionRef,
  AddressResponse,
  CreateAddressDto,
} from "@orgatick/contracts";
import api from "./auth.api";

function extractArray<T>(data: unknown): T[] {
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object") {
    const record = data as Record<string, unknown>;
    if (Array.isArray(record.data)) return record.data as T[];
    if (record.data && typeof record.data === "object") {
      const nested = record.data as Record<string, unknown>;
      if (Array.isArray(nested.items)) return nested.items as T[];
      if (Array.isArray(nested.results)) return nested.results as T[];
    }
    if (Array.isArray(record.items)) return record.items as T[];
    if (Array.isArray(record.results)) return record.results as T[];
  }
  return [];
}

export const addressApi = {
  async getCountries(search?: string): Promise<AddressCountryRef[]> {
    const res = await api.get("/countries", {
      params: {
        search: search?.trim() || undefined,
        limit: 100,
      },
    });
    return extractArray<AddressCountryRef>(res.data);
  },

  /**
   * GET /administrative-divisions?countryUuid=...&search=...&level=...
   * Level 1 = State / Province, Level 2 = District / County
   */
  async getAdministrativeDivisions(
    countryUuid: string,
    search?: string,
    options?: DivisionQueryOptions,
  ): Promise<AddressDivisionRef[]> {
    const res = await api.get("/administrative-divisions", {
      params: {
        countryUuid,
        search: search?.trim() || undefined,
        level: options?.level ?? 1,
        parentUuid: options?.parentUuid || undefined,
        limit: 100,
      },
    });
    return extractArray<AddressDivisionRef>(res.data);
  },

  /**
   * GET /cities?admin1Uuid=...&search=...&countryUuid=...
   */
  async getCities(
    divisionUuid?: string,
    search?: string,
    countryUuidOrOptions?: string | CityQueryOptions,
  ): Promise<AddressCityRef[]> {
    const countryUuid =
      typeof countryUuidOrOptions === "string" ? countryUuidOrOptions : countryUuidOrOptions?.countryUuid;

    const res = await api.get("/cities", {
      params: {
        admin1Uuid: divisionUuid || undefined,
        countryUuid: countryUuid || undefined,
        search: search?.trim() || undefined,
        limit: 100,
      },
    });
    return extractArray<AddressCityRef>(res.data);
  },

  /**
   * POST /addresses
   */
  async createAddress(dto: CreateAddressDto): Promise<AddressResponse> {
    const res = await api.post<AddressResponse | { data: AddressResponse }>("/addresses", dto);
    const data = res.data;
    if (data && typeof data === "object" && "data" in data) {
      return (data as { data: AddressResponse }).data;
    }
    return data as AddressResponse;
  },

  /**
   * GET /addresses
   */
  async getAddresses(): Promise<AddressResponse[]> {
    const res = await api.get("/addresses");
    return extractArray<AddressResponse>(res.data);
  },
};

/**
 * Standard data loader instance for cascading country -> division -> city
 */
export const addressDataLoader: AddressDataLoader = {
  loadCountries: (search?: string) => addressApi.getCountries(search),
  loadDivisions: (countryUuid: string, search?: string, options?: DivisionQueryOptions) =>
    addressApi.getAdministrativeDivisions(countryUuid, search, options),
  loadCities: (divisionUuid?: string, search?: string, countryUuidOrOptions?: string | CityQueryOptions) =>
    addressApi.getCities(divisionUuid, search, countryUuidOrOptions),
};
