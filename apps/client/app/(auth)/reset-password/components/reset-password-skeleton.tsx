import { Skeleton } from "@orgatick/ui/components/skeleton";

export default function ResetPasswordSkeleton() {
  return (
    <div className="w-full space-y-4">
      {/* Email view skeleton */}
      <div className="flex items-center gap-3 p-1">
        <Skeleton className="h-11 w-11 rounded-full shrink-0" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>

      {/* Password field skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>

      {/* Confirm password field skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>

      {/* Submit button skeleton */}
      <Skeleton className="h-14 w-full rounded-full" />
    </div>
  );
}
