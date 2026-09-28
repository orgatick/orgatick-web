import type { Icon } from "@tabler/icons-react";
import type {
  OrganizationMemberRole,
  OrganizationMemberStatus,
  OrganizationStatus,
  OrganizationVerificationStatus,
} from "@orgatick/contracts";
import {
  IconChartBar,
  IconFileReport,
  IconLayoutDashboard,
  IconMessages,
  IconPlus,
  IconSettings,
  IconTicket,
  IconUsers,
  IconUsersGroup,
  IconWallet,
} from "@tabler/icons-react";

export const NAV_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface SidebarOrgRole {
  id: string | number;
  key: OrganizationMemberRole | (string & {});
  name: string;
}

interface SidebarOrgRef {
  id: string | number;
  name: string;
  slug?: string;
}

interface SidebarOrgStats {
  totalEvents: number;
  totalParticipants: number;
  totalRevenue: string | number;
}

interface SidebarOrgVerification {
  status: OrganizationVerificationStatus | (string & {});
  rejectionReason?: string | null;
}

interface SidebarOrgDetail extends SidebarOrgRef {
  logo?: string | null;
  status?: OrganizationStatus | (string & {});
  allowPaidEvents?: boolean;
  category?: SidebarOrgRef | null;
  subCategory?: SidebarOrgRef | null;
  verification?: SidebarOrgVerification | null;
  stats?: SidebarOrgStats | null;
}

/** One entry of `GET /organizations/my` -> `data.items`. */
export interface SidebarOrganization {
  roleId: string | number;
  role: SidebarOrgRole;
  status: OrganizationMemberStatus | (string & {});
  joinedAt?: string;
  organization: SidebarOrgDetail;
}

export interface SidebarNavItem {
  href: string;
  label: string;
  icon: Icon;
  badge?: string;
  exact?: boolean;
}

export interface SidebarNavGroup {
  label: string;
  items: SidebarNavItem[];
}

export const SIDEBAR_NAV_GROUPS: SidebarNavGroup[] = [
  {
    label: "Overview",
    items: [{ href: "/", label: "Dashboard", icon: IconLayoutDashboard, exact: true }],
  },
  {
    label: "Manage",
    items: [
      { href: "/events", label: "Events", icon: IconTicket },
      { href: "/attendees", label: "Attendees", icon: IconUsers },
      { href: "/payments", label: "Payments", icon: IconWallet },
      { href: "/messages", label: "Messages", icon: IconMessages, badge: "3" },
    ],
  },
  {
    label: "Insights",
    items: [
      { href: "/analytics", label: "Analytics", icon: IconChartBar },
      { href: "/reports", label: "Reports", icon: IconFileReport },
    ],
  },
  {
    label: "Organization",
    items: [
      { href: "/team", label: "Team", icon: IconUsersGroup },
      { href: "/settings", label: "Settings", icon: IconSettings },
    ],
  },
];

export const SIDEBAR_PRIMARY_ACTION: SidebarNavItem = {
  href: "/events/new",
  label: "Create Event",
  icon: IconPlus,
};
