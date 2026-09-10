import api from "@/lib/apis/auth.api";
import type { AddressDataLoader } from "@orgatick/address";
import type {
  AddressCityRef,
  AddressCountryRef,
  AddressDivisionRef,
  AddressResponse,
  CreateAddressDto,
} from "@orgatick/contracts";

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
  /**
   * GET /countries?search=...
   */
  async getCountries(search?: string): Promise<AddressCountryRef[]> {
    const res = await api.get("/countries", {
      params: {
        search: search?.trim() || undefined,
        limit: 300,
      },
    });
    return extractArray<AddressCountryRef>(res.data);
  },

  /**
   * GET /administrative-divisions?countryUuid=...&search=...
   */
  async getAdministrativeDivisions(countryUuid: string, search?: string): Promise<AddressDivisionRef[]> {
    const res = await api.get("/administrative-divisions", {
      params: {
        countryUuid,
        search: search?.trim() || undefined,
        limit: 100,
      },
    });
    return extractArray<AddressDivisionRef>(res.data);
  },

  /**
   * GET /cities?admin1Uuid=...&search=...
   */
  async getCities(divisionUuid: string, search?: string, countryUuid?: string): Promise<AddressCityRef[]> {
    const res = await api.get("/cities", {
      params: {
        admin1Uuid: divisionUuid,
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
  loadDivisions: (countryUuid: string, search?: string) => addressApi.getAdministrativeDivisions(countryUuid, search),
  loadCities: (divisionUuid: string, search?: string) => addressApi.getCities(divisionUuid, search),
};
