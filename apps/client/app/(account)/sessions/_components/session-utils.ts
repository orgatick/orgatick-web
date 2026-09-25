import type { SessionResponse } from "@orgatick/contracts";

export interface ParsedSessionMeta {
  browserName: string;
  platformName: string;
  deviceType: "desktop" | "mobile" | "tablet" | "client";
  summary: string;
}

/**
 * Parses userAgent, browser, and platform fields to return clean SaaS device details.
 */
export function parseSessionMeta(session: SessionResponse): ParsedSessionMeta {
  const browserRaw = (session.browser || "").trim();
  const platformRaw = (session.platform || "").trim();
  const ua = (session.userAgent || "").toLowerCase();

  let browserName = browserRaw || "Unknown Browser";
  let platformName = platformRaw || "Unknown OS";
  let deviceType: "desktop" | "mobile" | "tablet" | "client" = "desktop";

  // Check for API clients or tools like Bruno, Postman, curl
  if (ua.includes("bruno") || ua.includes("postman") || ua.includes("curl") || ua.includes("axios")) {
    deviceType = "client";
    if (ua.includes("bruno")) browserName = "Bruno Client";
    else if (ua.includes("postman")) browserName = "Postman";
    else if (ua.includes("curl")) browserName = "cURL";
  } else if (ua.includes("ipad") || ua.includes("tablet")) {
    deviceType = "tablet";
  } else if (ua.includes("mobile") || ua.includes("iphone") || ua.includes("android")) {
    deviceType = "mobile";
  }

  // Refine browser name if generic
  if (browserName.toLowerCase() === "browser") {
    if (ua.includes("edg/")) browserName = "Microsoft Edge";
    else if (ua.includes("chrome") && !ua.includes("edg/")) browserName = "Google Chrome";
    else if (ua.includes("firefox")) browserName = "Mozilla Firefox";
    else if (ua.includes("safari") && !ua.includes("chrome")) browserName = "Apple Safari";
    else if (ua.includes("opera") || ua.includes("opr/")) browserName = "Opera";
    else browserName = "Web Browser";
  }

  // Refine platform name if generic
  if (platformName.toLowerCase() === "web") {
    if (ua.includes("macintosh") || ua.includes("mac os")) platformName = "macOS";
    else if (ua.includes("windows")) platformName = "Windows";
    else if (ua.includes("linux") && !ua.includes("android")) platformName = "Linux";
    else if (ua.includes("android")) platformName = "Android";
    else if (ua.includes("iphone") || ua.includes("ipad")) platformName = "iOS";
    else platformName = "Desktop Web";
  }

  const summary = `${browserName} on ${platformName}`;

  return {
    browserName,
    platformName,
    deviceType,
    summary,
  };
}

/**
 * Returns human-readable relative time (e.g. "Active right now", "12 minutes ago").
 */
export function formatRelativeTime(dateInput?: Date | string | null): string {
  if (!dateInput) return "Unknown";

  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return "Unknown";

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 45) {
    return "Active right now";
  }

  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }

  const months = Math.floor(days / 30);
  return `${months} ${months === 1 ? "month" : "months"} ago`;
}

/**
 * Returns formatted exact UTC/local date and time string.
 */
export function formatExactDate(dateInput?: Date | string | null): string {
  if (!dateInput) return "N/A";

  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return "N/A";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date);
}
