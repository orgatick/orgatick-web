import { notFound } from "next/navigation";
import { serverFetchOrganizationDetail } from "./admin.api";
import type { AdminOrganization } from "./types";

/** Fetches an organization for an admin route, short-circuiting to 404 when missing. */
export async function getOrganizationOr404(id: string): Promise<AdminOrganization> {
  try {
    return await serverFetchOrganizationDetail(id);
  } catch {
    return notFound();
  }
}
