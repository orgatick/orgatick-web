"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AddressForm } from "@orgatick/address";
import { CreateAddressSchema } from "@orgatick/contracts";
import { Button } from "@orgatick/ui/components/button";
import { useState } from "react";
import { FormProvider, useForm, type Resolver } from "react-hook-form";
import { z } from "zod";

const OrganizationSchema = z.object({
  address: CreateAddressSchema,
});

type OrganizationForm = z.infer<typeof OrganizationSchema>;

export default function TestPage() {
  const [data, setData] = useState<OrganizationForm | null>(null);

  const form = useForm<OrganizationForm, undefined, OrganizationForm>({
    resolver: zodResolver(OrganizationSchema) as Resolver<OrganizationForm, undefined, OrganizationForm>,
    defaultValues: {
      address: {
        // your default address values
      },
    },
  });

  const onSubmit = (data: OrganizationForm) => {
    console.log(data);
    setData(data);
  };

  return (
    <div className="px-4 py-8">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <AddressForm form={form} name="address" />

          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>

      {data && (
        <pre>{JSON.stringify(data, (_, value) => (typeof value === "bigint" ? value.toString() : value), 2)}</pre>
      )}
    </div>
  );
}
