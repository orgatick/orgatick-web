"use client";

import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { type CreateOrganizationInput, OrganizationDocumentType } from "@orgatick/contracts";
import { Field, FieldError, FieldLabel, FieldDescription } from "@orgatick/ui/components/field";
import { Button } from "@orgatick/ui/components/button";
import { FormSection } from "../_components/form-section";
import { Badge } from "@orgatick/ui/components/badge";
import { Alert, AlertTitle, AlertDescription } from "@orgatick/ui/components/alert";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@orgatick/ui/components/select";
import {
  IconFileCheck,
  IconFileUpload,
  IconPlus,
  IconTrash,
  IconAlertCircle,
  IconX,
  IconFileCertificate,
} from "@tabler/icons-react";

const DOCUMENT_TYPE_LABELS: Record<OrganizationDocumentType, { label: string; desc: string }> = {
  [OrganizationDocumentType.PAN]: {
    label: "Company / Entity PAN Card",
    desc: "Permanent Account Number card of the organization or proprietor",
  },
  [OrganizationDocumentType.GST]: {
    label: "GST Registration Certificate",
    desc: "Goods and Services Tax registration document (GSTIN)",
  },
  [OrganizationDocumentType.BANK_ACCOUNT]: {
    label: "Bank Account Proof / Cancelled Cheque",
    desc: "Bank passbook, statement, or cancelled cheque showing company bank details",
  },
  [OrganizationDocumentType.MSME]: {
    label: "MSME / Udyam Certificate",
    desc: "Micro, Small & Medium Enterprises registration certificate",
  },
  [OrganizationDocumentType.AADHAR]: {
    label: "Authorized Signatory Aadhar / ID",
    desc: "Government-issued identity proof of the primary organizer or director",
  },
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function DocumentsStep() {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CreateOrganizationInput>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "document",
  });

  const documents = watch("document") || [];
  const documentErrors = errors.document;

  const handleAddDocument = () => {
    if (fields.length >= 5) return;
    const usedTypes = documents.map((d) => d.type);
    const allTypes = Object.values(OrganizationDocumentType);
    const nextType = allTypes.find((t) => !usedTypes.includes(t)) || OrganizationDocumentType.MSME;

    append({
      type: nextType,
      file: null,
    });
  };

  const handleFileChange = (index: number, file: File | null) => {
    if (!file) {
      setValue(`document.${index}.file`, null, { shouldValidate: true, shouldDirty: true });
      return;
    }
    setValue(`document.${index}.file`, file, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <FormSection
      title="Verification & Compliance Documents"
      description="Upload official regulatory documents to verify your business identity and activate payouts."
      action={
        <Badge variant="outline" className="w-fit gap-1 text-xs">
          <IconFileCertificate className="text-primary" />
          <span>{documents.length} / 5 Documents</span>
        </Badge>
      }
    >
      <div className="flex flex-col gap-5">
        {/* Requirement Alert */}
        <Alert>
          <IconAlertCircle />
          <AlertTitle>Compliance Requirements</AlertTitle>
          <AlertDescription>
            <ul className="mt-2 list-disc pl-4 text-xs text-muted-foreground">
              <li>Minimum of 2 valid verification documents required (maximum 5).</li>
              <li>Accepted formats: PDF, Word document (.doc, .docx).</li>
              <li>Maximum file size per document is 5 MB.</li>
            </ul>
          </AlertDescription>
        </Alert>

        {/* Root Document Array Error */}
        {documentErrors && !Array.isArray(documentErrors) && documentErrors.message && (
          <Alert variant="destructive">
            <IconAlertCircle />
            <AlertTitle>{documentErrors.message}</AlertTitle>
          </Alert>
        )}

        {/* Documents List */}
        <div className="flex flex-col gap-4">
          {fields.map((field, index) => {
            const currentDoc = documents[index];
            const docFile = currentDoc?.file;
            const docError = Array.isArray(documentErrors) ? documentErrors[index] : undefined;

            return (
              <div
                key={field.id}
                className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 shadow-2xs transition-all hover:border-border/80"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex size-6 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                      {index + 1}
                    </span>
                    <span className="text-sm font-semibold text-foreground">Document {index + 1}</span>
                  </div>

                  {fields.length > 2 && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)}>
                      <IconTrash data-icon="inline-start" />
                      Remove
                    </Button>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Document Type Selector */}
                  <Field data-invalid={Boolean(docError?.type)}>
                    <FieldLabel>
                      Document Type <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Controller
                      control={control}
                      name={`document.${index}.type`}
                      render={({ field: controllerField, fieldState }) => (
                        <Select
                          name={controllerField.name}
                          value={String(controllerField.value ?? "")}
                          onValueChange={controllerField.onChange}
                        >
                          <SelectTrigger className="w-full" aria-invalid={fieldState.invalid}>
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
                    <FieldDescription>
                      {DOCUMENT_TYPE_LABELS[currentDoc?.type as OrganizationDocumentType]?.desc}
                    </FieldDescription>
                    <FieldError errors={[docError?.type]} />
                  </Field>

                  {/* File Upload / Attachment */}
                  <Field data-invalid={Boolean(docError?.file)}>
                    <FieldLabel>Attach Document File</FieldLabel>
                    <div>
                      {docFile instanceof File ? (
                        <div className="flex items-center justify-between rounded-lg border border-primary/30 bg-primary/5 p-2.5">
                          <div className="flex min-w-0 items-center gap-2">
                            <IconFileCheck className="size-5 shrink-0 text-primary" />
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-xs font-medium text-foreground">{docFile.name}</p>
                              <p className="text-[10px] text-muted-foreground">{formatFileSize(docFile.size)}</p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleFileChange(index, null)}
                            className="size-7 p-0 text-muted-foreground hover:text-destructive"
                            aria-label="Remove file"
                          >
                            <IconX />
                          </Button>
                        </div>
                      ) : (
                        <label className="flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-input bg-muted/20 px-3 text-xs text-muted-foreground transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary">
                          <IconFileUpload className="size-4" />
                          <span>Upload PDF, DOC, or DOCX (Max 5MB)</span>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0] || null;
                              handleFileChange(index, file);
                            }}
                          />
                        </label>
                      )}
                    </div>
                    <FieldError errors={[docError?.file]} />
                  </Field>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Document Action */}
        {fields.length < 5 && (
          <Button
            type="button"
            variant="outline"
            onClick={handleAddDocument}
            className="w-full gap-2 border-dashed text-muted-foreground hover:text-foreground"
          >
            <IconPlus data-icon="inline-start" />
            Add Another Document ({fields.length}/5)
          </Button>
        )}
      </div>
    </FormSection>
  );
}
