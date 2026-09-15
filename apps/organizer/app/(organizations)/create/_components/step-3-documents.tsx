"use client";

import { useRef } from "react";
import { Controller, useFieldArray, type UseFormReturn } from "react-hook-form";
import {
  IconAlertCircle,
  IconCheck,
  IconFileCheck,
  IconFileUpload,
  IconInfoCircle,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { OrganizationDocumentType } from "@orgatick/contracts";
import { Button } from "@orgatick/ui/components/button";
import { Field, FieldError, FieldLabel } from "@orgatick/ui/components/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@orgatick/ui/components/select";
import { Badge } from "@orgatick/ui/components/badge";
import type { CreateOrganization } from "../_schemas/create-organization.schema";

const DOCUMENT_TYPE_LABELS: Record<OrganizationDocumentType, { label: string; description: string }> = {
  [OrganizationDocumentType.GST]: {
    label: "GST Certificate",
    description: "Goods and Services Tax Registration Certificate (Form REG-06)",
  },
  [OrganizationDocumentType.PAN]: {
    label: "Company / Trust PAN",
    description: "Permanent Account Number card of the entity or authorized trustee",
  },
  [OrganizationDocumentType.MSME]: {
    label: "MSME / Udyam Certificate",
    description: "Udyam Registration Certificate for micro/small enterprises",
  },
  [OrganizationDocumentType.AADHAR]: {
    label: "Authorized Signatory Aadhaar",
    description: "Identity verification for authorized representative / organizer",
  },
  [OrganizationDocumentType.BANK_ACCOUNT]: {
    label: "Bank Account Proof / Cancelled Cheque",
    description: "Bank statement, passbook copy, or cancelled cheque for payout processing",
  },
};

interface Step3DocumentsProps {
  form: UseFormReturn<CreateOrganization>;
  onNext: () => void;
  onPrev: () => void;
  documentFiles: Array<File | null>;
  onDocumentFileChange: (index: number, file: File | null) => void;
}

export function Step3Documents({ form, onNext, onPrev, documentFiles, onDocumentFileChange }: Step3DocumentsProps) {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "document",
  });

  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const documents = watch("document") || [];
  const minDocsRequired = 2;
  const maxDocsAllowed = 5;

  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      onDocumentFileChange(index, file);
      setValue(`document.${index}.file`, file, { shouldValidate: true });
    }
  };

  const handleAddDocument = () => {
    if (fields.length < maxDocsAllowed) {
      // Find a document type not yet selected, fallback to GST
      const existingTypes = documents.map((d) => d?.type);
      const availableType =
        Object.values(OrganizationDocumentType).find((t) => !existingTypes.includes(t)) || OrganizationDocumentType.GST;

      append({ type: availableType, file: null });
    }
  };

  const handleRemoveDocument = (index: number) => {
    if (fields.length > minDocsRequired) {
      remove(index);
      onDocumentFileChange(index, null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="border-b border-border/60 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">Legal & Verification Documents</h2>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Upload regulatory documents to verify your organizer credentials and activate ticket payouts.
            </p>
          </div>
          <Badge
            variant="outline"
            className="hidden sm:inline-flex items-center gap-1 border-primary/30 bg-primary/10 text-primary font-mono text-xs"
          >
            {fields.length} / {maxDocsAllowed} Uploads
          </Badge>
        </div>
      </div>

      {/* Verification Advisory Banner */}
      <div className="flex items-start gap-3 rounded-2xl border border-border/80 bg-muted/40 p-4">
        <IconInfoCircle className="mt-0.5 size-5 shrink-0 text-primary" />
        <div className="space-y-1 text-xs leading-relaxed text-muted-foreground">
          <p className="font-semibold text-foreground">Document Requirements</p>
          <p>
            You must provide <span className="font-medium text-foreground">at least 2 official documents</span> (e.g.
            GST + PAN, or MSME + Bank proof). Allowed formats: PDF, DOC, DOCX, JPG, PNG (Max 5MB per file).
          </p>
        </div>
      </div>

      {/* Global Array Validation Error */}
      {errors.document && typeof errors.document.message === "string" && (
        <div className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs font-semibold text-destructive">
          <IconAlertCircle className="size-4" />
          {errors.document.message}
        </div>
      )}

      {/* Documents Field Array */}
      <div className="space-y-4">
        {fields.map((fieldItem, index) => {
          const docType = documents[index]?.type;
          const currentFile = documentFiles[index] || (documents[index]?.file as File | null);
          const docError = errors.document?.[index];
          const typeDetails = docType ? DOCUMENT_TYPE_LABELS[docType] : null;

          return (
            <div
              key={fieldItem.id}
              className="rounded-2xl border border-border/80 bg-card p-5 shadow-xs transition-colors hover:border-border"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                {/* Left: Document Type Selection */}
                <div className="flex-1 space-y-3">
                  <Field data-invalid={!!docError?.type}>
                    <div className="flex items-center justify-between">
                      <FieldLabel htmlFor={`doc-type-${index}`}>
                        Document Type #{index + 1} <span className="text-destructive">*</span>
                      </FieldLabel>
                      {currentFile && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                          <IconCheck className="size-3" />
                          Ready for upload
                        </span>
                      )}
                    </div>

                    <Controller
                      name={`document.${index}.type`}
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger id={`doc-type-${index}`} className="w-full">
                            <SelectValue placeholder="Select document type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {Object.values(OrganizationDocumentType).map((type) => (
                                <SelectItem key={type} value={type}>
                                  {DOCUMENT_TYPE_LABELS[type]?.label || type}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <FieldError errors={docError?.type ? [docError.type] : []} />
                  </Field>

                  {typeDetails && <p className="text-[11px] text-muted-foreground">{typeDetails.description}</p>}
                </div>

                {/* Right: File Upload Area */}
                <div className="w-full md:w-80 space-y-2">
                  <input
                    ref={(el) => {
                      fileInputRefs.current[index] = el;
                    }}
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"
                    onChange={(e) => handleFileChange(index, e)}
                    className="hidden"
                    id={`doc-file-${index}`}
                  />

                  {currentFile ? (
                    <div className="flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 p-3">
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <IconFileCheck className="size-5 shrink-0 text-primary" />
                        <div className="overflow-hidden">
                          <p className="truncate font-medium text-foreground text-xs">{currentFile.name}</p>
                          <p className="text-[10px] text-muted-foreground font-mono">
                            {(currentFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => fileInputRefs.current[index]?.click()}
                        className="h-7 text-xs font-semibold text-primary"
                      >
                        Change
                      </Button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRefs.current[index]?.click()}
                      className="flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 p-4 text-center transition-colors hover:border-primary/50 hover:bg-muted/60"
                    >
                      <IconFileUpload className="size-6 text-muted-foreground" />
                      <span className="mt-1 font-semibold text-foreground text-xs">Select Document File</span>
                      <span className="text-[10px] text-muted-foreground">PDF, DOCX, JPG (Max 5MB)</span>
                    </button>
                  )}

                  <FieldError errors={docError?.file ? [docError.file] : []} />
                </div>

                {/* Remove Action Button */}
                {fields.length > minDocsRequired && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveDocument(index)}
                    className="self-end md:self-center text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
                    aria-label={`Remove document ${index + 1}`}
                  >
                    <IconTrash className="size-4" />
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Another Document Button */}
      {fields.length < maxDocsAllowed && (
        <Button
          type="button"
          variant="outline"
          onClick={handleAddDocument}
          className="w-full gap-2 border-dashed py-5 text-xs font-semibold"
        >
          <IconPlus className="size-4 text-primary" />
          Add Another Verification Document ({fields.length}/{maxDocsAllowed})
        </Button>
      )}

      {/* Navigation Actions */}
      <div className="flex items-center justify-between border-t border-border/60 pt-6">
        <Button type="button" variant="outline" onClick={onPrev} className="h-11 px-6 text-sm font-semibold">
          Back
        </Button>

        <Button type="button" onClick={onNext} className="h-11 px-8 text-sm font-semibold shadow-xs">
          Proceed to Social & Support
        </Button>
      </div>
    </div>
  );
}
