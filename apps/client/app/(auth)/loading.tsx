import Header from "./_components/Header";
import { Skeleton } from "@orgatick/ui/components/skeleton";

const Loading = () => {
  return (
    <div className="h-full flex flex-col items-center pt-6">
      <Header />
      <div className="flex-1 h-full flex flex-col w-full items-center justify-center gap-4 px-4">
        {/* Title skeleton */}
        <Skeleton className="h-10 w-72 sm:w-80 rounded-md" />

        {/* Subtitle / Switch page link skeleton */}
        <Skeleton className="h-5 w-52 rounded-md" />

        {/* Form fields skeleton */}
        <div className="w-full space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <Skeleton className="h-14 w-full rounded-full" />
          <div className="flex justify-center">
            <Skeleton className="h-4 w-40" />
          </div>
        </div>

        {/* Third-party / Social button skeleton */}
        <div className="w-full flex flex-col gap-4">
          <Skeleton className="h-14 w-full rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
