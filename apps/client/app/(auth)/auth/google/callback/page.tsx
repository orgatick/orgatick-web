import { Suspense } from "react";
import GoogleCallbackView from "./components/google-callback-view";
import GoogleCallbackSkeleton from "./components/google-callback-skeleton";

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={<GoogleCallbackSkeleton />}>
      <GoogleCallbackView />
    </Suspense>
  );
}
