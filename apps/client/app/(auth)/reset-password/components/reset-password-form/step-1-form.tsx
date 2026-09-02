import { Controller, type FieldPath, type UseFormReturn } from "react-hook-form";
import { IconLoader2 } from "@tabler/icons-react";
import { Button } from "@orgatick/ui/components/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@orgatick/ui/components/field";
import PasswordInput from "@orgatick/ui/components/password-input";
import EmailView from "@/app/(auth)/components/EmailView";
import type { ResetPasswordData } from "@orgatick/contracts";

interface Step1FormProps {
  form: UseFormReturn<ResetPasswordData>;
  email: string;
  loading: boolean;
  shouldRevalidate: (field: FieldPath<ResetPasswordData>) => boolean;
}

export default function Step1Form({ form, email, loading, shouldRevalidate }: Step1FormProps) {
  return (
    <FieldGroup>
      {email && <EmailView email={email} message="Resetting password for" />}

      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel className="text-md">New Password</FieldLabel>
            <PasswordInput
              {...field}
              aria-invalid={fieldState.invalid}
              placeholder="Enter new password"
              autoComplete="new-password"
              className="text-xl h-10"
              iconClassName="size-12"
              onChange={(event) => {
                field.onChange(event);
                if (shouldRevalidate("password")) {
                  void form.trigger("password");
                }
              }}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="confirmPassword"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel className="text-md">Confirm New Password</FieldLabel>
            <PasswordInput
              {...field}
              aria-invalid={fieldState.invalid}
              placeholder="Confirm new password"
              autoComplete="new-password"
              className="text-xl h-10"
              iconClassName="size-12"
              onChange={(event) => {
                field.onChange(event);
                if (shouldRevalidate("confirmPassword")) {
                  void form.trigger("confirmPassword");
                }
              }}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button type="submit" disabled={loading} className="w-full rounded-full text-xl h-14">
        {loading ? <IconLoader2 className="animate-spin" /> : "Reset password"}
      </Button>
    </FieldGroup>
  );
}
