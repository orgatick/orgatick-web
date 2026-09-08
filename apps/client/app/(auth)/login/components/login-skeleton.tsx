import { Skeleton } from "@orgatick/ui/components/skeleton";

export default function LoginSkeleton() {
  return (
    <div className="w-full space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
      <Skeleton className="h-14 w-full rounded-full" />
    </div>
  );
}
