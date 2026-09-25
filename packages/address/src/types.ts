import type {
  AddressCityRef,
  AddressCountryRef,
  AddressDivisionRef,
  AddressResponse,
  CreateAddressDto,
} from "@orgatick/contracts";
import type * as React from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

export type {
  AddressCityRef,
  AddressCountryRef,
  AddressDivisionRef,
  AddressResponse,
  CreateAddressDto,
} from "@orgatick/contracts";

export type AddressVariant = "user" | "organization" | "event_venue" | "generic";

export interface DivisionQueryOptions {
  level?: number;
  parentUuid?: string;
}

export interface CityQueryOptions {
  countryUuid?: string;
}

export interface AddressDataLoader {
  loadCountries: (search?: string) => Promise<AddressCountryRef[]>;
  loadDivisions: (
    countryUuid: string,
    search?: string,
    options?: DivisionQueryOptions,
  ) => Promise<AddressDivisionRef[]>;
  loadCities: (
    divisionUuid?: string,
    search?: string,
    countryUuidOrOptions?: string | CityQueryOptions,
  ) => Promise<AddressCityRef[]>;
}

export interface AddressOption {
  value: string;
  label: string;
  subLabel?: string;
  prefix?: React.ReactNode;
}

export interface AddressFormProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  name: keyof TFieldValues | string;
  dataLoader?: AddressDataLoader;
  variant?: AddressVariant;
  showCity?: boolean;
  showCoordinates?: boolean;
  showMoreOptions?: boolean;
  className?: string;
}

export interface AddressCardProps {
  address: AddressResponse | CreateAddressDto;
  variant?: AddressVariant;
  selected?: boolean;
  onSelect?: (address: AddressResponse | CreateAddressDto) => void;
  onEdit?: (address: AddressResponse | CreateAddressDto) => void;
  onDelete?: (address: AddressResponse | CreateAddressDto) => void;
  onSetDefault?: (address: AddressResponse | CreateAddressDto) => void;
  className?: string;
}

export interface AddressDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  variant?: AddressVariant;
  initialValues?: Partial<CreateAddressDto> | Partial<AddressResponse>;
  dataLoader: AddressDataLoader;
  onSubmit: (values: CreateAddressDto) => Promise<void> | void;
  showDistrict?: boolean;
}

export interface AddressPickerProps {
  addresses: (AddressResponse | (CreateAddressDto & { uuid?: string }))[];
  selectedUuid?: string | null;
  onSelectAddress: (address: AddressResponse | (CreateAddressDto & { uuid?: string })) => void;
  onAddNewAddress?: () => void;
  onEditAddress?: (address: AddressResponse | (CreateAddressDto & { uuid?: string })) => void;
  onDeleteAddress?: (address: AddressResponse | (CreateAddressDto & { uuid?: string })) => void;
  variant?: AddressVariant;
  className?: string;
}
