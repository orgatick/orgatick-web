"use client";

import { useEffect } from "react";
import { FormProvider, type Path } from "react-hook-form";

import { cn } from "@orgatick/ui/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@orgatick/ui/components/card";

import type { AddressFormProps, CreateAddressDto } from "../types";
import { buildFormattedAddress } from "../libs/build-formatted-address";
import CountrySelect from "./address/country-select";
import StateOrProvinceSelect from "./address/state-province";
import Level2AdministrativeSelect from "./address/level2-administrative";
import CitySelect from "./address/city-select";
import { AddressLineFields } from "./fields/address-line-fields";
import { CoordinatesFields } from "./fields/coordinates-fields";
import { GeneralFields } from "./fields/general-fields";

export function AddressForm<Fields extends object = CreateAddressDto>({
  form,
  name,
  showCity = true,
  showCoordinates = true,
  showMoreOptions = true,
  className,
}: AddressFormProps<Fields>) {
  const fieldName = (field: keyof CreateAddressDto) => `${String(name)}.${String(field)}`;

  const watchedFormValues = form.watch() as Record<string, Partial<CreateAddressDto>>;
  const formattedAddress = buildFormattedAddress(watchedFormValues[String(name)] ?? {});

  useEffect(() => {
    const current = (form.getValues() as Record<string, Record<string, unknown>>)[String(name)]?.formattedAddress;
    if (formattedAddress && formattedAddress !== current) {
      form.setValue(`${String(name)}.formattedAddress` as never, formattedAddress as never, {
        shouldDirty: false,
        shouldTouch: false,
        shouldValidate: false,
      });
    }
  }, [form, name, formattedAddress]);

  return (
    <FormProvider {...form}>
      <div className={cn("address-form grid grid-cols-1 gap-6 lg:grid-cols-2", className)}>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Location</CardTitle>
            <CardDescription>Choose the country, region, and city for this address.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <CountrySelect form={form} name={fieldName("countryId") as Path<Fields>} />
              <StateOrProvinceSelect
                form={form}
                name={fieldName("divisionId") as Path<Fields>}
                countryName={fieldName("countryId")}
              />
              <Level2AdministrativeSelect
                form={form}
                name={fieldName("divisionId2") as Path<Fields>}
                countryName={fieldName("countryId")}
                parentName={fieldName("divisionId")}
              />
              {showCity && (
                <CitySelect
                  form={form}
                  name={fieldName("cityId") as Path<Fields>}
                  countryName={fieldName("countryId")}
                  admin1Name={fieldName("divisionId")}
                  admin2Name={fieldName("divisionId2")}
                  latName={fieldName("latitude")}
                  lngName={fieldName("longitude")}
                />
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Address Details</CardTitle>
            <CardDescription>Street address, landmarks, and postal code.</CardDescription>
          </CardHeader>
          <CardContent>
            <AddressLineFields form={form} name={String(name)} />
          </CardContent>
        </Card>

        {showCoordinates && (
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Coordinates</CardTitle>
              <CardDescription>Filled automatically when a city is selected. You can override them.</CardDescription>
            </CardHeader>
            <CardContent>
              <CoordinatesFields form={form} name={String(name)} />
            </CardContent>
          </Card>
        )}

        {showMoreOptions && (
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>More Options</CardTitle>
              <CardDescription>Optional details and preferences.</CardDescription>
            </CardHeader>
            <CardContent>
              <GeneralFields form={form} name={String(name)} />
            </CardContent>
          </Card>
        )}
      </div>
    </FormProvider>
  );
}
