"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import type { CreateOrganizationInput } from "@orgatick/contracts";
import { FormSection } from "../_components/form-section";
import { Badge } from "@orgatick/ui/components/badge";
import { Button } from "@orgatick/ui/components/button";
import { Separator } from "@orgatick/ui/components/separator";
import { Alert, AlertTitle, AlertDescription } from "@orgatick/ui/components/alert";
import {
  IconBuilding,
  IconMapPin,
  IconFileText,
  IconShare,
  IconEdit,
  IconCrown,
  IconShieldCheck,
} from "@tabler/icons-react";
import { getSocialIcon } from "./contacts-step";
import { CategoryNames } from "@/components/category-names";

interface ReviewStepProps {
  onEditStep: (stepIndex: number) => void;
}

export function ReviewStep({ onEditStep }: ReviewStepProps) {
  const { watch } = useFormContext<CreateOrganizationInput>();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const basicInfo = watch("basicInfo");
  const address = watch("address");
  const documents = watch("document") || [];
  const socialLinks = watch("socialLinks") || [];
  const supportContacts = watch("supportContacts") || [];

  const logoFile = basicInfo?.logo;

  useEffect(() => {
    if (logoFile instanceof File) {
      const objectUrl = URL.createObjectURL(logoFile);
      setLogoPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    setLogoPreview(null);
  }, [logoFile]);

  return (
    <div className="flex flex-col gap-6">
      {/* Overview Notice */}
      <Alert>
        <IconShieldCheck />
        <AlertTitle>Review & Confirm Organization Application</AlertTitle>
        <AlertDescription>
          Please verify all details before submitting. Once submitted, our team will review compliance documents.
        </AlertDescription>
      </Alert>

      {/* 1. Basic Information Summary */}
      <FormSection
        title={
          <span className="flex items-center gap-2">
            <IconBuilding className="size-4 text-primary" />
            Organization Profile
          </span>
        }
        action={
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onEditStep(0)}
            className="text-primary hover:bg-primary/10"
          >
            <IconEdit data-icon="inline-start" />
            Edit
          </Button>
        }
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-4">
            <div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-muted">
              {logoPreview ? (
                // biome-ignore lint/performance/noImgElement: user-uploaded preview object URL
                <img src={logoPreview} alt="Logo Preview" className="size-full object-cover" />
              ) : (
                <IconBuilding className="size-6 text-muted-foreground" />
              )}
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-sm font-bold text-foreground">{basicInfo?.name || "Untitled Organization"}</h4>
              {basicInfo?.slug && (
                <p className="font-mono text-xs text-muted-foreground">orgatick.com/{basicInfo.slug}</p>
              )}
              <div className="flex flex-wrap gap-2 pt-1">
                <CategoryNames
                  categoryId={(basicInfo?.categoryId as number | undefined) ?? null}
                  subCategoryId={(basicInfo?.subCategoryId as number | undefined) ?? null}
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
              <p className="mt-1 leading-relaxed text-foreground">{basicInfo.description}</p>
            </div>
          )}
        </div>
      </FormSection>

      {/* 2. Registered Address Summary */}
      <FormSection
        title={
          <span className="flex items-center gap-2">
            <IconMapPin className="size-4 text-primary" />
            Registered Office Address
          </span>
        }
        action={
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onEditStep(1)}
            className="text-primary hover:bg-primary/10"
          >
            <IconEdit data-icon="inline-start" />
            Edit
          </Button>
        }
      >
        <div className="flex flex-col gap-2">
          <p className="font-medium text-foreground">{address?.addressLine1 || "—"}</p>
          {address?.addressLine2 && <p className="text-muted-foreground">{address.addressLine2}</p>}
          {address?.landmark && <p className="text-muted-foreground">Landmark: {address.landmark}</p>}
          {address?.postalCode && <p className="text-muted-foreground">Postal Code: {address.postalCode}</p>}
        </div>
      </FormSection>

      {/* 3. Verification Documents Summary */}
      <FormSection
        title={
          <span className="flex items-center gap-2">
            <IconFileText className="size-4 text-primary" />
            Verification Documents ({documents.length})
          </span>
        }
        action={
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onEditStep(2)}
            className="text-primary hover:bg-primary/10"
          >
            <IconEdit data-icon="inline-start" />
            Edit
          </Button>
        }
      >
        <div className="flex flex-col gap-2">
          {documents.map((doc) => {
            const hasFile = doc.file instanceof File;
            return (
              <div
                key={doc.type}
                className="flex items-center justify-between rounded-lg border border-border bg-muted/20 p-2.5"
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold uppercase text-foreground">{doc.type}</span>
                  {hasFile ? (
                    <span className="text-muted-foreground">({(doc.file as File).name})</span>
                  ) : (
                    <span className="italic text-muted-foreground">(No file attached)</span>
                  )}
                </div>
                {hasFile ? (
                  <Badge variant="secondary">Attached</Badge>
                ) : (
                  <Badge variant="outline" className="text-muted-foreground">
                    Pending
                  </Badge>
                )}
              </div>
            );
          })}
        </div>
      </FormSection>

      {/* 4. Social Links & Support Contacts Summary */}
      <FormSection
        title={
          <span className="flex items-center gap-2">
            <IconShare className="size-4 text-primary" />
            Social Links & Support Team
          </span>
        }
        action={
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onEditStep(3)}
            className="text-primary hover:bg-primary/10"
          >
            <IconEdit data-icon="inline-start" />
            Edit
          </Button>
        }
      >
        <div className="flex flex-col gap-4">
          <div>
            <span className="mb-2 block font-semibold text-foreground">Connected Channels</span>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((s) => (
                <div
                  key={s.platform}
                  className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 shadow-2xs"
                >
                  {getSocialIcon(s.platform)}
                  <span className="font-medium capitalize text-foreground">{s.platform}:</span>
                  <a
                    href={s.url || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="max-w-[150px] truncate text-primary hover:underline"
                  >
                    {s.url || "—"}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <span className="mb-2 block font-semibold text-foreground">Support Contacts</span>
            <div className="grid gap-2 sm:grid-cols-2">
              {supportContacts.map((contact) => (
                <div
                  key={contact.name || contact.email}
                  className="flex flex-col gap-1 rounded-lg border border-border bg-muted/20 p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">{contact.name || "—"}</span>
                    {contact.isPrimary && (
                      <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary">
                        <IconCrown />
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
        </div>
      </FormSection>
    </div>
  );
}
