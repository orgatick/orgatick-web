"use client";
import { useFormContext } from "react-hook-form";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import { AddressForm } from "@orgatick/address";
import type { CreateOrganizationInput } from "@orgatick/contracts";

export function AddressStep() {
  const form = useFormContext<CreateOrganizationInput>();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Registered Office & Billing Address</CardTitle>
          <CardDescription>
            Enter the physical or registered headquarters address for official contracts, tax compliance, and invoices.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <AddressForm form={form} name="address" showMoreOptions={false} />
        </CardContent>
      </Card>
    </div>
  );
}
