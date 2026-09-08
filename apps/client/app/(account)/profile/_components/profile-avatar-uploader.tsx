"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@orgatick/ui/components/avatar";
import { Button } from "@orgatick/ui/components/button";
import { IconCamera, IconCheck, IconPhoto, IconTrash, IconUpload } from "@tabler/icons-react";
import { toast } from "@/components/ui/sonner";

interface ProfileAvatarUploaderProps {
  currentAvatarUrl?: string | null;
  userName?: string;
  onAvatarChange: (file: File | null) => void;
  disabled?: boolean;
}

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

function getInitials(name?: string): string {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2 && parts[0] && parts[1]) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function ProfileAvatarUploader({
  currentAvatarUrl,
  userName,
  onAvatarChange,
  disabled = false,
}: ProfileAvatarUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
    setPreviewUrl(null);
  }, [selectedFile]);

  const validateAndSetFile = (file: File) => {
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      toast.error("Invalid file format. Please upload a WebP, PNG, JPG, or GIF image.");
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast.error("File is too large. Avatar must be under 5MB.");
      return;
    }

    setSelectedFile(file);
    onAvatarChange(file);
    toast.success(`Selected "${file.name}" for upload.`);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
    // reset input value so re-selecting same file triggers onChange
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const handleRemoveSelected = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    onAvatarChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const displayAvatar = previewUrl || currentAvatarUrl;
  const initials = getInitials(userName);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-4 rounded-xl border border-border/60 bg-muted/20">
      {/* Hidden native input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="sr-only"
        onChange={handleFileInputChange}
        disabled={disabled}
      />

      {/* Avatar Display & Dropzone */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => !disabled && fileInputRef.current?.click()}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !disabled) {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`group relative size-24 sm:size-28 shrink-0 cursor-pointer rounded-2xl border-2 transition-all duration-200 overflow-hidden shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40 ${
          isDragging ? "border-primary ring-4 ring-primary/20 scale-105" : "border-border hover:border-primary/60"
        } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
        title="Click or drag image to update avatar"
      >
        <Avatar className="size-full rounded-2xl">
          {displayAvatar ? (
            <Image
              src={displayAvatar}
              alt={userName || "Avatar"}
              fill
              sizes="112px"
              className="aspect-square size-full rounded-2xl object-cover transition-transform duration-200 group-hover:scale-105"
              unoptimized={!!previewUrl}
            />
          ) : (
            <AvatarFallback className="rounded-2xl bg-linear-to-tr from-primary to-indigo-600 font-mono text-3xl font-bold text-white">
              {initials}
            </AvatarFallback>
          )}
        </Avatar>

        {/* Hover/Active Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-medium gap-1 backdrop-blur-xs">
          <IconCamera className="size-5" />
          <span>Change</span>
        </div>

        {selectedFile && (
          <div className="absolute top-1 right-1 rounded-full bg-primary p-1 text-white shadow-xs z-20">
            <IconCheck className="size-3" />
          </div>
        )}
      </div>

      {/* Avatar details & action controls */}
      <div className="flex-1 space-y-2">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-foreground">Profile Avatar</h4>
            {selectedFile && (
              <span className="text-[11px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                New image ready to save
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">Supports WebP, PNG, JPG, or GIF. Max file size: 5MB.</p>
        </div>

        {selectedFile ? (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-background border border-border px-2.5 py-1 rounded-lg">
              <IconPhoto className="size-3.5 text-primary shrink-0" />
              <span className="truncate max-w-[150px] font-mono">{selectedFile.name}</span>
              <span className="text-[10px] text-muted-foreground">
                ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
              </span>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
              className="text-xs h-7.5"
            >
              Choose different
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemoveSelected}
              disabled={disabled}
              className="text-xs h-7.5 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <IconTrash className="size-3.5 mr-1" />
              Cancel
            </Button>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
              className="text-xs h-8 font-medium gap-1.5"
            >
              <IconUpload className="size-3.5" />
              <span>Upload new photo</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
