import { Card, CardContent, CardHeader } from "@orgatick/ui/components/card";
import { Skeleton } from "@orgatick/ui/components/skeleton";

export default function SessionsLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 h-full py-6">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-28" />
      </div>

      {/* Header banner skeleton */}
      <div className="rounded-2xl border border-border/70 p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-72" />
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Current Session Card Skeleton */}
          <Card className="border-border/80">
            <CardHeader className="border-b border-border/60 pb-4">
              <div className="flex justify-between items-center">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-5 w-24 rounded-full" />
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <Skeleton className="h-16 w-full rounded-xl" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Skeleton className="h-16 w-full rounded-lg" />
                <Skeleton className="h-16 w-full rounded-lg" />
                <Skeleton className="h-16 w-full rounded-lg" />
                <Skeleton className="h-16 w-full rounded-lg" />
              </div>
            </CardContent>
          </Card>

          {/* Other Sessions Card Skeleton */}
          <Card className="border-border/80">
            <CardHeader className="border-b border-border/60 pb-4">
              <div className="flex justify-between items-center">
                <Skeleton className="h-5 w-44" />
                <Skeleton className="h-8 w-20 rounded-md" />
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              <Skeleton className="h-20 w-full rounded-xl" />
              <Skeleton className="h-20 w-full rounded-xl" />
            </CardContent>
          </Card>
        </div>

        {/* Right Column Skeleton */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-border/80">
            <CardHeader className="border-b border-border/60 pb-4">
              <Skeleton className="h-5 w-32" />
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </CardContent>
          </Card>

          <Card className="border-border/80">
            <CardHeader className="border-b border-border/60 pb-4">
              <Skeleton className="h-5 w-36" />
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
