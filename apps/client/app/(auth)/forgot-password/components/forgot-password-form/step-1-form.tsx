import { Controller, type FieldPath, type UseFormReturn } from "react-hook-form";
import { IconLoader2 } from "@tabler/icons-react";
import { Button } from "@orgatick/ui/components/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@orgatick/ui/components/field";
import { Input } from "@orgatick/ui/components/input";
import type { ForgotPasswordData } from "../../schema";

interface Step1FormProps {
  form: UseFormReturn<ForgotPasswordData>;
  loading: boolean;
  shouldRevalidate: (field: FieldPath<ForgotPasswordData>) => boolean;
}

export default function Step1Form({ form, loading, shouldRevalidate }: Step1FormProps) {
  return (
    <FieldGroup>
      <p className="text-sm text-muted-foreground text-center px-2">
        Enter your email address and we will send you a password reset link.
      </p>

      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel className="text-md">Email</FieldLabel>

            <Input
              {...field}
              type="email"
              aria-invalid={fieldState.invalid}
              placeholder="Enter your email"
              autoComplete="email"
              className="h-10 text-xl"
              onChange={(event) => {
                field.onChange(event);

                if (shouldRevalidate("email")) {
                  void form.trigger("email");
                }
              }}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button type="submit" disabled={loading} className="h-14 w-full rounded-full text-xl">
        {loading ? <IconLoader2 className="animate-spin" /> : "Send reset link"}
      </Button>
    </FieldGroup>
  );
}
