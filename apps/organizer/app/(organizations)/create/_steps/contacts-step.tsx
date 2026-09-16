"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { type CreateOrganizationInput, OrganizationSocialPlatform } from "@orgatick/contracts";
import { Field, FieldError, FieldLabel } from "@orgatick/ui/components/field";
import { Input } from "@orgatick/ui/components/input";
import { Button } from "@orgatick/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import { Badge } from "@orgatick/ui/components/badge";
import {
  IconPlus,
  IconTrash,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandYoutube,
  IconBrandGithub,
  IconBrandDiscord,
  IconBrandTelegram,
  IconWorld,
  IconShare,
  IconUser,
  IconMail,
  IconPhone,
  IconCrown,
} from "@tabler/icons-react";

export function getSocialIcon(platform: OrganizationSocialPlatform) {
  switch (platform) {
    case OrganizationSocialPlatform.TWITTER:
      return <IconBrandTwitter className="size-4 text-sky-500" />;
    case OrganizationSocialPlatform.INSTAGRAM:
      return <IconBrandInstagram className="size-4 text-pink-500" />;
    case OrganizationSocialPlatform.FACEBOOK:
      return <IconBrandFacebook className="size-4 text-blue-600" />;
    case OrganizationSocialPlatform.LINKEDIN:
      return <IconBrandLinkedin className="size-4 text-blue-700" />;
    case OrganizationSocialPlatform.YOUTUBE:
      return <IconBrandYoutube className="size-4 text-red-600" />;
    case OrganizationSocialPlatform.GITHUB:
      return <IconBrandGithub className="size-4 text-foreground" />;
    case OrganizationSocialPlatform.DISCORD:
      return <IconBrandDiscord className="size-4 text-indigo-500" />;
    case OrganizationSocialPlatform.TELEGRAM:
      return <IconBrandTelegram className="size-4 text-sky-400" />;
    default:
      return <IconWorld className="size-4 text-primary" />;
  }
}

export function ContactsStep() {
  const {
    control,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CreateOrganizationInput>();

  const {
    fields: socialFields,
    append: appendSocial,
    remove: removeSocial,
  } = useFieldArray({
    control,
    name: "socialLinks",
  });

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

  const socialErrors = errors.socialLinks;
  const contactErrors = errors.supportContacts;

  const handleAddSocial = () => {
    if (socialFields.length >= 6) return;
    const usedPlatforms = socialLinks.map((s) => s.platform);
    const allPlatforms = Object.values(OrganizationSocialPlatform);
    const nextPlatform = allPlatforms.find((p) => !usedPlatforms.includes(p)) || OrganizationSocialPlatform.WEBSITE;

    appendSocial({
      platform: nextPlatform,
      url: "",
    });
  };

  const handleAddContact = () => {
    if (contactFields.length >= 6) return;
    appendContact({
      name: "",
      email: "",
      phoneNumber: "",
      isPrimary: contactFields.length === 0,
    });
  };

  const handleSetPrimaryContact = (index: number) => {
    supportContacts.forEach((_, i) => {
      setValue(`supportContacts.${i}.isPrimary`, i === index, { shouldValidate: true, shouldDirty: true });
    });
  };

  return (
    <div className="space-y-8">
      {/* Social Links Section */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <CardTitle className="text-lg">Social Media & Online Presence</CardTitle>
              <CardDescription>
                Connect your official web channels and social media handles (Min 1, Max 6).
              </CardDescription>
            </div>
            <Badge variant="outline" className="w-fit gap-1 text-xs">
              <IconShare className="size-3.5 text-primary" />
              <span>{socialFields.length} / 6 Links</span>
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {socialErrors && !Array.isArray(socialErrors) && socialErrors.message && (
            <div className="rounded-lg bg-destructive/10 p-3 text-xs text-destructive">{socialErrors.message}</div>
          )}

          <div className="space-y-3">
            {socialFields.map((field, index) => {
              const currentPlatform = socialLinks[index]?.platform || OrganizationSocialPlatform.WEBSITE;
              const linkError = Array.isArray(socialErrors) ? socialErrors[index] : undefined;

              return (
                <div
                  key={field.id}
                  className="flex flex-col sm:flex-row sm:items-start gap-3 rounded-xl border border-border bg-card p-3 shadow-2xs"
                >
                  {/* Platform Selector */}
                  <div className="w-full sm:w-48 shrink-0">
                    <Field data-invalid={Boolean(linkError?.platform)}>
                      <div className="relative">
                        <select
                          {...register(`socialLinks.${index}.platform`)}
                          className="h-9 w-full rounded-lg border border-input bg-transparent px-3 pl-9 text-xs transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                        >
                          {Object.values(OrganizationSocialPlatform).map((plat) => (
                            <option key={plat} value={plat} className="bg-popover text-popover-foreground capitalize">
                              {plat}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                          {getSocialIcon(currentPlatform)}
                        </div>
                      </div>
                      <FieldError errors={[linkError?.platform]} />
                    </Field>
                  </div>

                  {/* URL Input */}
                  <div className="flex-1 min-w-0">
                    <Field data-invalid={Boolean(linkError?.url)}>
                      <div className="relative">
                        <Input
                          placeholder={`https://${currentPlatform.toLowerCase()}.com/yourhandle`}
                          className="h-9 text-xs"
                          {...register(`socialLinks.${index}.url`)}
                        />
                      </div>
                      <FieldError errors={[linkError?.url]} />
                    </Field>
                  </div>

                  {/* Remove Button */}
                  {socialFields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSocial(index)}
                      className="size-9 p-0 text-muted-foreground hover:text-destructive shrink-0"
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
              onClick={handleAddSocial}
              className="w-full gap-2 border-dashed h-9 text-xs text-muted-foreground hover:text-foreground"
            >
              <IconPlus className="size-3.5" />
              Add Social Link ({socialFields.length}/6)
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Support & Representative Contacts Section */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <CardTitle className="text-lg">Support & Representative Contacts</CardTitle>
              <CardDescription>
                Point of contact for customer support, ticket disputes, and event inquiries (Min 1, Max 6).
              </CardDescription>
            </div>
            <Badge variant="outline" className="w-fit gap-1 text-xs">
              <IconUser className="size-3.5 text-primary" />
              <span>{contactFields.length} / 6 Contacts</span>
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {contactErrors && !Array.isArray(contactErrors) && contactErrors.message && (
            <div className="rounded-lg bg-destructive/10 p-3 text-xs text-destructive">{contactErrors.message}</div>
          )}

          <div className="space-y-4">
            {contactFields.map((field, index) => {
              const currentContact = supportContacts[index];
              const contactError = Array.isArray(contactErrors) ? contactErrors[index] : undefined;
              const isPrimary = Boolean(currentContact?.isPrimary);

              return (
                <div
                  key={field.id}
                  className="rounded-xl border border-border bg-card p-4 transition-all shadow-2xs hover:border-border/80 space-y-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="flex size-6 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                        {index + 1}
                      </span>
                      <span className="text-sm font-semibold text-foreground">Contact Person {index + 1}</span>
                      {isPrimary && (
                        <Badge
                          variant="secondary"
                          className="gap-1 text-[11px] bg-primary/10 text-primary border-primary/20"
                        >
                          <IconCrown className="size-3" />
                          Primary Contact
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {!isPrimary && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSetPrimaryContact(index)}
                          className="h-7 text-xs text-muted-foreground hover:text-primary"
                        >
                          Make Primary
                        </Button>
                      )}

                      {contactFields.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeContact(index)}
                          className="h-7 gap-1 text-xs text-destructive hover:bg-destructive/10"
                        >
                          <IconTrash className="size-3.5" />
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {/* Contact Full Name */}
                    <Field data-invalid={Boolean(contactError?.name)}>
                      <FieldLabel htmlFor={`supportContacts.${index}.name`}>
                        Full Name <span className="text-destructive">*</span>
                      </FieldLabel>
                      <div className="relative">
                        <Input
                          id={`supportContacts.${index}.name`}
                          placeholder="e.g. Sarah Connor"
                          className="pl-8 text-xs h-9"
                          {...register(`supportContacts.${index}.name`)}
                        />
                        <IconUser className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                      </div>
                      <FieldError errors={[contactError?.name]} />
                    </Field>

                    {/* Email */}
                    <Field data-invalid={Boolean(contactError?.email)}>
                      <FieldLabel htmlFor={`supportContacts.${index}.email`}>
                        Support Email <span className="text-destructive">*</span>
                      </FieldLabel>
                      <div className="relative">
                        <Input
                          id={`supportContacts.${index}.email`}
                          type="email"
                          placeholder="e.g. support@acme.com"
                          className="pl-8 text-xs h-9"
                          {...register(`supportContacts.${index}.email`)}
                        />
                        <IconMail className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                      </div>
                      <FieldError errors={[contactError?.email]} />
                    </Field>

                    {/* Phone Number */}
                    <Field data-invalid={Boolean(contactError?.phoneNumber)}>
                      <FieldLabel htmlFor={`supportContacts.${index}.phoneNumber`}>
                        Direct Phone <span className="text-destructive">*</span>
                      </FieldLabel>
                      <div className="relative">
                        <Input
                          id={`supportContacts.${index}.phoneNumber`}
                          placeholder="e.g. +1 555-0123"
                          className="pl-8 text-xs h-9"
                          {...register(`supportContacts.${index}.phoneNumber`)}
                        />
                        <IconPhone className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                      </div>
                      <FieldError errors={[contactError?.phoneNumber]} />
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
              onClick={handleAddContact}
              className="w-full gap-2 border-dashed h-9 text-xs text-muted-foreground hover:text-foreground"
            >
              <IconPlus className="size-3.5" />
              Add Another Contact ({contactFields.length}/6)
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
