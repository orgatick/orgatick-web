"use client";

import { Controller, useFieldArray, type UseFormReturn } from "react-hook-form";
import {
  IconAlertCircle,
  IconBrandDiscord,
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTelegram,
  IconBrandX,
  IconBrandYoutube,
  IconGlobe,
  IconLink,
  IconMail,
  IconPhone,
  IconPlus,
  IconShare,
  IconStar,
  IconTrash,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import { OrganizationSocialPlatform } from "@orgatick/contracts";
import { Button } from "@orgatick/ui/components/button";
import { Field, FieldError, FieldLabel } from "@orgatick/ui/components/field";
import { Input } from "@orgatick/ui/components/input";
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

const SOCIAL_PLATFORM_CONFIG: Record<
  OrganizationSocialPlatform,
  { label: string; placeholder: string; icon: React.ComponentType<{ className?: string }> }
> = {
  [OrganizationSocialPlatform.WEBSITE]: {
    label: "Official Website",
    placeholder: "https://yourorg.com",
    icon: IconGlobe,
  },
  [OrganizationSocialPlatform.TWITTER]: {
    label: "X (Twitter)",
    placeholder: "https://x.com/yourorg",
    icon: IconBrandX,
  },
  [OrganizationSocialPlatform.INSTAGRAM]: {
    label: "Instagram",
    placeholder: "https://instagram.com/yourorg",
    icon: IconBrandInstagram,
  },
  [OrganizationSocialPlatform.LINKEDIN]: {
    label: "LinkedIn",
    placeholder: "https://linkedin.com/company/yourorg",
    icon: IconBrandLinkedin,
  },
  [OrganizationSocialPlatform.FACEBOOK]: {
    label: "Facebook",
    placeholder: "https://facebook.com/yourorg",
    icon: IconBrandFacebook,
  },
  [OrganizationSocialPlatform.YOUTUBE]: {
    label: "YouTube",
    placeholder: "https://youtube.com/@yourorg",
    icon: IconBrandYoutube,
  },
  [OrganizationSocialPlatform.GITHUB]: {
    label: "GitHub",
    placeholder: "https://github.com/yourorg",
    icon: IconBrandGithub,
  },
  [OrganizationSocialPlatform.DISCORD]: {
    label: "Discord Community",
    placeholder: "https://discord.gg/yourinvite",
    icon: IconBrandDiscord,
  },
  [OrganizationSocialPlatform.TELEGRAM]: {
    label: "Telegram Channel",
    placeholder: "https://t.me/yourorg",
    icon: IconBrandTelegram,
  },
  [OrganizationSocialPlatform.OTHER]: {
    label: "Other Link",
    placeholder: "https://linktr.ee/yourorg",
    icon: IconLink,
  },
};

interface Step4SocialSupportProps {
  form: UseFormReturn<CreateOrganization>;
  onNext: () => void;
  onPrev: () => void;
}

export function Step4SocialSupport({ form, onNext, onPrev }: Step4SocialSupportProps) {
  const {
    control,
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;

  // Social Links Field Array (min 1, max 6)
  const {
    fields: socialFields,
    append: appendSocial,
    remove: removeSocial,
  } = useFieldArray({
    control,
    name: "socialLinks",
  });

  // Support Contacts Field Array (min 1, max 6)
  const {
    fields: contactFields,
    append: appendContact,
    remove: removeContact,
  } = useFieldArray({
    control,
    name: "supportContacts",
  });

  const socialLinks = watch("socialLinks") || [];
  const supportContacts = watch("supportContacts") || [];

  const handleAddSocial = () => {
    if (socialFields.length < 6) {
      appendSocial({ platform: OrganizationSocialPlatform.TWITTER, url: "" });
    }
  };

  const handleAddContact = () => {
    if (contactFields.length < 6) {
      appendContact({ name: "", email: "", phoneNumber: "", isPrimary: false });
    }
  };

  const handleSetPrimary = (selectedIndex: number) => {
    supportContacts.forEach((_, idx) => {
      setValue(`supportContacts.${idx}.isPrimary`, idx === selectedIndex, { shouldValidate: true });
    });
  };

  return (
    <div className="space-y-10">
      {/* SECTION 1: SOCIAL LINKS */}
      <div className="space-y-6">
        <div className="border-b border-border/60 pb-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <IconShare className="size-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Online & Social Presence</h2>
              </div>
              <p className="text-xs text-muted-foreground sm:text-sm">
                Add your official website and social profiles to boost event discovery and brand authority (1 to 6
                links).
              </p>
            </div>
            <Badge variant="outline" className="font-mono text-xs">
              {socialFields.length}/6 Links
            </Badge>
          </div>
        </div>

        {errors.socialLinks && typeof errors.socialLinks.message === "string" && (
          <div className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs font-semibold text-destructive">
            <IconAlertCircle className="size-4" />
            {errors.socialLinks.message}
          </div>
        )}

        <div className="space-y-3">
          {socialFields.map((fieldItem, index) => {
            const currentPlatform = socialLinks[index]?.platform || OrganizationSocialPlatform.WEBSITE;
            const platformConfig =
              SOCIAL_PLATFORM_CONFIG[currentPlatform] || SOCIAL_PLATFORM_CONFIG[OrganizationSocialPlatform.WEBSITE];
            const PlatformIcon = platformConfig.icon;
            const linkError = errors.socialLinks?.[index];

            return (
              <div
                key={fieldItem.id}
                className="flex flex-col gap-3 rounded-xl border border-border/80 bg-card p-4 shadow-xs sm:flex-row sm:items-center"
              >
                {/* Platform Select */}
                <div className="w-full sm:w-52">
                  <Controller
                    name={`socialLinks.${index}.platform`}
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {Object.values(OrganizationSocialPlatform).map((plat) => {
                              const cfg = SOCIAL_PLATFORM_CONFIG[plat];
                              const Icon = cfg?.icon || IconGlobe;
                              return (
                                <SelectItem key={plat} value={plat}>
                                  <div className="flex items-center gap-2">
                                    <Icon className="size-4 text-muted-foreground" />
                                    <span>{cfg?.label || plat}</span>
                                  </div>
                                </SelectItem>
                              );
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {/* URL Input */}
                <div className="flex-1">
                  <div className="relative">
                    <Input
                      placeholder={platformConfig.placeholder}
                      aria-invalid={!!linkError?.url}
                      className="pl-9 font-mono text-xs"
                      {...register(`socialLinks.${index}.url`)}
                    />
                    <PlatformIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  </div>
                  <FieldError errors={linkError?.url ? [linkError.url] : []} />
                </div>

                {/* Remove Button */}
                {socialFields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSocial(index)}
                    className="self-end sm:self-center text-destructive hover:bg-destructive/10 hover:text-destructive"
                    aria-label={`Remove link ${index + 1}`}
                  >
                    <IconTrash className="size-4" />
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        {socialFields.length < 6 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddSocial}
            className="gap-1.5 text-xs font-semibold"
          >
            <IconPlus className="size-4 text-primary" />
            Add Another Social Link ({socialFields.length}/6)
          </Button>
        )}
      </div>

      {/* SECTION 2: SUPPORT CONTACTS */}
      <div className="space-y-6">
        <div className="border-b border-border/60 pb-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <IconUsers className="size-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Support & Escalation Contacts</h2>
              </div>
              <p className="text-xs text-muted-foreground sm:text-sm">
                Add contact persons responsible for resolving attendee ticket queries, refunds, and operations (1 to 6
                contacts).
              </p>
            </div>
            <Badge variant="outline" className="font-mono text-xs">
              {contactFields.length}/6 Contacts
            </Badge>
          </div>
        </div>

        {errors.supportContacts && typeof errors.supportContacts.message === "string" && (
          <div className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs font-semibold text-destructive">
            <IconAlertCircle className="size-4" />
            {errors.supportContacts.message}
          </div>
        )}

        <div className="space-y-4">
          {contactFields.map((fieldItem, index) => {
            const isPrimary = supportContacts[index]?.isPrimary;
            const contactError = errors.supportContacts?.[index];

            return (
              <div key={fieldItem.id} className="rounded-2xl border border-border/80 bg-card p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground text-sm">Contact #{index + 1}</span>
                    {isPrimary ? (
                      <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[11px] gap-1">
                        <IconStar className="size-3 fill-amber-500" />
                        Primary Escalation Lead
                      </Badge>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSetPrimary(index)}
                        className="text-[11px] font-medium text-muted-foreground hover:text-primary underline cursor-pointer"
                      >
                        Set as Primary
                      </button>
                    )}
                  </div>

                  {contactFields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeContact(index)}
                      className="text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
                      aria-label={`Remove contact ${index + 1}`}
                    >
                      <IconTrash className="size-4" />
                    </Button>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {/* Name */}
                  <Field data-invalid={!!contactError?.name}>
                    <FieldLabel htmlFor={`contact-name-${index}`}>
                      Full Name <span className="text-destructive">*</span>
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        id={`contact-name-${index}`}
                        placeholder="e.g. Rahul Sharma"
                        aria-invalid={!!contactError?.name}
                        className="pl-9"
                        {...register(`supportContacts.${index}.name`)}
                      />
                      <IconUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    </div>
                    <FieldError errors={contactError?.name ? [contactError.name] : []} />
                  </Field>

                  {/* Email */}
                  <Field data-invalid={!!contactError?.email}>
                    <FieldLabel htmlFor={`contact-email-${index}`}>
                      Email Address <span className="text-destructive">*</span>
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        id={`contact-email-${index}`}
                        type="email"
                        placeholder="support@yourorg.com"
                        aria-invalid={!!contactError?.email}
                        className="pl-9"
                        {...register(`supportContacts.${index}.email`)}
                      />
                      <IconMail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    </div>
                    <FieldError errors={contactError?.email ? [contactError.email] : []} />
                  </Field>

                  {/* Phone */}
                  <Field data-invalid={!!contactError?.phoneNumber}>
                    <FieldLabel htmlFor={`contact-phone-${index}`}>
                      Direct Mobile / WhatsApp <span className="text-destructive">*</span>
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        id={`contact-phone-${index}`}
                        type="tel"
                        placeholder="+91 98765 43210"
                        aria-invalid={!!contactError?.phoneNumber}
                        className="pl-9 font-mono"
                        {...register(`supportContacts.${index}.phoneNumber`)}
                      />
                      <IconPhone className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    </div>
                    <FieldError errors={contactError?.phoneNumber ? [contactError.phoneNumber] : []} />
                  </Field>
                </div>
              </div>
            );
          })}
        </div>

        {contactFields.length < 6 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddContact}
            className="gap-1.5 text-xs font-semibold"
          >
            <IconPlus className="size-4 text-primary" />
            Add Another Support Contact ({contactFields.length}/6)
          </Button>
        )}
      </div>

      {/* Navigation Actions */}
      <div className="flex items-center justify-between border-t border-border/60 pt-6">
        <Button type="button" variant="outline" onClick={onPrev} className="h-11 px-6 text-sm font-semibold">
          Back
        </Button>

        <Button type="button" onClick={onNext} className="h-11 px-8 text-sm font-semibold shadow-xs">
          Proceed to Review
        </Button>
      </div>
    </div>
  );
}
