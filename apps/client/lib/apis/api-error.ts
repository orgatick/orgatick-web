import axios, { type AxiosError } from "axios";
import { toast } from "@/components/ui/sonner";

export interface ApiErrorResponse {
  message?: string;
  error?: string;
  code?: string;
  errors?: Record<string, string[]> | string[];
  statusCode?: number;
  requiresVerification?: boolean;
}

/**
 * Checks if an error corresponds to an unverified email requirement.
 */
export function isEmailUnverifiedError(error: unknown): boolean {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ApiErrorResponse | undefined;
    if (data?.requiresVerification) return true;
    if (data?.code === "EMAIL_NOT_VERIFIED" || data?.code === "UNVERIFIED_EMAIL") return true;

    const message = (data?.message || data?.error || "").toLowerCase();
    if (
      message.includes("verify your email") ||
      message.includes("email is not verified") ||
      message.includes("email not verified") ||
      message.includes("unverified email") ||
      message.includes("verification required")
    ) {
      return true;
    }
  }

  if (error instanceof Error) {
    const msg = error.message.toLowerCase();
    if (
      msg.includes("verify your email") ||
      msg.includes("email is not verified") ||
      msg.includes("email not verified") ||
      msg.includes("unverified email") ||
      msg.includes("verification required")
    ) {
      return true;
    }
  }

  return false;
}

/**
 * Extracts a human-readable error message from any error (AxiosError, Error, or unknown).
 */
export function getApiErrorMessage(
  error: unknown,
  fallbackMessage = "An unexpected error occurred. Please try again.",
): string {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const responseData = axiosError.response?.data;

    // Check response body message
    if (responseData?.message && typeof responseData.message === "string") {
      return responseData.message;
    }

    // Check error field
    if (responseData?.error && typeof responseData.error === "string") {
      return responseData.error;
    }

    // Check validation errors object/array
    if (responseData?.errors) {
      if (Array.isArray(responseData.errors)) {
        if (responseData.errors.length > 0 && responseData.errors[0]) {
          return String(responseData.errors[0]);
        }
      } else if (typeof responseData.errors === "object" && responseData.errors !== null) {
        const errorRecord = responseData.errors as Record<string, string[] | string>;
        const keys = Object.keys(errorRecord);
        if (keys.length > 0 && keys[0]) {
          const fieldErrors = errorRecord[keys[0]];
          if (Array.isArray(fieldErrors) && fieldErrors.length > 0 && fieldErrors[0]) {
            return fieldErrors[0];
          }
          if (typeof fieldErrors === "string") {
            return fieldErrors;
          }
        }
      }
    }

    // Fallback based on HTTP status codes
    if (axiosError.response?.status) {
      switch (axiosError.response.status) {
        case 400:
          return "Invalid request. Please check the entered details.";
        case 401:
          return "Authentication failed. Please check your credentials.";
        case 403:
          return "You do not have permission to perform this action.";
        case 404:
          return "Requested resource was not found.";
        case 409:
          return "A conflict occurred. This record may already exist.";
        case 422:
          return "Validation failed. Please verify your input.";
        case 429:
          return "Too many requests. Please slow down and try again later.";
        case 500:
        case 502:
        case 503:
          return "Server error. Please try again in a few moments.";
        default:
          break;
      }
    }

    if (axiosError.code === "ECONNABORTED") {
      return "Request timed out. Please check your internet connection.";
    }

    if (axiosError.message === "Network Error") {
      return "Network error. Please check your internet connection.";
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
}

/**
 * Smart single error handler for Axios and other operations.
 * Extracts message and automatically presents a polished toast.
 */
export function handleApiError(
  error: unknown,
  fallbackMessage?: string,
  options?: { showToast?: boolean; toastId?: string | number },
): string {
  const message = getApiErrorMessage(error, fallbackMessage);

  if (options?.showToast !== false) {
    toast.error(message, {
      id: options?.toastId,
      duration: 4000,
    });
  }

  return message;
}
