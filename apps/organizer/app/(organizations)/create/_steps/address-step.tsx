"use client";

import { useState, useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import type {
  CreateOrganizationInput,
  AddressCountryRef,
  AddressDivisionRef,
  AddressCityRef,
} from "@orgatick/contracts";
import { Field, FieldError, FieldLabel } from "@orgatick/ui/components/field";
import { Input } from "@orgatick/ui/components/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import { IconMapPin, IconMapPinFilled, IconSearch, IconChevronDown, IconCheck } from "@tabler/icons-react";
import { Popover, PopoverContent, PopoverTrigger } from "@orgatick/ui/components/popover";
import { Button } from "@orgatick/ui/components/button";
import { ScrollArea } from "@orgatick/ui/components/scroll-area";
import { Spinner } from "@orgatick/ui/components/spinner";
import { cn } from "@orgatick/ui/lib/utils";
import api from "@/lib/apis/auth.api";

export function getCountryFlagEmoji(countryCode?: string | null): string {
  if (countryCode?.length !== 2) return "🌐";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

const FALLBACK_COUNTRIES: AddressCountryRef[] = [
  { id: 1n, code: "IN", code3: "IND", name: "India" },
  { id: 2n, code: "US", code3: "USA", name: "United States" },
  { id: 3n, code: "GB", code3: "GBR", name: "United Kingdom" },
  { id: 4n, code: "CA", code3: "CAN", name: "Canada" },
  { id: 5n, code: "AU", code3: "AUS", name: "Australia" },
  { id: 6n, code: "DE", code3: "DEU", name: "Germany" },
  { id: 7n, code: "SG", code3: "SGP", name: "Singapore" },
  { id: 8n, code: "AE", code3: "ARE", name: "United Arab Emirates" },
];

const FALLBACK_DIVISIONS: Record<string, AddressDivisionRef[]> = {
  "1": [
    { id: 101n, code: "MH", name: "Maharashtra", level: 1 },
    { id: 102n, code: "KA", name: "Karnataka", level: 1 },
    { id: 103n, code: "DL", name: "Delhi", level: 1 },
    { id: 104n, code: "TN", name: "Tamil Nadu", level: 1 },
    { id: 105n, code: "TS", name: "Telangana", level: 1 },
    { id: 106n, code: "GJ", name: "Gujarat", level: 1 },
    { id: 107n, code: "WB", name: "West Bengal", level: 1 },
  ],
  "2": [
    { id: 201n, code: "CA", name: "California", level: 1 },
    { id: 202n, code: "NY", name: "New York", level: 1 },
    { id: 203n, code: "TX", name: "Texas", level: 1 },
    { id: 204n, code: "FL", name: "Florida", level: 1 },
    { id: 205n, code: "WA", name: "Washington", level: 1 },
  ],
  "3": [
    { id: 301n, code: "ENG", name: "England", level: 1 },
    { id: 302n, code: "SCT", name: "Scotland", level: 1 },
    { id: 303n, code: "WLS", name: "Wales", level: 1 },
  ],
};

const FALLBACK_CITIES: Record<string, AddressCityRef[]> = {
  "101": [
    { id: 1001n, name: "Mumbai", slug: "mumbai" },
    { id: 1002n, name: "Pune", slug: "pune" },
    { id: 1003n, name: "Nagpur", slug: "nagpur" },
  ],
  "102": [
    { id: 1004n, name: "Bengaluru", slug: "bengaluru" },
    { id: 1005n, name: "Mysuru", slug: "mysuru" },
  ],
  "103": [{ id: 1006n, name: "New Delhi", slug: "new-delhi" }],
  "201": [
    { id: 2001n, name: "San Francisco", slug: "san-francisco" },
    { id: 2002n, name: "Los Angeles", slug: "los-angeles" },
    { id: 2003n, name: "San Diego", slug: "san-diego" },
  ],
  "202": [
    { id: 2004n, name: "New York City", slug: "new-york-city" },
    { id: 2005n, name: "Buffalo", slug: "buffalo" },
  ],
  "301": [
    { id: 3001n, name: "London", slug: "london" },
    { id: 3002n, name: "Manchester", slug: "manchester" },
    { id: 3003n, name: "Birmingham", slug: "birmingham" },
  ],
};

function extractItems<T>(data: unknown): T[] {
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

export function AddressStep() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CreateOrganizationInput>();

  const currentCountryId = watch("address.countryId");
  const currentDivisionId = watch("address.divisionId");
  const currentCityId = watch("address.cityId");

  const [countryList, setCountryList] = useState<AddressCountryRef[]>(FALLBACK_COUNTRIES);
  const [divisionList, setDivisionList] = useState<AddressDivisionRef[]>([]);
  const [cityList, setCityList] = useState<AddressCityRef[]>([]);

  const [countrySearch, setCountrySearch] = useState("");
  const [divisionSearch, setDivisionSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");

  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isDivisionOpen, setIsDivisionOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);

  const [isLoadingCountries, setIsLoadingCountries] = useState(false);
  const [isLoadingDivisions, setIsLoadingDivisions] = useState(false);
  const [isLoadingCities, setIsLoadingCities] = useState(false);

  // Fetch countries
  useEffect(() => {
    let active = true;
    async function load() {
      setIsLoadingCountries(true);
      try {
        const res = await api.get("/countries", { params: { limit: 50 } });
        const items = extractItems<AddressCountryRef>(res.data);
        if (active && items.length > 0) {
          setCountryList(items);
        }
      } catch {
        // use fallbacks
      } finally {
        if (active) setIsLoadingCountries(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  // Fetch divisions when country changes
  useEffect(() => {
    if (!currentCountryId) {
      setDivisionList([]);
      return;
    }

    let active = true;
    async function loadDivisions() {
      setIsLoadingDivisions(true);
      try {
        const res = await api.get("/administrative-divisions", {
          params: {
            countryUuid: currentCountryId.toString(),
            limit: 100,
          },
        });
        const items = extractItems<AddressDivisionRef>(res.data);
        if (active) {
          if (items.length > 0) {
            setDivisionList(items);
          } else {
            const fallback = FALLBACK_DIVISIONS[currentCountryId.toString()] || [];
            setDivisionList(fallback);
          }
        }
      } catch {
        if (active) {
          const fallback = FALLBACK_DIVISIONS[currentCountryId.toString()] || [];
          setDivisionList(fallback);
        }
      } finally {
        if (active) setIsLoadingDivisions(false);
      }
    }
    loadDivisions();
    return () => {
      active = false;
    };
  }, [currentCountryId]);

  // Fetch cities when division changes
  useEffect(() => {
    if (!currentDivisionId && !currentCountryId) {
      setCityList([]);
      return;
    }

    let active = true;
    async function loadCities() {
      setIsLoadingCities(true);
      try {
        const res = await api.get("/cities", {
          params: {
            admin1Uuid: currentDivisionId ? currentDivisionId.toString() : undefined,
            countryUuid: currentCountryId ? currentCountryId.toString() : undefined,
            limit: 100,
          },
        });
        const items = extractItems<AddressCityRef>(res.data);
        if (active) {
          if (items.length > 0) {
            setCityList(items);
          } else if (currentDivisionId) {
            const fallback = FALLBACK_CITIES[currentDivisionId.toString()] || [];
            setCityList(fallback);
          } else {
            setCityList([]);
          }
        }
      } catch {
        if (active && currentDivisionId) {
          const fallback = FALLBACK_CITIES[currentDivisionId.toString()] || [];
          setCityList(fallback);
        }
      } finally {
        if (active) setIsLoadingCities(false);
      }
    }
    loadCities();
    return () => {
      active = false;
    };
  }, [currentCountryId, currentDivisionId]);

  const selectedCountry = countryList.find((c) => BigInt(c.id) === BigInt(currentCountryId || 0n));
  const selectedDivision = divisionList.find((d) => currentDivisionId && BigInt(d.id) === BigInt(currentDivisionId));
  const selectedCity = cityList.find((c) => currentCityId && BigInt(c.id) === BigInt(currentCityId));

  const filteredCountries = useMemo(() => {
    if (!countrySearch.trim()) return countryList;
    const q = countrySearch.toLowerCase();
    return countryList.filter((c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q));
  }, [countryList, countrySearch]);

  const filteredDivisions = useMemo(() => {
    if (!divisionSearch.trim()) return divisionList;
    const q = divisionSearch.toLowerCase();
    return divisionList.filter((d) => d.name.toLowerCase().includes(q) || d.code.toLowerCase().includes(q));
  }, [divisionList, divisionSearch]);

  const filteredCities = useMemo(() => {
    if (!citySearch.trim()) return cityList;
    const q = citySearch.toLowerCase();
    return cityList.filter((c) => c.name.toLowerCase().includes(q));
  }, [cityList, citySearch]);

  const handleSelectCountry = (country: AddressCountryRef) => {
    setValue("address.countryId", BigInt(country.id), { shouldValidate: true, shouldDirty: true });
    setValue("address.divisionId", null, { shouldValidate: true, shouldDirty: true });
    setValue("address.cityId", null, { shouldValidate: true, shouldDirty: true });
    setIsCountryOpen(false);
    setCountrySearch("");
  };

  const handleSelectDivision = (division: AddressDivisionRef) => {
    setValue("address.divisionId", BigInt(division.id), { shouldValidate: true, shouldDirty: true });
    setValue("address.cityId", null, { shouldValidate: true, shouldDirty: true });
    setIsDivisionOpen(false);
    setDivisionSearch("");
  };

  const handleSelectCity = (city: AddressCityRef) => {
    setValue("address.cityId", BigInt(city.id), { shouldValidate: true, shouldDirty: true });
    setIsCityOpen(false);
    setCitySearch("");
  };

  const addressErrors = errors.address;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Registered Office & Billing Address</CardTitle>
          <CardDescription>
            Enter the physical or registered headquarters address for official contracts, tax compliance, and invoices.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Country, State, City Selection */}
          <div className="grid gap-4 sm:grid-cols-3">
            {/* Country */}
            <Field data-invalid={Boolean(addressErrors?.countryId)}>
              <FieldLabel>
                Country <span className="text-destructive">*</span>
              </FieldLabel>
              <Popover open={isCountryOpen} onOpenChange={setIsCountryOpen}>
                <PopoverTrigger
                  render={
                    <Button
                      type="button"
                      variant="outline"
                      role="combobox"
                      className="h-9 w-full justify-between gap-2 rounded-lg border border-input bg-transparent px-3 text-sm font-normal outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                    />
                  }
                >
                  <span className="flex min-w-0 flex-1 items-center gap-2 truncate text-start">
                    {selectedCountry ? (
                      <>
                        <span className="text-base leading-none">{getCountryFlagEmoji(selectedCountry.code)}</span>
                        <span className="truncate font-medium">{selectedCountry.name}</span>
                        <span className="text-xs text-muted-foreground">({selectedCountry.code})</span>
                      </>
                    ) : (
                      <span className="text-muted-foreground">Select Country</span>
                    )}
                  </span>
                  <IconChevronDown className="size-4 opacity-50 shrink-0" />
                </PopoverTrigger>
                <PopoverContent className="w-64 p-0 shadow-md">
                  <div className="flex items-center gap-2 border-b border-border px-2.5 py-1.5 bg-popover">
                    <IconSearch className="size-3.5 text-muted-foreground shrink-0" />
                    <input
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      placeholder="Search country..."
                      className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                  <ScrollArea className="max-h-48 p-1">
                    {isLoadingCountries ? (
                      <div className="flex items-center justify-center gap-2 py-4 text-xs text-muted-foreground">
                        <Spinner className="size-3.5" /> Loading...
                      </div>
                    ) : filteredCountries.length === 0 ? (
                      <div className="py-4 text-center text-xs text-muted-foreground">No country found</div>
                    ) : (
                      filteredCountries.map((c) => {
                        const isSelected = BigInt(c.id) === BigInt(currentCountryId || 0n);
                        return (
                          <button
                            key={c.id.toString()}
                            type="button"
                            onClick={() => handleSelectCountry(c)}
                            className={cn(
                              "flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-xs text-start transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer",
                              isSelected && "bg-accent/70 font-medium text-accent-foreground",
                            )}
                          >
                            <span className="flex items-center gap-2 truncate">
                              <span>{getCountryFlagEmoji(c.code)}</span>
                              <span className="truncate">{c.name}</span>
                              <span className="text-[10px] text-muted-foreground uppercase font-mono">({c.code})</span>
                            </span>
                            {isSelected && <IconCheck className="size-3.5 text-primary shrink-0" />}
                          </button>
                        );
                      })
                    )}
                  </ScrollArea>
                </PopoverContent>
              </Popover>
              <FieldError errors={[addressErrors?.countryId]} />
            </Field>

            {/* State / Province (Division) */}
            <Field data-invalid={Boolean(addressErrors?.divisionId)}>
              <FieldLabel>State / Province</FieldLabel>
              <Popover open={isDivisionOpen} onOpenChange={setIsDivisionOpen}>
                <PopoverTrigger
                  render={
                    <Button
                      type="button"
                      variant="outline"
                      role="combobox"
                      disabled={!currentCountryId}
                      className="h-9 w-full justify-between gap-2 rounded-lg border border-input bg-transparent px-3 text-sm font-normal outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50"
                    />
                  }
                >
                  <span className="flex min-w-0 flex-1 items-center gap-2 truncate text-start">
                    {selectedDivision ? (
                      <>
                        <span className="truncate font-medium">{selectedDivision.name}</span>
                        {selectedDivision.code && (
                          <span className="text-xs text-muted-foreground">({selectedDivision.code})</span>
                        )}
                      </>
                    ) : (
                      <span className="text-muted-foreground">
                        {currentCountryId ? "Select State / Province" : "Select country first"}
                      </span>
                    )}
                  </span>
                  <IconChevronDown className="size-4 opacity-50 shrink-0" />
                </PopoverTrigger>
                <PopoverContent className="w-64 p-0 shadow-md">
                  <div className="flex items-center gap-2 border-b border-border px-2.5 py-1.5 bg-popover">
                    <IconSearch className="size-3.5 text-muted-foreground shrink-0" />
                    <input
                      value={divisionSearch}
                      onChange={(e) => setDivisionSearch(e.target.value)}
                      placeholder="Search state/province..."
                      className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                  <ScrollArea className="max-h-48 p-1">
                    {isLoadingDivisions ? (
                      <div className="flex items-center justify-center gap-2 py-4 text-xs text-muted-foreground">
                        <Spinner className="size-3.5" /> Loading...
                      </div>
                    ) : filteredDivisions.length === 0 ? (
                      <div className="py-4 text-center text-xs text-muted-foreground">No states found</div>
                    ) : (
                      filteredDivisions.map((d) => {
                        const isSelected = currentDivisionId && BigInt(d.id) === BigInt(currentDivisionId);
                        return (
                          <button
                            key={d.id.toString()}
                            type="button"
                            onClick={() => handleSelectDivision(d)}
                            className={cn(
                              "flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-xs text-start transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer",
                              isSelected && "bg-accent/70 font-medium text-accent-foreground",
                            )}
                          >
                            <span className="truncate">{d.name}</span>
                            {isSelected && <IconCheck className="size-3.5 text-primary shrink-0" />}
                          </button>
                        );
                      })
                    )}
                  </ScrollArea>
                </PopoverContent>
              </Popover>
              <FieldError errors={[addressErrors?.divisionId]} />
            </Field>

            {/* City */}
            <Field data-invalid={Boolean(addressErrors?.cityId)}>
              <FieldLabel>City</FieldLabel>
              <Popover open={isCityOpen} onOpenChange={setIsCityOpen}>
                <PopoverTrigger
                  render={
                    <Button
                      type="button"
                      variant="outline"
                      role="combobox"
                      disabled={!currentCountryId}
                      className="h-9 w-full justify-between gap-2 rounded-lg border border-input bg-transparent px-3 text-sm font-normal outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50"
                    />
                  }
                >
                  <span className="flex min-w-0 flex-1 items-center gap-2 truncate text-start">
                    {selectedCity ? (
                      <span className="truncate font-medium">{selectedCity.name}</span>
                    ) : (
                      <span className="text-muted-foreground">
                        {currentCountryId ? "Select City" : "Select region first"}
                      </span>
                    )}
                  </span>
                  <IconChevronDown className="size-4 opacity-50 shrink-0" />
                </PopoverTrigger>
                <PopoverContent className="w-64 p-0 shadow-md">
                  <div className="flex items-center gap-2 border-b border-border px-2.5 py-1.5 bg-popover">
                    <IconSearch className="size-3.5 text-muted-foreground shrink-0" />
                    <input
                      value={citySearch}
                      onChange={(e) => setCitySearch(e.target.value)}
                      placeholder="Search city..."
                      className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                  <ScrollArea className="max-h-48 p-1">
                    {isLoadingCities ? (
                      <div className="flex items-center justify-center gap-2 py-4 text-xs text-muted-foreground">
                        <Spinner className="size-3.5" /> Loading...
                      </div>
                    ) : filteredCities.length === 0 ? (
                      <div className="py-4 text-center text-xs text-muted-foreground">No cities found</div>
                    ) : (
                      filteredCities.map((c) => {
                        const isSelected = currentCityId && BigInt(c.id) === BigInt(currentCityId);
                        return (
                          <button
                            key={c.id.toString()}
                            type="button"
                            onClick={() => handleSelectCity(c)}
                            className={cn(
                              "flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-xs text-start transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer",
                              isSelected && "bg-accent/70 font-medium text-accent-foreground",
                            )}
                          >
                            <span className="truncate">{c.name}</span>
                            {isSelected && <IconCheck className="size-3.5 text-primary shrink-0" />}
                          </button>
                        );
                      })
                    )}
                  </ScrollArea>
                </PopoverContent>
              </Popover>
              <FieldError errors={[addressErrors?.cityId]} />
            </Field>
          </div>

          {/* Street Address Line 1 */}
          <Field data-invalid={Boolean(addressErrors?.addressLine1)}>
            <FieldLabel htmlFor="address.addressLine1">
              Street Address Line 1 <span className="text-destructive">*</span>
            </FieldLabel>
            <div className="relative">
              <Input
                id="address.addressLine1"
                placeholder="House / Unit No., Building Name, Commercial Complex, Street"
                className="pl-9"
                {...register("address.addressLine1")}
              />
              <IconMapPin className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            </div>
            <FieldError errors={[addressErrors?.addressLine1]} />
          </Field>

          {/* Street Address Line 2 */}
          <Field data-invalid={Boolean(addressErrors?.addressLine2)}>
            <FieldLabel htmlFor="address.addressLine2">Street Address Line 2 (Optional)</FieldLabel>
            <Input
              id="address.addressLine2"
              placeholder="Suite, Floor, Sector, Industrial Area"
              {...register("address.addressLine2")}
            />
            <FieldError errors={[addressErrors?.addressLine2]} />
          </Field>

          {/* Landmark & Postal Code */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field data-invalid={Boolean(addressErrors?.landmark)}>
              <FieldLabel htmlFor="address.landmark">Landmark (Optional)</FieldLabel>
              <div className="relative">
                <Input
                  id="address.landmark"
                  placeholder="e.g. Near World Trade Center, Opposite Metro Gate 3"
                  className="pl-9"
                  {...register("address.landmark")}
                />
                <IconMapPinFilled className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              </div>
              <FieldError errors={[addressErrors?.landmark]} />
            </Field>

            <Field data-invalid={Boolean(addressErrors?.postalCode)}>
              <FieldLabel htmlFor="address.postalCode">Postal Code / PIN Code</FieldLabel>
              <Input
                id="address.postalCode"
                placeholder="e.g. 400001, 10001, SW1A 1AA"
                {...register("address.postalCode")}
              />
              <FieldError errors={[addressErrors?.postalCode]} />
            </Field>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
