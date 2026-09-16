"use client";

import { useState, useRef, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import type { CreateOrganizationInput } from "@orgatick/contracts";
import { Field, FieldError, FieldLabel, FieldDescription } from "@orgatick/ui/components/field";
import { Input } from "@orgatick/ui/components/input";
import { Textarea } from "@orgatick/ui/components/textarea";
import { Button } from "@orgatick/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import {
  IconBuilding,
  IconMail,
  IconPhone,
  IconUpload,
  IconX,
  IconSparkles,
  IconCategory,
  IconLink,
} from "@tabler/icons-react";
import { ORGANIZATION_CATEGORIES } from "../_constents/categories";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function BasicInfoStep() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CreateOrganizationInput>();

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoError, setLogoError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const organizationName = watch("basicInfo.name");
  const selectedCategoryId = watch("basicInfo.categoryId");
  const selectedSubCategoryId = watch("basicInfo.subCategoryId");
  const currentLogo = watch("basicInfo.logo");

  // Keep logo preview in sync if logo exists in state
  useEffect(() => {
    if (currentLogo instanceof File) {
      const objectUrl = URL.createObjectURL(currentLogo);
      setLogoPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [currentLogo]);

  const defaultCat = ORGANIZATION_CATEGORIES[0];
  const selectedCategory = ORGANIZATION_CATEGORIES.find((cat) => cat.id === Number(selectedCategoryId)) || defaultCat;
  const subCategories = selectedCategory ? selectedCategory.subCategories : [];

  const handleGenerateSlug = () => {
    if (organizationName) {
      const generated = slugify(organizationName);
      setValue("basicInfo.slug", generated, { shouldValidate: true, shouldDirty: true });
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const catId = Number(e.target.value);
    setValue("basicInfo.categoryId", catId, { shouldValidate: true, shouldDirty: true });
    const cat = ORGANIZATION_CATEGORIES.find((c) => c.id === catId);
    const firstSub = cat?.subCategories[0];
    if (firstSub) {
      setValue("basicInfo.subCategoryId", firstSub.id, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const subCatId = Number(e.target.value);
    setValue("basicInfo.subCategoryId", subCatId, { shouldValidate: true, shouldDirty: true });
  };

  const handleLogoChange = (file: File | null) => {
    setLogoError(null);
    if (!file) {
      setValue("basicInfo.logo", null, { shouldValidate: true, shouldDirty: true });
      setLogoPreview(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setLogoError("Logo must not exceed 5MB");
      return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setLogoError("Logo must be a JPEG, PNG, or WebP image");
      return;
    }

    setValue("basicInfo.logo", file, { shouldValidate: true, shouldDirty: true });
    const objectUrl = URL.createObjectURL(file);
    setLogoPreview(objectUrl);
  };

  const basicErrors = errors.basicInfo;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Organization Profile</CardTitle>
          <CardDescription>
            Provide the legal name, contact email, and branding details for your organizer entity.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Logo Upload Section */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl border border-dashed border-border bg-muted/20">
            <div className="relative flex size-20 shrink-0 items-center justify-center rounded-xl border border-border bg-muted overflow-hidden shadow-xs">
              {logoPreview ? (
                // biome-ignore lint/performance/noImgElement: user-uploaded preview object URL
                <img src={logoPreview} alt="Organization Logo" className="size-full object-cover" />
              ) : (
                <IconBuilding className="size-8 text-muted-foreground" />
              )}
            </div>

            <div className="flex-1 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">Organization Logo</span>
                <span className="text-xs text-muted-foreground">(Optional, Max 5MB)</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Upload a square logo (JPEG, PNG, or WebP) to display across your tickets, invoices, and organizer page.
              </p>

              <div className="flex items-center gap-2 pt-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    handleLogoChange(file);
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="gap-1.5 text-xs h-8"
                >
                  <IconUpload className="size-3.5" />
                  {logoPreview ? "Change Logo" : "Upload Logo"}
                </Button>
                {logoPreview && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      handleLogoChange(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="gap-1.5 text-xs h-8 text-destructive hover:bg-destructive/10"
                  >
                    <IconX className="size-3.5" />
                    Remove
                  </Button>
                )}
              </div>
              {(logoError || basicErrors?.logo?.message) && (
                <p className="text-xs text-destructive">{logoError || basicErrors?.logo?.message}</p>
              )}
            </div>
          </div>

          {/* Organization Name & Slug */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field data-invalid={Boolean(basicErrors?.name)}>
              <FieldLabel htmlFor="basicInfo.name">
                Organization Name <span className="text-destructive">*</span>
              </FieldLabel>
              <div className="relative">
                <Input
                  id="basicInfo.name"
                  placeholder="e.g. Acme Entertainment Group"
                  className="pl-9"
                  {...register("basicInfo.name")}
                />
                <IconBuilding className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              </div>
              <FieldError errors={[basicErrors?.name]} />
            </Field>

            <Field data-invalid={Boolean(basicErrors?.slug)}>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="basicInfo.slug">Public URL Slug</FieldLabel>
                <button
                  type="button"
                  onClick={handleGenerateSlug}
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  <IconSparkles className="size-3" />
                  Auto-fill
                </button>
              </div>
              <div className="relative">
                <Input
                  id="basicInfo.slug"
                  placeholder="e.g. acme-entertainment-group"
                  className="pl-9"
                  {...register("basicInfo.slug")}
                />
                <IconLink className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              </div>
              <FieldError errors={[basicErrors?.slug]} />
            </Field>
          </div>

          {/* Industry Category & Sub-Category */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field data-invalid={Boolean(basicErrors?.categoryId)}>
              <FieldLabel htmlFor="basicInfo.categoryId">Primary Industry Category</FieldLabel>
              <div className="relative">
                <select
                  id="basicInfo.categoryId"
                  value={selectedCategoryId ? Number(selectedCategoryId) : (defaultCat?.id ?? 1)}
                  onChange={handleCategoryChange}
                  className="h-9 w-full appearance-none rounded-lg border border-input bg-transparent px-3 pl-9 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {ORGANIZATION_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id} className="bg-popover text-popover-foreground">
                      {cat.name}
                    </option>
                  ))}
                </select>
                <IconCategory className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              </div>
              <FieldDescription>Choose the primary sector your events fall under.</FieldDescription>
              <FieldError errors={[basicErrors?.categoryId]} />
            </Field>

            <Field data-invalid={Boolean(basicErrors?.subCategoryId)}>
              <FieldLabel htmlFor="basicInfo.subCategoryId">
                Sub-Category <span className="text-destructive">*</span>
              </FieldLabel>
              <div className="relative">
                <select
                  id="basicInfo.subCategoryId"
                  value={selectedSubCategoryId ? Number(selectedSubCategoryId) : (subCategories[0]?.id ?? 101)}
                  onChange={handleSubCategoryChange}
                  className="h-9 w-full appearance-none rounded-lg border border-input bg-transparent px-3 pl-9 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {subCategories.map((sub) => (
                    <option key={sub.id} value={sub.id} className="bg-popover text-popover-foreground">
                      {sub.name}
                    </option>
                  ))}
                </select>
                <IconCategory className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              </div>
              <FieldDescription>Specialized domain for better event discovery.</FieldDescription>
              <FieldError errors={[basicErrors?.subCategoryId]} />
            </Field>
          </div>

          {/* Official Email & Official Phone */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field data-invalid={Boolean(basicErrors?.email)}>
              <FieldLabel htmlFor="basicInfo.email">
                Official Organization Email <span className="text-destructive">*</span>
              </FieldLabel>
              <div className="relative">
                <Input
                  id="basicInfo.email"
                  type="email"
                  placeholder="e.g. contact@acme.com"
                  className="pl-9"
                  {...register("basicInfo.email")}
                />
                <IconMail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              </div>
              <FieldError errors={[basicErrors?.email]} />
            </Field>

            <Field data-invalid={Boolean(basicErrors?.phoneNumber)}>
              <FieldLabel htmlFor="basicInfo.phoneNumber">
                Official Phone Number <span className="text-destructive">*</span>
              </FieldLabel>
              <div className="relative">
                <Input
                  id="basicInfo.phoneNumber"
                  placeholder="e.g. +1 555-0199 or +91 9876543210"
                  className="pl-9"
                  {...register("basicInfo.phoneNumber")}
                />
                <IconPhone className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              </div>
              <FieldError errors={[basicErrors?.phoneNumber]} />
            </Field>
          </div>

          {/* Organization Description */}
          <Field data-invalid={Boolean(basicErrors?.description)}>
            <FieldLabel htmlFor="basicInfo.description">Organization Overview / Bio</FieldLabel>
            <div className="relative">
              <Textarea
                id="basicInfo.description"
                placeholder="Describe your organization, past events, mission, and the community you serve..."
                rows={4}
                className="resize-none"
                {...register("basicInfo.description")}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Tell attendees and ticketing partners about your organization.</span>
              <span>{(watch("basicInfo.description") || "").length} / 5000</span>
            </div>
            <FieldError errors={[basicErrors?.description]} />
          </Field>
        </CardContent>
      </Card>
    </div>
  );
}
