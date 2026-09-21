import type { UserRole, UserResponse } from "@orgatick/contracts";

export type PlatformRole = UserRole;
export type OrgStatus = "active" | "suspended" | "inactive";

export interface AccountRef {
  id?: string | number;
  provider?: string | null;
  lastLoginAt?: string | null;
}

export interface AdminUser extends UserResponse {
  userAccount?: AccountRef | null;
  memberships?: Membership[];
}

export interface OrganizationRef {
  id: string | number;
  name: string;
  slug: string;
  logo?: string | null;
  status?: OrgStatus;
}

export interface Membership {
  id: string | number;
  status: string;
  joinedAt: string;
  organization?: OrganizationRef | null;
  role?: { id: string | number; key: string; name: string } | null;
}

export interface OrgStats {
  organizationId?: string | number;
  totalEvents: number;
  totalParticipants: number;
  totalPaidRegistrations: number;
  totalRevenue: string | number;
}

export interface CategoryRef {
  id: string | number;
  name: string;
  slug?: string | null;
  parentId?: string | number | null;
}

export interface CountryRef {
  id: string | number;
  name: string;
}
export interface DivisionRef {
  id: string | number;
  name: string;
}
export interface CityRef {
  id: string | number;
  name: string;
}

export interface AddressRef {
  id: string | number;
  addressLine1?: string | null;
  addressLine2?: string | null;
  landmark?: string | null;
  postalCode?: string | null;
  formattedAddress?: string | null;
  country?: CountryRef | null;
  division?: DivisionRef | null;
  city?: CityRef | null;
}

export interface CreatorRef {
  id: string | number;
  name: string;
  email?: string | null;
  avatar?: string | null;
}

export interface VerificationRef {
  organizationId?: string | number;
  status?: string | null;
  verifiedAt?: string | null;
  rejectionReason?: string | null;
}

export interface MemberRef {
  id: string | number;
  status: string;
  joinedAt: string;
  user?: { id: string | number; name: string; email?: string | null; avatar?: string | null } | null;
  role?: { id: string | number; key: string; name: string } | null;
}

export interface AdminOrganization {
  id: string | number;
  name: string;
  slug: string;
  description?: string | null;
  logo?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  status: OrgStatus;
  createdAt: string;
  updatedAt?: string | null;
  allowPaidEvents?: boolean;
  category?: CategoryRef | null;
  subCategory?: CategoryRef | null;
  address?: AddressRef | null;
  creator?: CreatorRef | null;
  stats?: OrgStats | null;
  verification?: VerificationRef | null;
  members?: MemberRef[];
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Paginated<T> {
  items: T[];
  meta: PaginationMeta;
}

export interface DashboardStats {
  users: { total: number; admins: number };
  organizations: { total: number; active: number; suspended: number; inactive: number };
  recentUsers: AdminUser[];
  recentOrganizations: AdminOrganization[];
}

export type UserListQuery = {
  page?: number;
  limit?: number;
  search?: string;
  role?: PlatformRole;
  sortBy?: "created_at" | "name" | "id" | "email";
  sortOrder?: "ASC" | "DESC";
};

export type OrganizationListQuery = {
  page?: number;
  limit?: number;
  search?: string;
  status?: OrgStatus;
  sortBy?: "created_at" | "name" | "id";
  sortOrder?: "ASC" | "DESC";
};

export interface ApiResponseData<T> {
  success: boolean;
  statusCode: number;
  data: T;
  timestamp: string;
}
