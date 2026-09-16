"use client";

import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { type CreateOrganizationInput, OrganizationSocialPlatform } from "@orgatick/contracts";
import { Field, FieldError, FieldLabel } from "@orgatick/ui/components/field";
import { Button } from "@orgatick/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import { Badge } from "@orgatick/ui/components/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@orgatick/ui/components/select";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@orgatick/ui/components/input-group";
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
      return <IconBrandTwitter className="text-sky-500" />;
    case OrganizationSocialPlatform.INSTAGRAM:
      return <IconBrandInstagram className="text-pink-500" />;
    case OrganizationSocialPlatform.FACEBOOK:
      return <IconBrandFacebook className="text-blue-600" />;
    case OrganizationSocialPlatform.LINKEDIN:
      return <IconBrandLinkedin className="text-blue-700" />;
    case OrganizationSocialPlatform.YOUTUBE:
      return <IconBrandYoutube className="text-red-600" />;
    case OrganizationSocialPlatform.GITHUB:
      return <IconBrandGithub className="text-foreground" />;
    case OrganizationSocialPlatform.DISCORD:
      return <IconBrandDiscord className="text-indigo-500" />;
    case OrganizationSocialPlatform.TELEGRAM:
      return <IconBrandTelegram className="text-sky-400" />;
    default:
      return <IconWorld className="text-primary" />;
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
    <div className="flex flex-col gap-6">
      {/* Social Links Section */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Social Media & Online Presence</CardTitle>
              <CardDescription>
                Connect your official web channels and social media handles (min 1, max 6).
              </CardDescription>
            </div>
            <Badge variant="outline" className="w-fit gap-1 text-xs">
              <IconShare className="text-primary" />
              <span>{socialFields.length} / 6 Links</span>
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          {socialErrors && !Array.isArray(socialErrors) && socialErrors.message && (
            <div className="rounded-lg bg-destructive/10 p-3 text-xs text-destructive">{socialErrors.message}</div>
          )}

          <div className="flex flex-col gap-3">
            {socialFields.map((field, index) => {
              const currentPlatform = socialLinks[index]?.platform || OrganizationSocialPlatform.WEBSITE;
              const linkError = Array.isArray(socialErrors) ? socialErrors[index] : undefined;

              return (
                <div
                  key={field.id}
                  className="flex flex-col gap-3 rounded-xl border border-border bg-card p-3 shadow-2xs sm:flex-row sm:items-start"
                >
                  {/* Platform Selector */}
                  <div className="w-full shrink-0 sm:w-52">
                    <Field data-invalid={Boolean(linkError?.platform)}>
                      <Controller
                        control={control}
                        name={`socialLinks.${index}.platform`}
                        render={({ field: controllerField, fieldState }) => (
                          <Select
                            name={controllerField.name}
                            value={controllerField.value}
                            onValueChange={controllerField.onChange}
                          >
                            <SelectTrigger className="w-full" aria-invalid={fieldState.invalid}>
                              <SelectValue placeholder="Select platform" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {Object.values(OrganizationSocialPlatform).map((plat) => (
                                  <SelectItem key={plat} value={plat}>
                                    {getSocialIcon(plat)}
                                    <span className="capitalize">{plat.toLowerCase()}</span>
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      <FieldError errors={[linkError?.platform]} />
                    </Field>
                  </div>

                  {/* URL Input */}
                  <div className="min-w-0 flex-1">
                    <Field data-invalid={Boolean(linkError?.url)}>
                      <InputGroup>
                        <InputGroupInput
                          placeholder={`https://${currentPlatform.toLowerCase()}.com/yourhandle`}
                          aria-invalid={Boolean(linkError?.url)}
                          {...register(`socialLinks.${index}.url`)}
                        />
                        <InputGroupAddon>{getSocialIcon(currentPlatform)}</InputGroupAddon>
                      </InputGroup>
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
                      className="size-9 shrink-0 p-0 text-muted-foreground hover:text-destructive"
                      aria-label={`Remove ${currentPlatform.toLowerCase()} link`}
                    >
                      <IconTrash />
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
              className="w-full gap-2 border-dashed text-muted-foreground hover:text-foreground"
            >
              <IconPlus data-icon="inline-start" />
              Add Social Link ({socialFields.length}/6)
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Support & Representative Contacts Section */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Support & Representative Contacts</CardTitle>
              <CardDescription>
                Point of contact for customer support, ticket disputes, and event inquiries (min 1, max 6).
              </CardDescription>
            </div>
            <Badge variant="outline" className="w-fit gap-1 text-xs">
              <IconUser className="text-primary" />
              <span>{contactFields.length} / 6 Contacts</span>
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          {contactErrors && !Array.isArray(contactErrors) && contactErrors.message && (
            <div className="rounded-lg bg-destructive/10 p-3 text-xs text-destructive">{contactErrors.message}</div>
          )}

          <div className="flex flex-col gap-4">
            {contactFields.map((field, index) => {
              const currentContact = supportContacts[index];
              const contactError = Array.isArray(contactErrors) ? contactErrors[index] : undefined;
              const isPrimary = Boolean(currentContact?.isPrimary);

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
                      <span className="text-sm font-semibold text-foreground">Contact Person {index + 1}</span>
                      {isPrimary && (
                        <Badge
                          variant="secondary"
                          className="gap-1 bg-primary/10 text-primary [&>svg:not([class*='size-'])]:size-3"
                        >
                          <IconCrown />
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
                          className="text-muted-foreground hover:text-primary"
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
                          className="text-destructive hover:bg-destructive/10"
                        >
                          <IconTrash data-icon="inline-start" />
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {/* Contact Full Name */}
                    <Field data-invalid={Boolean(contactError?.name)}>
                      <FieldLabel>
                        Full Name <span className="text-destructive">*</span>
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          placeholder="e.g. Sarah Connor"
                          aria-invalid={Boolean(contactError?.name)}
                          {...register(`supportContacts.${index}.name`)}
                        />
                        <InputGroupAddon>
                          <IconUser />
                        </InputGroupAddon>
                      </InputGroup>
                      <FieldError errors={[contactError?.name]} />
                    </Field>

                    {/* Email */}
                    <Field data-invalid={Boolean(contactError?.email)}>
                      <FieldLabel>
                        Support Email <span className="text-destructive">*</span>
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          type="email"
                          placeholder="e.g. support@acme.com"
                          aria-invalid={Boolean(contactError?.email)}
                          {...register(`supportContacts.${index}.email`)}
                        />
                        <InputGroupAddon>
                          <IconMail />
                        </InputGroupAddon>
                      </InputGroup>
                      <FieldError errors={[contactError?.email]} />
                    </Field>

                    {/* Phone Number */}
                    <Field data-invalid={Boolean(contactError?.phoneNumber)}>
                      <FieldLabel>
                        Direct Phone <span className="text-destructive">*</span>
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          placeholder="e.g. +1 555-0123"
                          aria-invalid={Boolean(contactError?.phoneNumber)}
                          {...register(`supportContacts.${index}.phoneNumber`)}
                        />
                        <InputGroupAddon>
                          <IconPhone />
                        </InputGroupAddon>
                      </InputGroup>
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
              className="w-full gap-2 border-dashed text-muted-foreground hover:text-foreground"
            >
              <IconPlus data-icon="inline-start" />
              Add Another Contact ({contactFields.length}/6)
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
