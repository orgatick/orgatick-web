"use client";

import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import {
  IconBuildingCommunity,
  IconCheck,
  IconEdit,
  IconFileCheck,
  IconGlobe,
  IconLoader2,
  IconMail,
  IconMapPin,
  IconPhone,
  IconPhoto,
  IconRocket,
  IconStar,
} from "@tabler/icons-react";
import { Button } from "@orgatick/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import { Badge } from "@orgatick/ui/components/badge";
import { DEFAULT_CATEGORIES } from "../_services";
import type { FormStep, CategoryOption } from "../_types";
import type { CreateOrganization } from "../_schemas/create-organization.schema";

interface Step5ReviewProps {
  form: UseFormReturn<CreateOrganization>;
  onPrev: () => void;
  onEditStep: (step: FormStep) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  logoFile: File | null;
  documentFiles: Array<File | null>;
  categories?: CategoryOption[];
}

export function Step5Review({
  form,
  onPrev,
  onEditStep,
  onSubmit,
  isSubmitting,
  logoFile,
  documentFiles,
  categories = DEFAULT_CATEGORIES,
}: Step5ReviewProps) {
  const values = form.getValues();
  const [agreed, setAgreed] = useState(false);

  // Category and subcategory labels
  const currentCategory = categories.find((c) => Number(c.id) === Number(values.categoryId));
  const currentSubCategory = currentCategory?.subCategories.find((s) => Number(s.id) === Number(values.subCategoryId));

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="border-b border-border/60 pb-4">
        <h2 className="text-xl font-bold text-foreground">Review & Submit Organization</h2>
        <p className="text-xs text-muted-foreground sm:text-sm">
          Please double-check all details before creating your organization. You can edit settings later in the Admin
          Dashboard.
        </p>
      </div>

      <div className="grid gap-6">
        {/* CARD 1: BASIC INFO */}
        <Card className="border-border/80 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border/60 pb-4">
            <div className="flex items-center gap-2">
              <IconBuildingCommunity className="size-5 text-primary" />
              <CardTitle className="text-base font-bold text-foreground">Organization Identity</CardTitle>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onEditStep(1)}
              className="h-8 gap-1.5 text-xs font-semibold"
            >
              <IconEdit className="size-3.5" />
              Edit
            </Button>
          </CardHeader>
          <CardContent className="pt-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Logo Preview */}
              <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border bg-muted/40 shadow-xs">
                {logoFile ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={URL.createObjectURL(logoFile)} alt="Logo Preview" className="size-full object-cover" />
                ) : (
                  <IconPhoto className="size-8 text-muted-foreground/60" />
                )}
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-foreground">{values.name || "Untitled"}</h3>
                <p className="font-mono text-xs text-primary">orgatick.in/org/{values.slug || "your-slug"}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {currentCategory && (
                    <Badge variant="secondary" className="text-xs">
                      {currentCategory.name}
                    </Badge>
                  )}
                  {currentSubCategory && (
                    <Badge variant="outline" className="text-xs">
                      {currentSubCategory.name}
                    </Badge>
                  )}
                  {values.allowPaidEvents && (
                    <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-xs">
                      Paid Events Enabled (7% Fee)
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {values.description && (
              <p className="text-xs leading-relaxed text-muted-foreground line-clamp-3 bg-muted/30 p-3 rounded-xl">
                {values.description}
              </p>
            )}

            <div className="grid gap-3 pt-2 sm:grid-cols-2 text-xs">
              {values.email && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <IconMail className="size-4 text-primary" />
                  <span>{values.email}</span>
                </div>
              )}
              {values.phoneNumber && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <IconPhone className="size-4 text-primary" />
                  <span className="font-mono">{values.phoneNumber}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* CARD 2: ADDRESS */}
        <Card className="border-border/80 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border/60 pb-4">
            <div className="flex items-center gap-2">
              <IconMapPin className="size-5 text-primary" />
              <CardTitle className="text-base font-bold text-foreground">Registered Address</CardTitle>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onEditStep(2)}
              className="h-8 gap-1.5 text-xs font-semibold"
            >
              <IconEdit className="size-3.5" />
              Edit
            </Button>
          </CardHeader>
          <CardContent className="pt-5 space-y-2 text-xs">
            <p className="font-medium text-foreground text-sm">{values.address?.addressLine1}</p>
            {values.address?.addressLine2 && <p className="text-muted-foreground">{values.address.addressLine2}</p>}
            <div className="flex flex-wrap gap-4 pt-2 text-muted-foreground">
              {values.address?.landmark && (
                <span>
                  <strong>Landmark:</strong> {values.address.landmark}
                </span>
              )}
              {values.address?.postalCode && (
                <span>
                  <strong>Postal Code:</strong> {values.address.postalCode}
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* CARD 3: VERIFICATION DOCUMENTS */}
        <Card className="border-border/80 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border/60 pb-4">
            <div className="flex items-center gap-2">
              <IconFileCheck className="size-5 text-primary" />
              <CardTitle className="text-base font-bold text-foreground">
                Verification Documents ({values.document?.length || 0})
              </CardTitle>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onEditStep(3)}
              className="h-8 gap-1.5 text-xs font-semibold"
            >
              <IconEdit className="size-3.5" />
              Edit
            </Button>
          </CardHeader>
          <CardContent className="pt-5">
            <div className="grid gap-3 sm:grid-cols-2">
              {values.document?.map((doc, idx) => {
                const attachedFile = documentFiles[idx] || (doc.file as File | null);
                return (
                  <div
                    key={`rev-doc-${idx}`}
                    className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 p-3"
                  >
                    <div className="space-y-0.5 overflow-hidden pr-2">
                      <Badge variant="outline" className="font-mono text-[10px]">
                        {doc.type}
                      </Badge>
                      <p className="truncate text-xs font-medium text-foreground">
                        {attachedFile ? attachedFile.name : "Document attached"}
                      </p>
                    </div>
                    <IconCheck className="size-4 shrink-0 text-emerald-600" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* CARD 4: SOCIAL & SUPPORT CONTACTS */}
        <Card className="border-border/80 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border/60 pb-4">
            <div className="flex items-center gap-2">
              <IconGlobe className="size-5 text-primary" />
              <CardTitle className="text-base font-bold text-foreground">Online Presence & Support</CardTitle>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onEditStep(4)}
              className="h-8 gap-1.5 text-xs font-semibold"
            >
              <IconEdit className="size-3.5" />
              Edit
            </Button>
          </CardHeader>
          <CardContent className="pt-5 space-y-5">
            {/* Social Links */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Public Social Channels
              </span>
              <div className="flex flex-wrap gap-2">
                {values.socialLinks?.map((link, idx) => (
                  <Badge key={`rev-link-${idx}`} variant="outline" className="gap-1.5 py-1 px-2.5 text-xs">
                    <span className="font-bold text-primary">{link.platform}:</span>
                    <span className="max-w-40 truncate font-mono">{link.url}</span>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Support Contacts */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Support Team ({values.supportContacts?.length || 0})
              </span>
              <div className="grid gap-3 sm:grid-cols-2">
                {values.supportContacts?.map((contact, idx) => (
                  <div
                    key={`rev-contact-${idx}`}
                    className="rounded-xl border border-border/60 bg-muted/20 p-3 space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground">{contact.name}</span>
                      {contact.isPrimary && (
                        <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 text-[10px] gap-1">
                          <IconStar className="size-3 fill-amber-500" />
                          Primary Lead
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground">{contact.email}</p>
                    <p className="font-mono text-muted-foreground">{contact.phoneNumber}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Terms & Agreement Confirmation */}
      <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 size-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <div className="space-y-1 text-xs leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">Organizer Terms & Payout Declaration</span>
            <p>
              I confirm that I am an authorized representative of this organization. I agree to Orgatick's Organizer
              Terms of Service, Event Publishing Policies, and ticket refund guidelines.
            </p>
          </div>
        </label>
      </div>

      {/* Navigation Actions */}
      <div className="flex items-center justify-between border-t border-border/60 pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onPrev}
          disabled={isSubmitting}
          className="h-11 px-6 text-sm font-semibold"
        >
          Back
        </Button>

        <Button
          type="button"
          onClick={onSubmit}
          disabled={!agreed || isSubmitting}
          className="h-12 min-w-48 gap-2 text-sm font-bold shadow-lg shadow-primary/25 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <IconLoader2 className="size-5 animate-spin" />
              <span>Creating Organization...</span>
            </>
          ) : (
            <>
              <IconRocket className="size-5" />
              <span>Create Organization</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
