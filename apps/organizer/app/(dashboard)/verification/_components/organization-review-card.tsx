import { cn } from "@orgatick/ui/lib/utils";
import { Badge } from "@orgatick/ui/components/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import { Avatar, AvatarFallback, AvatarImage } from "@orgatick/ui/components/avatar";
import { Separator } from "@orgatick/ui/components/separator";
import { IconMail, IconMapPin, IconPhone, IconShieldCheck } from "@tabler/icons-react";
import type { SidebarOrganization } from "@/lib/sidebar/nav-config";

interface OrganizationReviewCardProps {
  membership: SidebarOrganization;
}

function formatDate(value?: string): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

function buildAddress(address: SidebarOrganization["organization"]["address"]): string | null {
  if (!address) return null;
  if (address.formattedAddress) return address.formattedAddress;

  const parts = [address.addressLine1, address.addressLine2, address.landmark, address.postalCode].filter(
    (part): part is string => Boolean(part),
  );
  return parts.length > 0 ? parts.join(", ") : null;
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</span>
      <span className="text-sm break-words text-foreground">{value}</span>
    </div>
  );
}

export function OrganizationReviewCard({ membership }: OrganizationReviewCardProps) {
  const { organization, role, joinedAt } = membership;
  const address = buildAddress(organization.address);
  const category = organization.subCategory?.name ?? organization.category?.name ?? null;
  const createdOn = formatDate(organization.createdAt);
  const joinedOn = formatDate(joinedAt);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Organization information</CardTitle>
        <CardDescription>
          These details are submitted to the platform team along with your verification request.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Avatar className="size-14 rounded-xl">
            {organization.logo && <AvatarImage src={organization.logo} alt={organization.name} />}
            <AvatarFallback className="rounded-xl bg-primary/15 text-lg font-bold text-primary">
              {organization.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <p className="truncate font-heading text-lg font-semibold text-foreground">{organization.name}</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              <Badge variant="outline" className="gap-1 text-[10px] uppercase">
                <IconShieldCheck className="size-3" />
                {role.name}
              </Badge>
              {category && <Badge variant="secondary">{category}</Badge>}
              {organization.status && organization.status !== "active" && (
                <Badge variant="outline" className="text-[10px] uppercase">
                  {organization.status}
                </Badge>
              )}
            </div>
          </div>
        </div>

        <Separator />

        <div className="grid gap-5 sm:grid-cols-2">
          <DetailRow label="Organization name" value={organization.name} />
          <DetailRow label="Slug" value={organization.slug || "—"} />
          {organization.email && (
            <div className="flex min-w-0 flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Email</span>
              <a
                href={`mailto:${organization.email}`}
                className="flex items-center gap-1.5 text-sm text-foreground underline-offset-4 hover:underline"
              >
                <IconMail className="size-3.5 shrink-0 text-muted-foreground" />
                <span className="break-all">{organization.email}</span>
              </a>
            </div>
          )}
          {organization.phoneNumber && (
            <div className="flex min-w-0 flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Phone</span>
              <a
                href={`tel:${organization.phoneNumber}`}
                className="flex items-center gap-1.5 text-sm text-foreground underline-offset-4 hover:underline"
              >
                <IconPhone className="size-3.5 shrink-0 text-muted-foreground" />
                {organization.phoneNumber}
              </a>
            </div>
          )}
          {address && (
            <div className="flex min-w-0 flex-col gap-1 sm:col-span-2">
              <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                Registered address
              </span>
              <span className="flex items-start gap-1.5 text-sm text-foreground">
                <IconMapPin className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                <span className="break-words">{address}</span>
              </span>
            </div>
          )}
          {organization.description && (
            <div className="flex min-w-0 flex-col gap-1 sm:col-span-2">
              <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Description</span>
              <p className={cn("text-sm leading-relaxed text-foreground")}>{organization.description}</p>
            </div>
          )}
          {createdOn && <DetailRow label="Created on" value={createdOn} />}
          {joinedOn && <DetailRow label="Your membership since" value={joinedOn} />}
        </div>
      </CardContent>
    </Card>
  );
}
