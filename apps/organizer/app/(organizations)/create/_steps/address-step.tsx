"use client";
import { useFormContext } from "react-hook-form";

import { FormSection } from "../_components/form-section";
import { AddressForm } from "@orgatick/address";
import type { CreateOrganizationInput } from "@orgatick/contracts";

export function AddressStep() {
  const form = useFormContext<CreateOrganizationInput>();

  return (
    <FormSection
      title="Registered Office & Billing Address"
      description="Enter the physical or registered headquarters address for official contracts, tax compliance, and invoices."
    >
      <AddressForm form={form} name="address" showMoreOptions={false} />
    </FormSection>
  );
}
