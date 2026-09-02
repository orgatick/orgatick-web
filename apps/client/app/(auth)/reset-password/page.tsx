import { Suspense } from "react";
import Header from "../components/Header";
import ResetPasswordForm from "./components/reset-password-form";
import ResetPasswordSkeleton from "./components/reset-password-skeleton";

export default function ResetPasswordPage() {
  return (
    <div className="h-full flex flex-col items-center pt-6">
      <Header />
      <div className="flex-1 h-full flex flex-col w-full items-center justify-center gap-4 px-4">
        <p className="text-4xl font-semibold text-center">Create new password</p>
        <div className="w-full gap-4 flex flex-col items-center justify-center">
          <Suspense fallback={<ResetPasswordSkeleton />}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
