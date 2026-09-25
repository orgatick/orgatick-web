"use client";

import { useCallback, useEffect, useState } from "react";
import type { AddressCityRef, AddressCountryRef, AddressDivisionRef } from "@orgatick/contracts";
import type { AddressDataLoader } from "@orgatick/address/types";

interface UseAddressHierarchyOptions {
  dataLoader: AddressDataLoader;
  defaultCountryUuid?: string | null;
  defaultDivisionUuid?: string | null;
  defaultCityUuid?: string | null;
}

export function useAddressHierarchy({
  dataLoader,
  defaultCountryUuid,
  defaultDivisionUuid,
}: UseAddressHierarchyOptions) {
  const [countries, setCountries] = useState<AddressCountryRef[]>([]);
  const [divisions, setDivisions] = useState<AddressDivisionRef[]>([]);
  const [cities, setCities] = useState<AddressCityRef[]>([]);

  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingDivisions, setLoadingDivisions] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  const [error, setError] = useState<string | null>(null);

  // Load countries once on mount
  useEffect(() => {
    let isMounted = true;
    const fetchCountries = async () => {
      try {
        setLoadingCountries(true);
        setError(null);
        const data = await dataLoader.loadCountries();
        if (isMounted) {
          setCountries(data ?? []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load countries");
        }
      } finally {
        if (isMounted) {
          setLoadingCountries(false);
        }
      }
    };

    fetchCountries();
    return () => {
      isMounted = false;
    };
  }, [dataLoader]);

  // Load divisions for a country
  const loadDivisionsForCountry = useCallback(
    async (countryUuid: string) => {
      if (!countryUuid) {
        setDivisions([]);
        setCities([]);
        return;
      }
      try {
        setLoadingDivisions(true);
        setError(null);
        const data = await dataLoader.loadDivisions(countryUuid);
        setDivisions(data ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load divisions");
        setDivisions([]);
      } finally {
        setLoadingDivisions(false);
      }
    },
    [dataLoader],
  );

  // Load cities for a division
  const loadCitiesForDivision = useCallback(
    async (divisionUuid: string) => {
      if (!divisionUuid) {
        setCities([]);
        return;
      }
      try {
        setLoadingCities(true);
        setError(null);
        const data = await dataLoader.loadCities(divisionUuid);
        setCities(data ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load cities");
        setCities([]);
      } finally {
        setLoadingCities(false);
      }
    },
    [dataLoader],
  );

  // Initialize initial divisions and cities if default values provided
  useEffect(() => {
    if (defaultCountryUuid) {
      loadDivisionsForCountry(defaultCountryUuid);
    }
  }, [defaultCountryUuid, loadDivisionsForCountry]);

  useEffect(() => {
    if (defaultDivisionUuid) {
      loadCitiesForDivision(defaultDivisionUuid);
    }
  }, [defaultDivisionUuid, loadCitiesForDivision]);

  return {
    countries,
    divisions,
    cities,
    loadingCountries,
    loadingDivisions,
    loadingCities,
    error,
    loadDivisionsForCountry,
    loadCitiesForDivision,
    setDivisions,
    setCities,
  };
}
