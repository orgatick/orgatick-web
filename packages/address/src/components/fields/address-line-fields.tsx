"use client";

import type { FieldValues, UseFormReturn } from "react-hook-form";

import type { CreateAddressDto } from "../../types";
import { TextField } from "./text-field";

export interface AddressLineFieldsProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: string;
}

export function AddressLineFields<T extends FieldValues>({ form, name }: AddressLineFieldsProps<T>) {
  const fieldName = (field: keyof CreateAddressDto) => `${name}.${String(field)}`;

  return (
    <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
      <TextField
        form={form}
        name={fieldName("addressLine1") as never}
        label="Address Line 1"
        placeholder="123 Main St, Apartment 4B"
        required
        className="lg:col-span-2"
      />
      <TextField
        form={form}
        name={fieldName("addressLine2") as never}
        label="Address Line 2"
        placeholder="Floor, unit, building, etc."
      />
      <TextField form={form} name={fieldName("landmark") as never} label="Landmark" placeholder="Near central park" />
      <TextField
        form={form}
        name={fieldName("postalCode") as never}
        label="Postal Code"
        placeholder="110001"
        required
      />
    </div>
  );
}
