"use client";

import { useState, useRef, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import type { CreateOrganizationInput } from "@orgatick/contracts";
import { Field, FieldError, FieldLabel, FieldDescription, FieldGroup } from "@orgatick/ui/components/field";
import { Button } from "@orgatick/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@orgatick/ui/components/select";
import { PhoneInput } from "@orgatick/ui/components/phone-input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@orgatick/ui/components/input-group";
import { IconBuilding, IconMail, IconUpload, IconX, IconSparkles, IconLink } from "@tabler/icons-react";
import { ORGANIZATION_CATEGORIES } from "../_constents/categories";
import Image from "next/image";

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
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CreateOrganizationInput>();

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoError, setLogoError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const organizationName = watch("basicInfo.name");
  const selectedCategoryId = watch("basicInfo.categoryId");
  const currentLogo = watch("basicInfo.logo");
  const description = watch("basicInfo.description") || "";

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

  const handleCategoryChange = (catId: number) => {
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

  const handleSubCategoryChange = (subCatId: number) => {
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
    <Card>
      <CardHeader>
        <CardTitle>Organization Profile</CardTitle>
        <CardDescription>
          Provide the legal name, contact email, and branding details for your organizer entity.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {/* Logo Upload Section */}
        <div className="flex flex-col gap-4 rounded-xl border border-dashed border-border bg-muted/20 p-4 sm:flex-row sm:items-center">
          <div className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-muted shadow-xs">
            {logoPreview ? (
              <Image
                src={logoPreview}
                alt="Organization Logo"
                className="size-full object-cover"
                width={100}
                height={100}
              />
            ) : (
              <IconBuilding className="size-8 text-muted-foreground" />
            )}
          </div>

          <div className="flex flex-1 flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-foreground">Organization Logo</span>
              <span className="text-xs text-muted-foreground">(Optional, max 5MB)</span>
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
              <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                <IconUpload data-icon="inline-start" />
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
                  className="text-destructive hover:bg-destructive/10"
                >
                  <IconX data-icon="inline-start" />
                  Remove
                </Button>
              )}
            </div>
            {(logoError || basicErrors?.logo?.message) && (
              <p className="text-xs text-destructive">{logoError || basicErrors?.logo?.message}</p>
            )}
          </div>
        </div>

        <FieldGroup className="gap-5">
          {/* Organization Name & Slug */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field data-invalid={Boolean(basicErrors?.name)}>
              <FieldLabel htmlFor="basicInfo.name">
                Organization Name <span className="text-destructive">*</span>
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="basicInfo.name"
                  placeholder="e.g. Acme Entertainment Group"
                  aria-invalid={Boolean(basicErrors?.name)}
                  {...register("basicInfo.name")}
                />
                <InputGroupAddon>
                  <IconBuilding />
                </InputGroupAddon>
              </InputGroup>
              <FieldError errors={[basicErrors?.name]} />
            </Field>

            <Field data-invalid={Boolean(basicErrors?.slug)}>
              <div className="flex items-center justify-between gap-2">
                <FieldLabel htmlFor="basicInfo.slug">Public URL Slug</FieldLabel>
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  onClick={handleGenerateSlug}
                  className="h-auto p-0 text-primary"
                >
                  <IconSparkles data-icon="inline-start" />
                  Auto-fill
                </Button>
              </div>
              <InputGroup>
                <InputGroupInput
                  id="basicInfo.slug"
                  placeholder="e.g. acme-entertainment-group"
                  aria-invalid={Boolean(basicErrors?.slug)}
                  {...register("basicInfo.slug")}
                />
                <InputGroupAddon>
                  <IconLink />
                </InputGroupAddon>
              </InputGroup>
              <FieldError errors={[basicErrors?.slug]} />
            </Field>
          </div>

          {/* Industry Category & Sub-Category */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Controller
              control={control}
              name="basicInfo.categoryId"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="basicInfo.categoryId">Primary Industry Category</FieldLabel>
                  <Select
                    name={field.name}
                    value={String(field.value ?? "")}
                    onValueChange={(value) => handleCategoryChange(Number(value))}
                  >
                    <SelectTrigger id="basicInfo.categoryId" className="w-full" aria-invalid={fieldState.invalid}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {ORGANIZATION_CATEGORIES.map((cat) => (
                          <SelectItem key={cat.id} value={String(cat.id)}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FieldDescription>Choose the primary sector your events fall under.</FieldDescription>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              control={control}
              name="basicInfo.subCategoryId"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="basicInfo.subCategoryId">
                    Sub-Category <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Select
                    name={field.name}
                    value={String(field.value ?? "")}
                    onValueChange={(value) => handleSubCategoryChange(Number(value))}
                  >
                    <SelectTrigger id="basicInfo.subCategoryId" className="w-full" aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="Select a sub-category" />
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
                  <FieldDescription>Specialized domain for better event discovery.</FieldDescription>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>

          {/* Official Email & Official Phone */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field data-invalid={Boolean(basicErrors?.email)}>
              <FieldLabel htmlFor="basicInfo.email">
                Official Organization Email <span className="text-destructive">*</span>
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="basicInfo.email"
                  type="email"
                  placeholder="e.g. contact@acme.com"
                  aria-invalid={Boolean(basicErrors?.email)}
                  {...register("basicInfo.email")}
                />
                <InputGroupAddon>
                  <IconMail />
                </InputGroupAddon>
              </InputGroup>
              <FieldError errors={[basicErrors?.email]} />
            </Field>

            <Field data-invalid={Boolean(basicErrors?.phoneNumber)}>
              <FieldLabel htmlFor="basicInfo.phoneNumber">
                Official Phone Number <span className="text-destructive">*</span>
              </FieldLabel>

              <PhoneInput
                id="basicInfo.phoneNumber"
                aria-invalid={Boolean(basicErrors?.phoneNumber)}
                onChange={(e) => setValue("basicInfo.phoneNumber", e, { shouldValidate: true, shouldDirty: true })}
              />
              <FieldError errors={[basicErrors?.phoneNumber]} />
            </Field>
          </div>

          {/* Organization Description */}
          <Field data-invalid={Boolean(basicErrors?.description)}>
            <FieldLabel htmlFor="basicInfo.description">Organization Overview / Bio</FieldLabel>
            <InputGroup>
              <InputGroupTextarea
                id="basicInfo.description"
                placeholder="Describe your organization, past events, mission, and the community you serve..."
                rows={4}
                aria-invalid={Boolean(basicErrors?.description)}
                {...register("basicInfo.description")}
              />
              <InputGroupAddon align="block-end">
                <InputGroupText className="tabular-nums">{description.length} / 5000</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            <FieldDescription>Tell attendees and ticketing partners about your organization.</FieldDescription>
            <FieldError errors={[basicErrors?.description]} />
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
