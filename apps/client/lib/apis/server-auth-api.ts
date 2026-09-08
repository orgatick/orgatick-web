import axios, { type AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import { cookies } from "next/headers.js";

type HeaderSetFn = (name: string, value: string) => void;

export interface ParsedSetCookie {
  name: string;
  value: string;
  options: {
    domain?: string;
    path?: string;
    maxAge?: number;
    expires?: Date;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: "lax" | "strict" | "none" | boolean;
  };
}

/**
 * Parses raw Set-Cookie header(s) returned by the backend.
 */
export function parseSetCookieHeader(header: string | string[] | undefined): ParsedSetCookie[] {
  if (!header) return [];
  const rawHeaders = Array.isArray(header) ? header : [header];
  const parsed: ParsedSetCookie[] = [];

  for (const raw of rawHeaders) {
    if (!raw || typeof raw !== "string") continue;
    const parts = raw.split(";").map((p) => p.trim());
    const firstPart = parts[0];
    if (!firstPart) continue;

    const eqIdx = firstPart.indexOf("=");
    if (eqIdx === -1) continue;

    const name = firstPart.substring(0, eqIdx).trim();
    const value = firstPart.substring(eqIdx + 1).trim();
    if (!name) continue;

    const options: ParsedSetCookie["options"] = {};

    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      if (!part) continue;
      const pEq = part.indexOf("=");
      const key = (pEq === -1 ? part : part.substring(0, pEq)).trim().toLowerCase();
      const val = pEq === -1 ? "" : part.substring(pEq + 1).trim();

      if (key === "domain" && val) {
        options.domain = val;
      } else if (key === "path" && val) {
        options.path = val;
      } else if (key === "max-age" && val) {
        const num = Number.parseInt(val, 10);
        if (!Number.isNaN(num)) options.maxAge = num;
      } else if (key === "expires" && val) {
        const d = new Date(val);
        if (!Number.isNaN(d.getTime())) options.expires = d;
      } else if (key === "httponly") {
        options.httpOnly = true;
      } else if (key === "secure") {
        options.secure = true;
      } else if (key === "samesite" && val) {
        const lower = val.toLowerCase();
        if (lower === "lax" || lower === "strict" || lower === "none") {
          options.sameSite = lower;
        }
      }
    }

    parsed.push({ name, value, options });
  }

  return parsed;
}

/**
 * Merges new cookies into an existing Cookie header string.
 */
export function mergeCookieHeader(existingCookieHeader: string, newCookies: ParsedSetCookie[]): string {
  const cookieMap = new Map<string, string>();
  if (existingCookieHeader) {
    const pairs = existingCookieHeader.split(";");
    for (const pair of pairs) {
      const trimmed = pair.trim();
      if (!trimmed) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx !== -1) {
        const key = trimmed.substring(0, eqIdx).trim();
        const val = trimmed.substring(eqIdx + 1).trim();
        if (key) cookieMap.set(key, val);
      }
    }
  }

  for (const cookie of newCookies) {
    if (cookie.value === "" || (cookie.options.maxAge !== undefined && cookie.options.maxAge <= 0)) {
      cookieMap.delete(cookie.name);
    } else {
      cookieMap.set(cookie.name, cookie.value);
    }
  }

  return Array.from(cookieMap.entries())
    .map(([k, v]) => `${k}=${v}`)
    .join("; ");
}

/**
 * Helper interface for cookie store abstraction to allow testing and Server Action/Route Handler propagation.
 */
export interface CookieStoreLike {
  toString(): string;
  set?: unknown;
}

export interface CreateServerApiOptions {
  baseURL?: string;
  timeout?: number;
  cookieStore?: CookieStoreLike;
  refreshClient?: typeof axios;
}

/**
 * Creates an Axios instance for server-side requests with automatic HttpOnly cookie forwarding,
 * concurrent 401 refresh deduplication, and cookie propagation for retries.
 */
export function createServerApiClient(options: CreateServerApiOptions = {}): AxiosInstance {
  const baseURL = options.baseURL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050";
  const timeout = options.timeout ?? 10000;
  const cookieStore = options.cookieStore;
  const refreshClient = options.refreshClient || axios;

  let currentCookieHeader = cookieStore ? cookieStore.toString() : "";

  const api = axios.create({
    baseURL,
    timeout,
    headers: currentCookieHeader ? { Cookie: currentCookieHeader } : {},
  });

  let refreshPromise: Promise<string | null> | null = null;

  const performRefresh = async (): Promise<string | null> => {
    try {
      const refreshUrl = `${baseURL}/auth/refresh`;
      const response = await refreshClient.post(
        refreshUrl,
        {},
        {
          headers: currentCookieHeader ? { Cookie: currentCookieHeader } : {},
          validateStatus: (status) => status >= 200 && status < 300,
        },
      );

      const rawSetCookie =
        (response.headers?.["set-cookie"] as string | string[] | undefined) ||
        (typeof response.headers?.get === "function"
          ? (response.headers.get("set-cookie") as string | string[] | undefined)
          : undefined);

      const parsedCookies = parseSetCookieHeader(rawSetCookie);

      if (parsedCookies.length > 0) {
        currentCookieHeader = mergeCookieHeader(currentCookieHeader, parsedCookies);

        // Update default header on axios instance for future requests
        const defaultsHeaders = api.defaults.headers as Record<string, unknown>;
        if (typeof (defaultsHeaders as { set?: HeaderSetFn }).set === "function") {
          (defaultsHeaders as { set: HeaderSetFn }).set("Cookie", currentCookieHeader);
        } else {
          defaultsHeaders.Cookie = currentCookieHeader;
        }

        // Attempt to propagate to Next.js cookieStore if running in a mutable context (Server Action / Route Handler)
        if (cookieStore) {
          const cookieHolder = cookieStore as Record<string, unknown>;
          if (typeof cookieHolder.set === "function") {
            try {
              for (const c of parsedCookies) {
                const domain = c.options.domain || process.env.COOKIE_DOMAIN || undefined;
                const cookieOptions = {
                  path: c.options.path || "/",
                  httpOnly: c.options.httpOnly ?? true,
                  secure: c.options.secure ?? process.env.NODE_ENV === "production",
                  sameSite: c.options.sameSite || "lax",
                  ...(domain ? { domain } : {}),
                  ...(c.options.maxAge !== undefined ? { maxAge: c.options.maxAge } : {}),
                  ...(c.options.expires ? { expires: c.options.expires } : {}),
                };

                const setFn = cookieHolder.set as (name: string, val: string, opt?: object) => unknown;
                setFn.call(cookieStore, c.name, c.value, cookieOptions);
              }
            } catch {
              // Read-only contexts (e.g., Server Component rendering) throw when setting cookies; safely ignore.
            }
          }
        }

        return currentCookieHeader;
      }

      return currentCookieHeader;
    } catch {
      return null;
    } finally {
      refreshPromise = null;
    }
  };

  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;

      if (!originalRequest || error.response?.status !== 401 || originalRequest._retry) {
        return Promise.reject(error);
      }

      // Never retry the refresh endpoint itself
      if (originalRequest.url?.includes("/auth/refresh")) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = performRefresh();
      }

      const newCookieHeader = await refreshPromise;

      if (!newCookieHeader) {
        return Promise.reject(error);
      }

      // Ensure the retried request uses the refreshed cookie header
      const reqHeaders = originalRequest.headers as Record<string, unknown>;
      if (typeof (reqHeaders as { set?: HeaderSetFn })?.set === "function") {
        (reqHeaders as { set: HeaderSetFn }).set("Cookie", newCookieHeader);
      } else {
        reqHeaders.Cookie = newCookieHeader;
      }

      return api(originalRequest);
    },
  );

  return api;
}

/**
 * Server API client for React Server Components, Server Actions, and Route Handlers.
 */
export async function serverApi(): Promise<AxiosInstance> {
  const cookieStore = await cookies();
  return createServerApiClient({ cookieStore });
}

export default serverApi;
