"use client";

import { useEffect, useState, useRef } from "react";
import { Controller } from "react-hook-form";
import {
  IconBuilding,
  IconCloudUpload,
  IconCoin,
  IconMail,
  IconPhone,
  IconPhoto,
  IconSparkles,
  IconTrash,
} from "@tabler/icons-react";
import { Button } from "@orgatick/ui/components/button";
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
import { Switch } from "@orgatick/ui/components/switch";
import { Textarea } from "@orgatick/ui/components/textarea";
import { Badge } from "@orgatick/ui/components/badge";
import { DEFAULT_CATEGORIES } from "../_services";
import type { CategoryOption, OrganizationFormReturn } from "../_types";

interface Step1BasicInfoProps {
  form: OrganizationFormReturn;
  onNext: () => void;
  logoFile: File | null;
  onLogoChange: (file: File | null) => void;
  categories?: CategoryOption[];
}

export function Step1BasicInfo({
  form,
  onNext,
  logoFile,
  onLogoChange,
  categories = DEFAULT_CATEGORIES,
}: Step1BasicInfoProps) {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAutoSlug, setIsAutoSlug] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedCategoryId = watch("categoryId");
  const selectedSubCategoryId = watch("subCategoryId");
  const nameValue = watch("name") || "";
  const slugValue = watch("slug") || "";
  const descriptionValue = watch("description") || "";
  const allowPaidEvents = watch("allowPaidEvents") ?? false;

  // Selected Category's subcategories
  const currentCategory = categories.find((c) => Number(c.id) === Number(selectedCategoryId));
  const subCategories = currentCategory ? currentCategory.subCategories : [];

  // Generate slug from name automatically if user hasn't manually edited slug
  useEffect(() => {
    if (isAutoSlug && nameValue) {
      const generated = nameValue
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 50);
      setValue("slug", generated, { shouldValidate: true });
    }
  }, [nameValue, isAutoSlug, setValue]);

  // Handle Logo file preview
  useEffect(() => {
    if (logoFile) {
      const objectUrl = URL.createObjectURL(logoFile);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    setPreviewUrl(null);
  }, [logoFile]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      onLogoChange(file);
      setValue("logo", file, { shouldValidate: true });
    }
  };

  const handleRemoveLogo = () => {
    onLogoChange(null);
    setValue("logo", null, { shouldValidate: true });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="border-b border-border/60 pb-4">
        <h2 className="text-xl font-bold text-foreground">Organization Identity</h2>
        <p className="text-xs text-muted-foreground sm:text-sm">
          Set up your organization's core profile, brand logo, public URL slug, and contact credentials.
        </p>
      </div>

      {/* Logo Upload Section */}
      <div className="rounded-2xl border border-border/80 bg-muted/20 p-5">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="relative flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-primary/40 bg-card shadow-xs">
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={previewUrl} alt="Organization Logo" className="size-full object-cover" />
            ) : (
              <div className="flex flex-col items-center justify-center p-2 text-center text-muted-foreground">
                <IconPhoto className="size-8 text-primary/60" />
                <span className="text-[10px] font-medium">Logo</span>
              </div>
            )}
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleFileSelect}
                className="hidden"
                id="org-logo-upload"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="gap-1.5 text-xs font-semibold"
              >
                <IconCloudUpload className="size-4 text-primary" />
                {logoFile ? "Change Logo" : "Upload Brand Logo"}
              </Button>

              {logoFile && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveLogo}
                  className="gap-1 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <IconTrash className="size-3.5" />
                  Remove
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">Recommended: Square PNG, JPG or WebP. Maximum size: 5MB.</p>
          </div>
        </div>
      </div>

      {/* Main Form Fields */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Organization Name */}
        <Field data-invalid={!!errors.name} className="sm:col-span-2">
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="org-name">
              Organization Name <span className="text-destructive">*</span>
            </FieldLabel>
            <span className="text-[11px] text-muted-foreground font-mono">{nameValue.length}/255</span>
          </div>
          <div className="relative">
            <Input
              id="org-name"
              placeholder="e.g. Orgatick Event Works"
              aria-invalid={!!errors.name}
              className="pl-9 text-base font-medium"
              {...register("name")}
            />
            <IconBuilding className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          </div>
          <FieldError errors={errors.name ? [errors.name] : []} />
        </Field>

        {/* Organization Slug */}
        <Field data-invalid={!!errors.slug} className="sm:col-span-2">
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="org-slug">
              Public Handle / Slug <span className="text-destructive">*</span>
            </FieldLabel>
            <button
              type="button"
              onClick={() => setIsAutoSlug(!isAutoSlug)}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline cursor-pointer"
            >
              <IconSparkles className="size-3" />
              {isAutoSlug ? "Auto-generating (click to edit)" : "Manual mode"}
            </button>
          </div>
          <div className="relative flex rounded-md shadow-xs">
            <span className="inline-flex items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-xs text-muted-foreground font-mono">
              orgatick.in/org/
            </span>
            <Input
              id="org-slug"
              placeholder="orgatick-events"
              aria-invalid={!!errors.slug}
              className="rounded-l-none font-mono text-sm"
              {...register("slug", {
                onChange: () => setIsAutoSlug(false),
              })}
            />
          </div>
          <FieldDescription className="text-xs">
            Unique public URL where attendees will find all your upcoming events.
          </FieldDescription>
          <FieldError errors={errors.slug ? [errors.slug] : []} />
        </Field>

        {/* Category */}
        <Field data-invalid={!!errors.categoryId}>
          <FieldLabel htmlFor="org-category">Primary Category</FieldLabel>
          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value ? String(field.value) : ""}
                onValueChange={(val) => {
                  const num = Number(val);
                  field.onChange(num);
                  // Reset subcategory if category changes
                  setValue("subCategoryId", 0 as unknown as number);
                }}
              >
                <SelectTrigger id="org-category" className="w-full">
                  <SelectValue placeholder="Select primary category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={String(cat.id)}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <FieldError errors={errors.categoryId ? [errors.categoryId] : []} />
        </Field>

        {/* Sub Category */}
        <Field data-invalid={!!errors.subCategoryId}>
          <FieldLabel htmlFor="org-subcategory">
            Sub-Category <span className="text-destructive">*</span>
          </FieldLabel>
          <Controller
            name="subCategoryId"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value ? String(field.value) : ""}
                onValueChange={(val) => field.onChange(Number(val))}
                disabled={!selectedCategoryId || subCategories.length === 0}
              >
                <SelectTrigger id="org-subcategory" className="w-full">
                  <SelectValue placeholder={!selectedCategoryId ? "Select category first" : "Select sub-category"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {subCategories.map((sub) => (
                      <SelectItem key={sub.id} value={String(sub.id)}>
                        {sub.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <FieldError errors={errors.subCategoryId ? [errors.subCategoryId] : []} />
        </Field>

        {/* Official Email */}
        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="org-email">Official Organization Email</FieldLabel>
          <div className="relative">
            <Input
              id="org-email"
              type="email"
              placeholder="contact@yourcompany.com"
              aria-invalid={!!errors.email}
              className="pl-9"
              {...register("email")}
            />
            <IconMail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          </div>
          <FieldError errors={errors.email ? [errors.email] : []} />
        </Field>

        {/* Phone Number */}
        <Field data-invalid={!!errors.phoneNumber}>
          <FieldLabel htmlFor="org-phone">Official Phone / Helpline</FieldLabel>
          <div className="relative">
            <Input
              id="org-phone"
              type="tel"
              placeholder="+91 98765 43210"
              aria-invalid={!!errors.phoneNumber}
              className="pl-9 font-mono"
              {...register("phoneNumber")}
            />
            <IconPhone className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          </div>
          <FieldError errors={errors.phoneNumber ? [errors.phoneNumber] : []} />
        </Field>

        {/* Description */}
        <Field data-invalid={!!errors.description} className="sm:col-span-2">
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="org-description">Organization Overview / Bio</FieldLabel>
            <span className="text-[11px] text-muted-foreground font-mono">{descriptionValue.length}/5000</span>
          </div>
          <Textarea
            id="org-description"
            rows={4}
            placeholder="Introduce your organization, mission, past events, and what attendees can expect..."
            className="resize-y"
            aria-invalid={!!errors.description}
            {...register("description")}
          />
          <FieldError errors={errors.description ? [errors.description] : []} />
        </Field>
      </div>

      {/* Monetization & Event Hosting Settings */}
      <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <IconCoin className="size-5 text-primary" />
              <h3 className="font-semibold text-foreground text-sm">Paid Event Hosting</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Enable ticket selling, instant bank payouts, and paid registration workflows for your events.
            </p>
          </div>

          <Controller
            name="allowPaidEvents"
            control={control}
            render={({ field }) => (
              <Switch checked={Boolean(field.value)} onCheckedChange={field.onChange} aria-label="Toggle paid events" />
            )}
          />
        </div>

        {allowPaidEvents && (
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground">Standard Commission Rate</span>
              <Badge variant="outline" className="bg-primary/10 text-primary font-mono text-xs">
                7.0% Flat Platform Fee
              </Badge>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Standard Orgatick processing fee applies to paid ticket sales. Payouts are reconciled and disbursed to
              your verified bank account.
            </p>
          </div>
        )}
      </div>

      {/* Navigation Actions */}
      <div className="flex items-center justify-end border-t border-border/60 pt-6">
        <Button type="button" onClick={onNext} className="h-11 px-8 text-sm font-semibold shadow-xs">
          Proceed to Address
        </Button>
      </div>
    </div>
  );
}
