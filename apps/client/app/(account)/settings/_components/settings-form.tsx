"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { UserResponse } from "@orgatick/contracts";
import { Button } from "@orgatick/ui/components/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import { Field, FieldDescription, FieldError, FieldLabel } from "@orgatick/ui/components/field";
import { Input } from "@orgatick/ui/components/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@orgatick/ui/components/select";
import { Textarea } from "@orgatick/ui/components/textarea";
import { Badge } from "@orgatick/ui/components/badge";
import {
  IconAlertCircle,
  IconCheck,
  IconLoader2,
  IconLock,
  IconMail,
  IconMapPin,
  IconPhone,
  IconRefresh,
  IconUser,
} from "@tabler/icons-react";
import { useAuthStore } from "@/app/(auth)/_store";
import { handleApiError } from "@/lib/apis/api-error";
import { toast } from "@/components/ui/sonner";
import { userService } from "../../_services/user.service";
import { ProfileAvatarUploader } from "../../profile/_components/profile-avatar-uploader";

const settingsFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  gender: z.enum(["male", "female", "notToSay"]),
  phoneNumber: z.string().max(25, "Phone number is too long").optional(),
  bio: z.string().max(500, "Bio must be at most 500 characters").optional(),
  address: z.string().max(300, "Address must be at most 300 characters").optional(),
});

type SettingsFormSchemaType = z.infer<typeof settingsFormSchema>;

interface SettingsFormProps {
  initialUser: UserResponse | null;
}

export function SettingsForm({ initialUser }: SettingsFormProps) {
  const authUser = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  // Use auth store user if available (most up to date), otherwise SSR initialUser
  const currentUser = authUser || initialUser;

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SettingsFormSchemaType>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      name: currentUser?.name || "",
      gender: currentUser?.gender || "notToSay",
      phoneNumber: currentUser?.phoneNumber || "",
      bio: currentUser?.bio || "",
      address: currentUser?.address || "",
    },
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = form;

  // Sync form when currentUser hydrates
  useEffect(() => {
    if (currentUser) {
      reset({
        name: currentUser.name || "",
        gender: currentUser.gender || "notToSay",
        phoneNumber: currentUser.phoneNumber || "",
        bio: currentUser.bio || "",
        address: currentUser.address || "",
      });
    }
  }, [currentUser, reset]);

  const bioValue = watch("bio") || "";
  const hasChanges = isDirty || avatarFile !== null;

  const onSubmit = async (values: SettingsFormSchemaType) => {
    setIsSubmitting(true);
    try {
      const updatedUser = await userService.updateProfile({
        name: values.name,
        gender: values.gender,
        phoneNumber: values.phoneNumber || "",
        bio: values.bio || "",
        address: values.address || "",
        avatar: avatarFile,
      });

      // Update Zustand client store
      setUser(updatedUser);

      // Reset form default values to new values
      reset({
        name: updatedUser.name || "",
        gender: updatedUser.gender || "notToSay",
        phoneNumber: updatedUser.phoneNumber || "",
        bio: updatedUser.bio || "",
        address: updatedUser.address || "",
      });

      setAvatarFile(null);
      toast.success("Profile updated successfully!");
    } catch (error) {
      handleApiError(error, "Failed to update profile. Please verify your details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDiscard = () => {
    if (currentUser) {
      reset({
        name: currentUser.name || "",
        gender: currentUser.gender || "notToSay",
        phoneNumber: currentUser.phoneNumber || "",
        bio: currentUser.bio || "",
        address: currentUser.address || "",
      });
    }
    setAvatarFile(null);
    toast.info("Changes reverted.");
  };

  return (
    <Card className="border-border/80 shadow-xs">
      <CardHeader className="border-b border-border/60 pb-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
              <IconUser className="size-5 text-primary" />
              Edit Personal Information
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Update your photo, personal details, contact information, and public bio.
            </CardDescription>
          </div>

          {hasChanges && (
            <Badge
              variant="outline"
              className="hidden sm:inline-flex items-center gap-1 border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-medium"
            >
              <IconAlertCircle className="size-3" />
              Unsaved changes
            </Badge>
          )}
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6 pt-6">
          {/* Avatar Upload Section */}
          <ProfileAvatarUploader
            currentAvatarUrl={currentUser?.avatar}
            userName={currentUser?.name}
            onAvatarChange={(file) => setAvatarFile(file)}
            disabled={isSubmitting}
          />

          {/* Identity & Basic Info */}
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Full Name */}
            <Field data-invalid={!!errors.name}>
              <FieldLabel htmlFor="name">
                Full Name <span className="text-destructive">*</span>
              </FieldLabel>
              <div className="relative">
                <Input
                  id="name"
                  placeholder="e.g. Abhishek Kumar"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  disabled={isSubmitting}
                  className="pl-9"
                  {...register("name")}
                />
                <IconUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              </div>
              <FieldError errors={[errors.name]} />
            </Field>

            {/* Email Address (Read-only) */}
            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="email">Email Address</FieldLabel>
                <span className="text-[11px] font-medium text-muted-foreground inline-flex items-center gap-1">
                  <IconLock className="size-3" />
                  Fixed Login ID
                </span>
              </div>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={currentUser?.email || ""}
                  readOnly
                  disabled
                  className="pl-9 bg-muted/40 cursor-not-allowed text-muted-foreground font-mono text-xs sm:text-sm"
                />
                <IconMail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              </div>
              <FieldDescription className="text-xs">
                Email is tied to your account login. Contact support to request a change.
              </FieldDescription>
            </Field>
          </div>

          {/* Gender & Phone Number */}
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Gender */}
            <Field data-invalid={!!errors.gender}>
              <FieldLabel htmlFor="gender-select">Gender</FieldLabel>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange} disabled={isSubmitting}>
                    <SelectTrigger id="gender-select" className="w-full" aria-invalid={!!errors.gender}>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="notToSay">Prefer not to say</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError errors={[errors.gender]} />
            </Field>

            {/* Phone Number */}
            <Field data-invalid={!!errors.phoneNumber}>
              <FieldLabel htmlFor="phoneNumber">Phone Number</FieldLabel>
              <div className="relative">
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="e.g. +91 6206418701"
                  autoComplete="tel"
                  aria-invalid={!!errors.phoneNumber}
                  disabled={isSubmitting}
                  className="pl-9 font-mono"
                  {...register("phoneNumber")}
                />
                <IconPhone className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              </div>
              <FieldDescription className="text-xs">
                Used for urgent SMS event updates and booking confirmations.
              </FieldDescription>
              <FieldError errors={[errors.phoneNumber]} />
            </Field>
          </div>

          {/* Address */}
          <Field data-invalid={!!errors.address}>
            <FieldLabel htmlFor="address">Address & Location</FieldLabel>
            <div className="relative">
              <Input
                id="address"
                placeholder="e.g. Block Road, Karon, Deoghar, Jharkhand - 815357"
                autoComplete="street-address"
                aria-invalid={!!errors.address}
                disabled={isSubmitting}
                className="pl-9"
                {...register("address")}
              />
              <IconMapPin className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            </div>
            <FieldError errors={[errors.address]} />
          </Field>

          {/* Bio / Description */}
          <Field data-invalid={!!errors.bio}>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="bio">About You / Bio</FieldLabel>
              <span className="text-[11px] text-muted-foreground font-mono">{bioValue.length} / 500</span>
            </div>
            <Textarea
              id="bio"
              placeholder="Hey this is my new account in this platform! Share a brief bio, your interests or role..."
              className="min-h-24 resize-y text-sm leading-relaxed"
              aria-invalid={!!errors.bio}
              disabled={isSubmitting}
              {...register("bio")}
            />
            <FieldDescription className="text-xs">
              A short description visible across your event participation badges.
            </FieldDescription>
            <FieldError errors={[errors.bio]} />
          </Field>
        </CardContent>

        {/* Action Controls Footer */}
        <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-muted/30 border-t border-border/60 px-6 py-4">
          <div className="text-xs text-muted-foreground flex items-center gap-1.5 order-2 sm:order-1">
            {hasChanges ? (
              <span className="text-amber-600 dark:text-amber-400 font-medium">You have unsaved changes.</span>
            ) : (
              <span>All changes saved to your Orgatick account.</span>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto order-1 sm:order-2">
            {hasChanges && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleDiscard}
                disabled={isSubmitting}
                className="flex-1 sm:flex-none text-xs h-9 font-medium"
              >
                <IconRefresh className="size-3.5 mr-1" />
                Discard
              </Button>
            )}

            <Button
              type="submit"
              size="sm"
              disabled={!hasChanges || isSubmitting}
              className="flex-1 sm:flex-none text-xs h-9 font-semibold min-w-32 shadow-sm shadow-primary/20"
            >
              {isSubmitting ? (
                <>
                  <IconLoader2 className="size-3.5 mr-1.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <IconCheck className="size-3.5 mr-1.5" />
                  <span>Save Changes</span>
                </>
              )}
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
