"use client";

import { useFormContext } from "react-hook-form";
import type { CreateOrganizationInput } from "@orgatick/contracts";
import { Card, CardContent, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import { Badge } from "@orgatick/ui/components/badge";
import { Button } from "@orgatick/ui/components/button";
import { Separator } from "@orgatick/ui/components/separator";
import {
  IconBuilding,
  IconMapPin,
  IconFileText,
  IconShare,
  IconEdit,
  IconCheck,
  IconCrown,
  IconShieldCheck,
} from "@tabler/icons-react";
import { ORGANIZATION_CATEGORIES } from "../_constents/categories";
import { getSocialIcon } from "./contacts-step";

interface ReviewStepProps {
  onEditStep: (stepIndex: number) => void;
}

export function ReviewStep({ onEditStep }: ReviewStepProps) {
  const { watch } = useFormContext<CreateOrganizationInput>();

  const basicInfo = watch("basicInfo");
  const address = watch("address");
  const documents = watch("document") || [];
  const socialLinks = watch("socialLinks") || [];
  const supportContacts = watch("supportContacts") || [];

  const category = ORGANIZATION_CATEGORIES.find((c) => c.id === Number(basicInfo?.categoryId));
  const subCategory = category?.subCategories.find((s) => s.id === Number(basicInfo?.subCategoryId));

  const logoFile = basicInfo?.logo;
  const logoUrl = logoFile instanceof File ? URL.createObjectURL(logoFile) : null;

  return (
    <div className="space-y-6">
      {/* Overview Notice */}
      <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <IconShieldCheck className="size-5" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">Review & Confirm Organization Application</h4>
          <p className="text-xs text-muted-foreground">
            Please verify all details before submitting. Once submitted, our team will review compliance documents.
          </p>
        </div>
      </div>

      {/* 1. Basic Information Summary */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div className="flex items-center gap-2">
            <IconBuilding className="size-4 text-primary" />
            <CardTitle className="text-base">Organization Profile</CardTitle>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onEditStep(0)}
            className="h-8 gap-1 text-xs text-primary hover:bg-primary/10"
          >
            <IconEdit className="size-3.5" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-4 text-xs">
          <div className="flex items-start gap-4">
            <div className="relative flex size-14 shrink-0 items-center justify-center rounded-xl border border-border bg-muted overflow-hidden">
              {logoUrl ? (
                // biome-ignore lint/performance/noImgElement: user-uploaded preview object URL
                <img src={logoUrl} alt="Logo Preview" className="size-full object-cover" />
              ) : (
                <IconBuilding className="size-6 text-muted-foreground" />
              )}
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-foreground">{basicInfo?.name || "Untitled Organization"}</h4>
              {basicInfo?.slug && (
                <p className="font-mono text-xs text-muted-foreground">orgatick.com/{basicInfo.slug}</p>
              )}
              <div className="flex flex-wrap gap-2 pt-1">
                {category && <Badge variant="secondary">{category.name}</Badge>}
                {subCategory && <Badge variant="outline">{subCategory.name}</Badge>}
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <span className="text-muted-foreground">Official Email:</span>
              <p className="font-medium text-foreground">{basicInfo?.email || "—"}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Official Phone:</span>
              <p className="font-medium text-foreground">{basicInfo?.phoneNumber || "—"}</p>
            </div>
          </div>

          {basicInfo?.description && (
            <div>
              <span className="text-muted-foreground">Overview:</span>
              <p className="mt-1 text-foreground leading-relaxed">{basicInfo.description}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 2. Registered Address Summary */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div className="flex items-center gap-2">
            <IconMapPin className="size-4 text-primary" />
            <CardTitle className="text-base">Registered Office Address</CardTitle>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onEditStep(1)}
            className="h-8 gap-1 text-xs text-primary hover:bg-primary/10"
          >
            <IconEdit className="size-3.5" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-2 text-xs">
          <p className="font-medium text-foreground">{address?.addressLine1 || "—"}</p>
          {address?.addressLine2 && <p className="text-muted-foreground">{address.addressLine2}</p>}
          {address?.landmark && <p className="text-muted-foreground">Landmark: {address.landmark}</p>}
          {address?.postalCode && <p className="text-muted-foreground">Postal Code: {address.postalCode}</p>}
        </CardContent>
      </Card>

      {/* 3. Verification Documents Summary */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div className="flex items-center gap-2">
            <IconFileText className="size-4 text-primary" />
            <CardTitle className="text-base">Verification Documents ({documents.length})</CardTitle>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onEditStep(2)}
            className="h-8 gap-1 text-xs text-primary hover:bg-primary/10"
          >
            <IconEdit className="size-3.5" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-2 text-xs">
          {documents.map((doc) => {
            const hasFile = doc.file instanceof File;
            return (
              <div
                key={doc.type}
                className="flex items-center justify-between rounded-lg border border-border p-2.5 bg-muted/20"
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground uppercase">{doc.type}</span>
                  {hasFile ? (
                    <span className="text-muted-foreground">({(doc.file as File).name})</span>
                  ) : (
                    <span className="text-muted-foreground italic">(No file attached)</span>
                  )}
                </div>
                {hasFile ? (
                  <Badge variant="outline" className="text-emerald-600 bg-emerald-500/10 border-emerald-500/20 gap-1">
                    <IconCheck className="size-3" /> Attached
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-amber-600 bg-amber-500/10 border-amber-500/20">
                    Pending
                  </Badge>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* 4. Social Links & Support Contacts Summary */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div className="flex items-center gap-2">
            <IconShare className="size-4 text-primary" />
            <CardTitle className="text-base">Social Links & Support Team</CardTitle>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onEditStep(3)}
            className="h-8 gap-1 text-xs text-primary hover:bg-primary/10"
          >
            <IconEdit className="size-3.5" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-4 text-xs">
          <div>
            <span className="font-semibold text-foreground block mb-2">Connected Channels</span>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((s) => (
                <div
                  key={s.platform}
                  className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 shadow-2xs"
                >
                  {getSocialIcon(s.platform)}
                  <span className="capitalize font-medium text-foreground">{s.platform}:</span>
                  <a
                    href={s.url || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline max-w-[150px] truncate"
                  >
                    {s.url || "—"}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <span className="font-semibold text-foreground block mb-2">Support Contacts</span>
            <div className="grid gap-2 sm:grid-cols-2">
              {supportContacts.map((contact) => (
                <div
                  key={contact.name || contact.email}
                  className="rounded-lg border border-border p-3 bg-muted/20 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">{contact.name || "—"}</span>
                    {contact.isPrimary && (
                      <Badge variant="secondary" className="gap-1 text-[10px] bg-primary/10 text-primary">
                        <IconCrown className="size-3" />
                        Primary
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground">{contact.email || "—"}</p>
                  <p className="text-muted-foreground">{contact.phoneNumber || "—"}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
