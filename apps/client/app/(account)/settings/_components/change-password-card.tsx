"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@orgatick/ui/components/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import { Field, FieldDescription, FieldError, FieldLabel } from "@orgatick/ui/components/field";
import PasswordInput from "@orgatick/ui/components/password-input";
import { Switch } from "@orgatick/ui/components/switch";
import {
  IconCheck,
  IconCircleCheck,
  IconDevicesOff,
  IconKey,
  IconLoader2,
  IconLockCheck,
  IconRefresh,
  IconShieldLock,
  IconX,
} from "@tabler/icons-react";
import { useAuthStore } from "@/app/(auth)/_store";
import { type ChangePasswordInput, changePasswordSchema } from "@orgatick/contracts";

interface PasswordRequirementItemProps {
  label: string;
  met: boolean;
}

function PasswordRequirementItem({ label, met }: PasswordRequirementItemProps) {
  return (
    <div className="flex items-center gap-1.5 text-xs transition-colors">
      {met ? (
        <IconCheck className="size-3.5 text-emerald-500 shrink-0" />
      ) : (
        <IconX className="size-3.5 text-muted-foreground/60 shrink-0" />
      )}
      <span className={met ? "text-foreground font-medium" : "text-muted-foreground"}>{label}</span>
    </div>
  );
}

export function ChangePasswordCard() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const changePassword = useAuthStore((state) => state.changePassword);

  const form = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      revokeOtherSessions: true,
    },
    mode: "onSubmit",
  });

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isDirty, isValid },
  } = form;
  const newPasswordValue = watch("newPassword") || "";
  const confirmPasswordValue = watch("confirmPassword") || "";

  // Password validation breakdown indicators
  const hasMinLength = newPasswordValue.length >= 8;
  const hasUppercase = /[A-Z]/.test(newPasswordValue);
  const hasLowercase = /[a-z]/.test(newPasswordValue);
  const hasNumber = /\d/.test(newPasswordValue);
  const hasSpecial = /[@$!%*?&]/.test(newPasswordValue);
  const passwordsMatch = newPasswordValue.length > 0 && newPasswordValue === confirmPasswordValue;

  const onSubmit = async (values: ChangePasswordInput) => {
    setIsSubmitting(true);
    try {
      const result = await changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
        revokeOtherSessions: values.revokeOtherSessions ?? true,
      });

      if (result.success) {
        reset({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
          revokeOtherSessions: true,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    reset({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      revokeOtherSessions: true,
    });
  };

  return (
    <Card id="change-password" className="border-border/80 shadow-xs scroll-mt-20">
      <CardHeader className="border-b border-border/60 pb-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
              <IconKey className="size-5 text-primary" />
              Change Password
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Update your account password regularly to keep your profile and tickets secure.
            </CardDescription>
          </div>

          <div className="hidden sm:flex size-10 rounded-xl bg-primary/10 items-center justify-center text-primary">
            <IconShieldLock className="size-5" />
          </div>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6 pt-6">
          {/* Current Password */}
          <Controller
            name="currentPassword"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="current-password">
                  Current Password <span className="text-destructive">*</span>
                </FieldLabel>
                <PasswordInput
                  {...field}
                  id="current-password"
                  placeholder="Enter your current password"
                  autoComplete="current-password"
                  disabled={isSubmitting}
                  aria-invalid={fieldState.invalid}
                  className="h-10 text-sm"
                />
                <FieldDescription className="text-xs">
                  Required to verify your identity before setting a new password.
                </FieldDescription>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <div className="grid gap-5 sm:grid-cols-2">
            {/* New Password */}
            <Controller
              name="newPassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="new-password">
                    New Password <span className="text-destructive">*</span>
                  </FieldLabel>
                  <PasswordInput
                    {...field}
                    id="new-password"
                    placeholder="Enter new strong password"
                    autoComplete="new-password"
                    disabled={isSubmitting}
                    aria-invalid={fieldState.invalid}
                    className="h-10 text-sm"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Confirm Password */}
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="confirm-password">
                    Confirm New Password <span className="text-destructive">*</span>
                  </FieldLabel>
                  <PasswordInput
                    {...field}
                    id="confirm-password"
                    placeholder="Repeat new password"
                    autoComplete="new-password"
                    disabled={isSubmitting}
                    aria-invalid={fieldState.invalid}
                    className="h-10 text-sm"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>

          {/* Password Requirements Breakdown */}
          {newPasswordValue.length > 0 && (
            <div className="p-3.5 rounded-xl border border-border/70 bg-muted/25 space-y-2.5">
              <div className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <IconLockCheck className="size-4 text-primary" />
                Password Requirements
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <PasswordRequirementItem label="At least 8 characters" met={hasMinLength} />
                <PasswordRequirementItem label="One uppercase letter (A-Z)" met={hasUppercase} />
                <PasswordRequirementItem label="One lowercase letter (a-z)" met={hasLowercase} />
                <PasswordRequirementItem label="One number (0-9)" met={hasNumber} />
                <PasswordRequirementItem label="One special character (@$!%*?&)" met={hasSpecial} />
                <PasswordRequirementItem label="Passwords match" met={passwordsMatch} />
              </div>
            </div>
          )}

          {/* Revoke other sessions switch */}
          <div className="flex items-start justify-between gap-4 p-4 rounded-xl border border-border/70 bg-muted/20">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-medium text-foreground text-sm">
                <IconDevicesOff className="size-4 text-primary shrink-0" />
                <span>Revoke other active sessions</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Automatically sign out from all other browsers, computers, and mobile sessions after this password
                change.
              </p>
            </div>

            <Controller
              name="revokeOtherSessions"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isSubmitting}
                  aria-label="Revoke other active sessions"
                />
              )}
            />
          </div>
        </CardContent>

        {/* Action Controls Footer */}
        <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-muted/30 border-t border-border/60 px-6 py-4">
          <div className="text-xs text-muted-foreground flex items-center gap-1.5 order-2 sm:order-1">
            {isDirty && (
              <span className="text-muted-foreground font-medium">
                Make sure to save your new password in a safe password manager.
              </span>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto order-1 sm:order-2">
            {isDirty && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleReset}
                disabled={isSubmitting}
                className="flex-1 sm:flex-none text-xs h-9 font-medium"
              >
                <IconRefresh className="size-3.5 mr-1" />
                Reset
              </Button>
            )}

            <Button
              type="submit"
              size="sm"
              disabled={!isDirty || !isValid || isSubmitting}
              className="flex-1 sm:flex-none text-xs h-9 font-semibold min-w-36 shadow-sm shadow-primary/20"
            >
              {isSubmitting ? (
                <>
                  <IconLoader2 className="size-3.5 mr-1.5 animate-spin" />
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <IconCircleCheck className="size-3.5 mr-1.5" />
                  <span>Update Password</span>
                </>
              )}
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
