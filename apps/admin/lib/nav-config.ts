import type { Icon } from "@tabler/icons-react";
import { IconBuildingStore, IconLayoutDashboard, IconUsers } from "@tabler/icons-react";

export const NAV_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

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
    label: "Management",
    items: [
      { href: "/users", label: "Users", icon: IconUsers },
      { href: "/organizations", label: "Organizations", icon: IconBuildingStore },
    ],
  },
];
