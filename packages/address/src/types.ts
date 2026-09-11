import type {
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

export interface AddressFormValues extends CreateAddressDto {
  /** Optional contextual fields for specific entity types */
  label?: string | null; // e.g. "Home", "Office", "HQ"
  venueName?: string | null; // e.g. "Royal Palace Hall" for event_venue
  isDefault?: boolean;
}

export interface AddressFormProps {
  variant?: AddressVariant;
  initialValues?: Partial<AddressFormValues> | Partial<AddressResponse>;
  dataLoader: AddressDataLoader;
  onSubmit: (values: AddressFormValues) => Promise<void> | void;
  onCancel?: () => void;
  isLoading?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  className?: string;
}

export interface AddressCardProps {
  address: AddressResponse | AddressFormValues;
  variant?: AddressVariant;
  selected?: boolean;
  onSelect?: (address: AddressResponse | AddressFormValues) => void;
  onEdit?: (address: AddressResponse | AddressFormValues) => void;
  onDelete?: (address: AddressResponse | AddressFormValues) => void;
  onSetDefault?: (address: AddressResponse | AddressFormValues) => void;
  className?: string;
}

export interface AddressDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  variant?: AddressVariant;
  initialValues?: Partial<AddressFormValues> | Partial<AddressResponse>;
  dataLoader: AddressDataLoader;
  onSubmit: (values: AddressFormValues) => Promise<void> | void;
}

export interface AddressPickerProps {
  addresses: (AddressResponse | (AddressFormValues & { uuid?: string }))[];
  selectedUuid?: string | null;
  onSelectAddress: (address: AddressResponse | (AddressFormValues & { uuid?: string })) => void;
  onAddNewAddress?: () => void;
  onEditAddress?: (address: AddressResponse | (AddressFormValues & { uuid?: string })) => void;
  onDeleteAddress?: (address: AddressResponse | (AddressFormValues & { uuid?: string })) => void;
  variant?: AddressVariant;
  className?: string;
}
