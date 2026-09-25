export interface FormattedAddressInput {
  venueName?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
  landmark?: string | null;
  postalCode?: string | null;
}

export function buildFormattedAddress(value: FormattedAddressInput = {}): string {
  return [value.venueName, value.addressLine1, value.addressLine2, value.landmark, value.postalCode]
    .filter((part): part is string => Boolean(part?.trim()))
    .join(", ");
}
